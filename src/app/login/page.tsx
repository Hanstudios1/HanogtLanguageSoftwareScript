"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black transition-colors px-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Giriş Yap</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">HanogtLanguageSoftwareScript'e Hoşgeldiniz</p>
                </div>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    className="w-full h-12 flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-xl transition-all text-zinc-900 dark:text-white font-medium mb-6"
                >
                    <Chrome className="w-5 h-5 text-red-500" />
                    Google ile Oturum Aç
                </button>

                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                    <span className="flex-shrink mx-4 text-zinc-400 text-sm">veya</span>
                    <div className="flex-grow border-t border-zinc-300 dark:border-zinc-700"></div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
                    >
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Hesabın yok mu?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline font-medium">
                        Hemen Üye Ol
                    </Link>
                </p>
            </div>
        </div>
    );
}
