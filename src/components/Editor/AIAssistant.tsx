"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Bot, Sparkles } from "lucide-react";

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
        { role: "ai", text: "Merhaba! Ben Kodlama Asistanı. Kodlarını düzenleyebilir, düzeltebilir ve geliştirebilirim. Bana kodunu atman yeterli!" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages([...messages, { role: "user", text: input }]);
        const userInput = input;
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            let response = "Hmm, bunu anlamadım. Daha açıklayıcı olur musun?";
            const lowerInput = userInput.toLowerCase();

            if (lowerInput.includes("merhaba") || lowerInput.includes("selam")) {
                response = "Merhaba! Sana nasıl yardım edebilirim? Kodunda hata mı var yoksa yeni bir fikir mi arıyorsun?";
            } else if (lowerInput.includes("hata") || lowerInput.includes("bug")) {
                response = "Hatanın ne olduğunu görebilmem için kodu veya hata mesajını paylaşır mısın?";
            } else if (lowerInput.includes("python") || lowerInput.includes("yaz")) {
                response = "Python için harika bir fikrim var! `print('Hello Hanogt')` ile başlayabilirsin.";
            } else if (lowerInput.includes("html")) {
                response = "HTML iskeleti oluşturmak için `<html><body>...</body></html>` yapısını unutma.";
            }

            setMessages(prev => [...prev, { role: "ai", text: response }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
            >
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Kodlama Yardımcısı AI</span>
            </button>

            {/* Chat Interface Panel */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot className="w-6 h-6" />
                            <h3 className="font-bold">AI Assistant</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-950">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Kodun hakkında sor..."
                                className="w-full pl-4 pr-12 py-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-none outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
