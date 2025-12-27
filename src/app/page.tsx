import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";
import { useState } from "react";
import { X } from "lucide-react";

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <main className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      {/* Warning Banner */}
      {showBanner && (
        <div className="w-full bg-yellow-500 text-black text-center text-sm font-bold py-2 px-4 shadow-sm z-[60] relative flex justify-between items-center">
          <span className="flex-1">Bu Uygulama Daha Test Aşamasındadır, Lütfen Anlayış Gösteriniz.</span>
          <button onClick={() => setShowBanner(false)} className="p-1 hover:bg-yellow-600 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Header />

      <Hero />

      {/* Comparison Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10 text-center px-4">Neden HanogtLanguageSoftwareScript Daha İyi?</h2>
        <div className="w-full px-6">
          <Comparison />
        </div>
      </section>
    </main>
  );
}
