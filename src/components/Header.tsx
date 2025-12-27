import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

export default function Header() {
    return (
        <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-transparent">
            {/* Logo / Title */}
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Hanogt Logo" className="w-10 h-10 object-contain" />
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    HanogtLanguageSoftwareScript
                </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <LangToggle />
                <ThemeToggle />
            </div>
        </header>
    );
}
