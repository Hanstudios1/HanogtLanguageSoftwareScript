"use client";

import { Terminal, Play } from "lucide-react";

interface ConsoleProps {
    output: string[];
    isRunning: boolean;
    onClear: () => void;
}

export default function Console({ output, isRunning, onClear }: ConsoleProps) {
    return (
        <div className="h-full flex flex-col bg-zinc-900 text-white rounded-lg overflow-hidden border border-zinc-700">
            {/* Console Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-bold uppercase text-zinc-400">Console Output</span>
                </div>
                <button
                    onClick={onClear}
                    className="text-xs hover:text-white text-zinc-500 transition-colors"
                >
                    Clear
                </button>
            </div>

            {/* Console Body */}
            <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                {isRunning ? (
                    <div className="text-yellow-400 animate-pulse">Running script...</div>
                ) : (
                    output.length > 0 ? (
                        output.map((line, i) => (
                            <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
                        ))
                    ) : (
                        <div className="text-zinc-600 italic">No output to display. Run your code to see results.</div>
                    )
                )}
            </div>
        </div>
    );
}
