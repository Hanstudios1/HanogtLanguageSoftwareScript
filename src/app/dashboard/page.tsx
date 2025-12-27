"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Code, FileCode, Clock, MoreVertical } from "lucide-react";
import Header from "@/components/Header";

const LANGUAGES = [
    { name: "Python", ext: "py", color: "bg-blue-500" },
    { name: "CSharp", ext: "cs", color: "bg-purple-600" },
    { name: "C++", ext: "cpp", color: "bg-blue-700" },
    { name: "Java", ext: "java", color: "bg-red-500" },
    { name: "Javascript", ext: "js", color: "bg-yellow-400 text-black" },
    { name: "HTML", ext: "html", color: "bg-orange-500" },
    { name: "PHP", ext: "php", color: "bg-indigo-500" },
    { name: "Go", ext: "go", color: "bg-cyan-500" },
    { name: "Swift", ext: "swift", color: "bg-orange-600" },
    { name: "SQL", ext: "sql", color: "bg-teal-500" },
    { name: "Lua", ext: "lua", color: "bg-blue-400" },
];

export default function DashboardPage() {
    const router = useRouter();
    const [showLangModal, setShowLangModal] = useState(false);

    const handleCreateScript = (lang: string) => {
        // Navigate to editor with selected language
        router.push(`/editor?lang=${lang.toLowerCase()}`);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white transition-colors">
            <Header />

            <main className="pt-24 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Projelerini yönet ve yeni scriptler oluştur.</p>
                    </div>
                    <button
                        onClick={() => setShowLangModal(true)}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Yeni Script Oluştur
                    </button>
                </div>

                {/* Recent Scripts (Mock) */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-zinc-500" />
                        Son Projeler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all cursor-pointer group"
                                onClick={() => router.push("/editor?lang=python")}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <FileCode className="w-6 h-6" />
                                    </div>
                                    <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                                        <MoreVertical className="w-4 h-4 text-zinc-400" />
                                    </button>
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors">Project_Final_{i}.py</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Last edited 2 hours ago</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Language Selection Modal */}
            {showLangModal && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-4xl w-full shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Bir Yazılım Dili Seç</h2>
                            <button
                                onClick={() => setShowLangModal(false)}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
                            >
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.name}
                                    onClick={() => handleCreateScript(lang.name)}
                                    className="flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border-2 border-transparent hover:border-blue-500 transition-all gap-3"
                                >
                                    <div className={`w-12 h-12 rounded-full ${lang.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                                        {lang.ext}
                                    </div>
                                    <span className="font-semibold text-zinc-700 dark:text-zinc-200">{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
