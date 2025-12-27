"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (pass !== confirmPass) {
            setError("Şifreler eşleşmiyor!");
            return;
        }
        setError("");
        setLoading(true);
        // Mock signup
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black transition-colors px-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Üye Ol</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Hemen ücretsiz hesabını oluştur</p>
                </div>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full h-12 flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-xl transition-all text-zinc-900 dark:text-white font-medium mb-6"
                >
                    <Chrome className="w-5 h-5 text-red-500" />
                    Google ile Üye Ol
                </button>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-sm">veya</span>
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Kullanıcı Adı</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Kullanıcı adınız"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Şifre</label>
                        <input
                            type="password"
                            required
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Şifreyi Doğrula</label>
                        <input
                            type="password"
                            required
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30 disabled:opacity-50"
                    >
                        {loading ? "Hesap Oluşturuluyor..." : "Üye Ol"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Zaten hesabın var mı?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline font-medium">
                        Giriş Yap
                    </Link>
                </p>
            </div>
        </div>
    );
}
