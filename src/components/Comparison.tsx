"use client";

import { Check, X } from "lucide-react";

const COMPARISONS = [
    { feature: "Ücretsiz Kullanım", hanogt: true, replit: "Sınırlı" },
    { feature: "Reklamsız Deneyim", hanogt: true, replit: false },
    { feature: "Çevrimdışı Mod (Desktop)", hanogt: true, replit: false },
    { feature: "Hızlı Kurulum", hanogt: true, replit: true },
    { feature: "Sınırsız Proje", hanogt: true, replit: false },
    { feature: "AI Desteği", hanogt: "Ücretsiz", replit: "Paid" },
];

export default function Comparison() {
    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
            <div className="grid grid-cols-3 bg-zinc-50 dark:bg-zinc-950 p-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="col-span-1 font-bold text-zinc-500 dark:text-zinc-400 flex items-center">Özellikler</div>
                <div className="col-span-1 font-bold text-center text-blue-600 dark:text-blue-400 text-lg">HanogtLanguage</div>
                <div className="col-span-1 font-bold text-center text-zinc-500 dark:text-zinc-400">Diğerleri (Replit vb.)</div>
            </div>

            {COMPARISONS.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 p-4 border-b last:border-0 border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="col-span-1 font-medium text-zinc-700 dark:text-zinc-300 flex items-center">{item.feature}</div>

                    <div className="col-span-1 flex justify-center items-center">
                        {item.hanogt === true ? (
                            <Check className="w-6 h-6 text-green-500" />
                        ) : (
                            <span className="font-bold text-green-500">{item.hanogt}</span>
                        )}
                    </div>

                    <div className="col-span-1 flex justify-center items-center">
                        {item.replit === true ? (
                            <Check className="w-5 h-5 text-zinc-400" />
                        ) : item.replit === false ? (
                            <X className="w-5 h-5 text-red-400" />
                        ) : (
                            <span className="text-zinc-500">{item.replit}</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
