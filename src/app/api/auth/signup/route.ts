import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email ve şifre gereklidir" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Şifre en az 6 karakter olmalıdır" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await getDoc(doc(db, "users", email));
        if (existingUser.exists()) {
            return NextResponse.json(
                { error: "Bu e-posta adresi zaten kayıtlı" },
                { status: 400 }
            );
        }

        // Create user in Firebase
        await setDoc(doc(db, "users", email), {
            email,
            password, // In production, use bcrypt to hash
            username: username || email.split("@")[0],
            avatarUrl: "",
            createdAt: new Date().toISOString(),
            provider: "credentials",
        });

        return NextResponse.json(
            { success: true, message: "Hesap başarıyla oluşturuldu" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }
}
