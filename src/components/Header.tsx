import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

export default function Header() {
    return (
        <header className="absolute top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-transparent">
            {/* Logo / Title */}
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                HanogtLanguageSoftwareScript
            </h1>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <LangToggle />
                <ThemeToggle />
            </div>
        </header>
    );
}
