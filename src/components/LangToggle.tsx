"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

export default function LangToggle() {
    const [lang, setLang] = useState<"EN" | "TR">("EN");

    const toggleLang = () => {
        // In a real app, this would use i18n context or router
        const newLang = lang === "EN" ? "TR" : "EN";
        setLang(newLang);
        // Notify app or change context (mock for now)
        console.log("Language switched to:", newLang);
    };

    return (
        <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
            <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lang}</span>
        </button>
    );
}
