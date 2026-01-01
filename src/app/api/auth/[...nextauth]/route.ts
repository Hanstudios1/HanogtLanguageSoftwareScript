import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    // Normalize email
                    const normalizedEmail = credentials.email.toLowerCase().trim();

                    // Check user in Firebase
                    const userDoc = await getDoc(doc(db, "users", normalizedEmail));

                    if (!userDoc.exists()) {
                        return null;
                    }

                    const userData = userDoc.data();

                    // Simple password check (in production, use bcrypt)
                    if (userData.password !== credentials.password) {
                        return null;
                    }

                    return {
                        id: normalizedEmail,
                        email: normalizedEmail,
                        name: userData.username || normalizedEmail,
                        image: userData.avatarUrl || null,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // After login, redirect to dashboard
            if (url.includes("/login") || url.includes("/signup") || url === baseUrl) {
                return `${baseUrl}/dashboard`;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
