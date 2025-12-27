import Link from "next/link";
import { Github, Download, Code2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden">
            {/* Background Gradients (Optional aesthetic touch) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 blur-[100px] rounded-full -z-10 dark:bg-purple-900/20" />

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white max-w-4xl leading-tight">
                İstediğin Kadar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">Özgürce Kodla</span>,
                <br />
                Dene Ve Test Et
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-medium max-w-2xl">
                Bu %100 Ücretsiz Ortam da Yapabileceğinin Sınırı Yok!
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
                {/* Main CTA */}
                <Link
                    href="/signup"
                    className="px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg transition-all shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
                >
                    <Code2 className="w-5 h-5" />
                    Hemen Ücretsiz Kullanmaya Başla!
                </Link>

                {/* Secondary Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-900 text-white font-medium transition-all shadow-md flex items-center gap-2 border border-zinc-700 hover:border-zinc-500"
                    >
                        <Github className="w-5 h-5" />
                        Github
                    </Link>

                    <button
                        className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Download The Exe File
                    </button>
                </div>
            </div>
        </section>
    );
}
