import { Terminal, Archive, Trash2, StopCircle } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

interface ConsoleProps {
    output: string[];
    isRunning: boolean;
    onClear: () => void;
}

export default function Console({ output, isRunning, onClear }: ConsoleProps) {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<"output" | "terminal">("output");
    const [terminalInput, setTerminalInput] = useState("");
    const [terminalLogs, setTerminalLogs] = useState<string[]>([
        "Microsoft Windows [Version 10.0.19045.3693]",
        "(c) Microsoft Corporation. All rights reserved.",
        "",
        "C:\\Users\\Hanogt\\Projects> "
    ]);

    const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const cmd = terminalInput.trim();
            const newLogs = [...terminalLogs];

            // Remove previous prompt line to append it with command
            newLogs[newLogs.length - 1] = `C:\\Users\\Hanogt\\Projects> ${cmd}`;

            if (cmd === "cls" || cmd === "clear") {
                setTerminalLogs(["C:\\Users\\Hanogt\\Projects> "]);
            } else if (cmd.startsWith("npm install") || cmd.startsWith("pip install")) {
                newLogs.push(`> Installing packages...`);
                newLogs.push(`+ ${cmd.split(' ')[2] || 'package'}@latest`);
                newLogs.push(`added 1 package in 2s`);
                newLogs.push("");
                newLogs.push("C:\\Users\\Hanogt\\Projects> ");
                setTerminalLogs(newLogs);
            } else if (cmd === "help") {
                newLogs.push("Available commands: npm, pip, node, cls, help");
                newLogs.push("");
                newLogs.push("C:\\Users\\Hanogt\\Projects> ");
                setTerminalLogs(newLogs);
            } else {
                newLogs.push(`'${cmd.split(' ')[0]}' is not recognized as an internal or external command.`);
                newLogs.push("");
                newLogs.push("C:\\Users\\Hanogt\\Projects> ");
                setTerminalLogs(newLogs);
            }

            setTerminalInput("");
        }
    };

    return (
        <div className="flex flex-col h-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden font-mono text-sm">
            {/* Tabs */}
            <div className="flex items-center border-b border-zinc-700 bg-zinc-800">
                <button
                    onClick={() => setActiveTab("output")}
                    className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'output' ? 'border-blue-500 text-white bg-zinc-700/50' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                >
                    {t("output")}
                </button>
                <button
                    onClick={() => setActiveTab("terminal")}
                    className={`px-4 py-2 border-b-2 transition-colors ${activeTab === 'terminal' ? 'border-blue-500 text-white bg-zinc-700/50' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
                >
                    {t("terminal")}
                </button>
                <div className="flex-1" />
                <button
                    onClick={onClear}
                    className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700 transition-colors mr-2"
                    title={t("delete")}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 bg-zinc-950 text-zinc-300">
                {activeTab === "output" ? (
                    isRunning ? (
                        <div className="flex items-center gap-2 text-yellow-500 animate-pulse">
                            <StopCircle className="w-4 h-4" />
                            Running script...
                        </div>
                    ) : output.length === 0 ? (
                        <span className="text-zinc-600 italic">No output to display. Run your code to see results.</span>
                    ) : (
                        output.map((line, i) => (
                            <div key={i} className={`${line.startsWith("Error") ? "text-red-400" : line.startsWith(">") ? "text-blue-400" : "text-zinc-300"} pb-1 border-b border-zinc-900/50`}>
                                {line}
                            </div>
                        ))
                    )
                ) : (
                    <div className="flex flex-col h-full cursor-text" onClick={() => document.getElementById('term-input')?.focus()}>
                        {terminalLogs.map((log, i) => (
                            <div key={i} className="whitespace-pre-wrap">{log}</div>
                        ))}
                        <div className="flex items-center">
                            <span className="mr-0">{terminalLogs[terminalLogs.length - 1].endsWith("> ") ? "" : ""}</span>
                            <input
                                id="term-input"
                                type="text"
                                value={terminalInput}
                                onChange={(e) => setTerminalInput(e.target.value)}
                                onKeyDown={handleTerminalCommand}
                                className="flex-1 bg-transparent border-none outline-none text-zinc-300 focus:ring-0 p-0 m-0"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
