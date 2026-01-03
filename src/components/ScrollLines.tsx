"use client";

import { useEffect, useState } from "react";

export default function ScrollLines() {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    // Parallax effect - lines move at different speeds
    const parallax1 = scrollY * 0.08;
    const parallax2 = scrollY * 0.12;
    const parallax3 = scrollY * 0.1;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Neon Green Line - Left Side */}
            <svg
                className="absolute w-full h-full"
                preserveAspectRatio="none"
                style={{
                    transform: `translateY(${parallax1}px)`,
                }}
            >
                <defs>
                    <linearGradient id="neonGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                        <stop offset="15%" stopColor="#22c55e" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#16a34a" stopOpacity="1" />
                        <stop offset="85%" stopColor="#22c55e" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M 80 -100 
                       Q 120 200, 60 500 
                       Q 0 800, 100 1100 
                       Q 200 1400, 50 1700 
                       Q -50 2000, 120 2300"
                    stroke="url(#neonGreen)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow1)"
                    opacity="0.7"
                />
            </svg>

            {/* Cyan/Teal Line - Right Side */}
            <svg
                className="absolute w-full h-full"
                preserveAspectRatio="none"
                style={{
                    transform: `translateY(${parallax2}px)`,
                }}
            >
                <defs>
                    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                        <stop offset="20%" stopColor="#06b6d4" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#0891b2" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M 1360 -50 
                       Q 1280 250, 1380 550 
                       Q 1480 850, 1300 1150 
                       Q 1120 1450, 1400 1750 
                       Q 1500 2050, 1250 2350"
                    stroke="url(#neonCyan)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow2)"
                    opacity="0.6"
                />
            </svg>

            {/* Purple/Violet Line - Center accent */}
            <svg
                className="absolute w-full h-full"
                preserveAspectRatio="none"
                style={{
                    transform: `translateY(${parallax3}px)`,
                }}
            >
                <defs>
                    <linearGradient id="neonPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                        <stop offset="25%" stopColor="#a855f7" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                        <stop offset="75%" stopColor="#a855f7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d="M 300 400 
                       Q 450 700, 280 1000 
                       Q 110 1300, 350 1600 
                       Q 500 1900, 250 2200"
                    stroke="url(#neonPurple)"
                    strokeWidth="1.5"
                    fill="none"
                    filter="url(#glow3)"
                    opacity="0.5"
                />
            </svg>

            {/* Decorative subtle circles that also parallax */}
            <div
                className="absolute left-[5%] top-[35%] w-96 h-96 rounded-full border border-zinc-800/30"
                style={{
                    transform: `translateY(${parallax1 * 0.5}px)`,
                }}
            />
            <div
                className="absolute right-[8%] top-[55%] w-72 h-72 rounded-full border border-zinc-700/20"
                style={{
                    transform: `translateY(${parallax2 * 0.3}px)`,
                }}
            />

            {/* Small dot accent on line intersection simulation */}
            <div
                className="absolute left-[6%] top-[45%] w-2 h-2 rounded-full bg-green-500/60"
                style={{
                    transform: `translateY(${parallax1 * 0.8}px)`,
                    boxShadow: "0 0 10px 2px rgba(34, 197, 94, 0.4)",
                }}
            />
        </div>
    );
}
