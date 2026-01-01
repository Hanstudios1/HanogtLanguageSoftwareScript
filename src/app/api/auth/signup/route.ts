import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, username } = body;

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

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        try {
            // Check if user already exists
            const existingUser = await getDoc(doc(db, "users", normalizedEmail));
            if (existingUser.exists()) {
                return NextResponse.json(
                    { error: "Bu e-posta adresi zaten kayıtlı" },
                    { status: 400 }
                );
            }

            // Create user in Firebase
            await setDoc(doc(db, "users", normalizedEmail), {
                email: normalizedEmail,
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
        } catch (firestoreError: any) {
            console.error("Firestore error:", firestoreError);
            return NextResponse.json(
                { error: "Veritabanı hatası: " + (firestoreError?.message || "Bilinmeyen hata") },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "İstek işlenemedi: " + (error?.message || "Bilinmeyen hata") },
            { status: 500 }
        );
    }
}
