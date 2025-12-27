import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Comparison from "@/components/Comparison";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
      {/* Warning Banner */}
      <div className="w-full bg-yellow-500 text-black text-center text-sm font-bold py-2 px-4 shadow-sm z-[60] relative">
        Bu Uygulama Daha Test Aşamasındadır, Lütfen Anlayış Gösteriniz.
      </div>

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
