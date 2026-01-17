"use client";

import { useI18n } from "@/lib/i18n";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, HelpCircle, ThumbsUp, Send, MessageCircle, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore";

interface FeedbackItem {
    id: string;
    type: "question" | "feedback";
    content: string;
    author: string;
    authorEmail: string;
    createdAt: Date;
    likes: string[];
    comments: Comment[];
}

interface Comment {
    author: string;
    authorEmail: string;
    content: string;
    createdAt: Date;
}

export default function FeedbackPage() {
    const { t } = useI18n();
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState<"questions" | "feedback">("questions");
    const [message, setMessage] = useState("");
    const [items, setItems] = useState<FeedbackItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

    // Fetch items from Firebase
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const fetchedItems: FeedbackItem[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                likes: doc.data().likes || [],
                comments: doc.data().comments || []
            })) as FeedbackItem[];

            // Sort by likes count
            fetchedItems.sort((a, b) => b.likes.length - a.likes.length);
            setItems(fetchedItems);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (type: "question" | "feedback") => {
        if (!session?.user?.email || !message.trim()) return;

        setSubmitting(true);
        try {
            await addDoc(collection(db, "feedback"), {
                type,
                content: message.trim(),
                author: session.user.name || session.user.email.split("@")[0],
                authorEmail: session.user.email,
                createdAt: serverTimestamp(),
                likes: [],
                comments: []
            });
            setMessage("");
            fetchItems();
        } catch (error) {
            console.error("Error submitting feedback:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleLike = async (itemId: string) => {
        if (!session?.user?.email) return;

        const item = items.find(i => i.id === itemId);
        if (!item) return;

        const docRef = doc(db, "feedback", itemId);
        const isLiked = item.likes.includes(session.user.email);

        try {
            await updateDoc(docRef, {
                likes: isLiked
                    ? arrayRemove(session.user.email)
                    : arrayUnion(session.user.email)
            });
            fetchItems();
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleComment = async (itemId: string) => {
        if (!session?.user?.email || !commentText[itemId]?.trim()) return;

        const docRef = doc(db, "feedback", itemId);
        const newComment = {
            author: session.user.name || session.user.email.split("@")[0],
            authorEmail: session.user.email,
            content: commentText[itemId].trim(),
            createdAt: new Date()
        };

        try {
            await updateDoc(docRef, {
                comments: arrayUnion(newComment)
            });
            setCommentText(prev => ({ ...prev, [itemId]: "" }));
            fetchItems();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const filteredItems = items.filter(item =>
        activeTab === "questions" ? item.type === "question" : item.type === "feedback"
    );

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors">
            {/* Header */}
            <header className="py-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>{t("back_button") || "Geri"}</span>
                    </Link>
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Hanogt Codev
                    </Link>
                    <div className="w-16"></div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    {t("feedback_title") || "Geri Bildirim & SSS"}
                </h1>
                <p className="text-center text-zinc-600 dark:text-zinc-400 mb-10">
                    {t("feedback_subtitle") || "Sorularınızı sorun, geri bildirimlerinizi paylaşın"}
                </p>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab("questions")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "questions"
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        <HelpCircle className="w-5 h-5" />
                        {t("feedback_questions_tab") || "Sıkça Sorulan Sorular"}
                    </button>
                    <button
                        onClick={() => setActiveTab("feedback")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "feedback"
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                            }`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        {t("feedback_feedback_tab") || "Geri Bildirimler"}
                    </button>
                </div>

                {/* Submit Form */}
                {session?.user ? (
                    <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-200 dark:border-zinc-800">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={activeTab === "questions"
                                ? (t("feedback_question_placeholder") || "Sorunuzu yazın...")
                                : (t("feedback_feedback_placeholder") || "Geri bildiriminizi yazın...")
                            }
                            className="w-full h-32 p-4 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none text-zinc-900 dark:text-white"
                        />
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => handleSubmit("question")}
                                disabled={submitting || !message.trim()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
                            >
                                <HelpCircle className="w-5 h-5" />
                                {t("feedback_submit_question") || "Soru Olarak Gönder"}
                            </button>
                            <button
                                onClick={() => handleSubmit("feedback")}
                                disabled={submitting || !message.trim()}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 text-white rounded-xl font-medium transition-colors"
                            >
                                <MessageSquare className="w-5 h-5" />
                                {t("feedback_submit_feedback") || "Geri Bildirim Olarak Gönder"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-xl p-6 mb-8 text-center">
                        <p className="text-yellow-700 dark:text-yellow-400 mb-4">
                            {t("feedback_login_required") || "Soru veya geri bildirim göndermek için giriş yapmalısınız."}
                        </p>
                        <Link href="/login" className="inline-block px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors">
                            {t("login") || "Giriş Yap"}
                        </Link>
                    </div>
                )}

                {/* Items List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-12 text-zinc-500">
                            {t("loading") || "Yükleniyor..."}
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500">
                            {activeTab === "questions"
                                ? (t("feedback_no_questions") || "Henüz soru yok. İlk soruyu siz sorun!")
                                : (t("feedback_no_feedback") || "Henüz geri bildirim yok. İlk geri bildirimi siz gönderin!")
                            }
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <div key={item.id} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                                {/* Author and Type */}
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.author}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${item.type === "question"
                                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                            : "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400"
                                        }`}>
                                        {item.type === "question" ? (t("question") || "Soru") : (t("feedback_label") || "Geri Bildirim")}
                                    </span>
                                </div>

                                {/* Content */}
                                <p className="text-zinc-700 dark:text-zinc-300 mb-4">{item.content}</p>

                                {/* Actions */}
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleLike(item.id)}
                                        disabled={!session?.user}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${session?.user?.email && item.likes.includes(session.user.email)
                                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                            }`}
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>{item.likes.length}</span>
                                    </button>
                                    <button
                                        onClick={() => setShowComments(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{item.comments.length}</span>
                                    </button>
                                </div>

                                {/* Comments Section */}
                                {showComments[item.id] && (
                                    <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                                        {/* Existing Comments */}
                                        {item.comments.length > 0 && (
                                            <div className="space-y-3 mb-4">
                                                {item.comments.map((comment, idx) => (
                                                    <div key={idx} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-3">
                                                        <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">{comment.author}:</span>
                                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{comment.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Add Comment */}
                                        {session?.user && (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={commentText[item.id] || ""}
                                                    onChange={(e) => setCommentText(prev => ({ ...prev, [item.id]: e.target.value }))}
                                                    placeholder={t("feedback_comment_placeholder") || "Yorum yazın..."}
                                                    className="flex-1 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                                <button
                                                    onClick={() => handleComment(item.id)}
                                                    disabled={!commentText[item.id]?.trim()}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg"
                    >
                        {t("back_to_home") || "Ana Sayfaya Dön"}
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-zinc-200 dark:border-zinc-800 mt-12">
                <div className="max-w-4xl mx-auto px-6 text-center text-zinc-500">
                    <p>© 2026 Hanogt Codev. {t("all_rights_reserved") || "Tüm hakları saklıdır."}</p>
                </div>
            </footer>
        </div>
    );
}
