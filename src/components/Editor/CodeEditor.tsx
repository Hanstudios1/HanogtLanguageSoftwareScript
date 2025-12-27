"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
    language: string;
    theme: "light" | "dark";
    value: string;
    onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ language, theme, value, onChange }: CodeEditorProps) {
    const editorRef = useRef(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // @ts-ignore
        editorRef.current = editor;
    };

    return (
        <div className="w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-sm">
            <Editor
                height="100%"
                language={language}
                value={value}
                theme={theme === "dark" ? "vs-dark" : "light"}
                onChange={onChange}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                }}
            />
        </div>
    );
}
