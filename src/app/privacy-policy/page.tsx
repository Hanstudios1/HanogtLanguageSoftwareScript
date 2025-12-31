import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gizlilik Politikası ve Kurallarımız - Hanogt Codev",
    description: "Hanogt Codev Gizlilik Politikası ve Kullanım Kuralları",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="py-6 border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-6">
                    <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Hanogt Codev
                    </a>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    Hanogt Codev Gizlilik Politikası Ve Kurallarımız
                </h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">1. Giriş</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Hanogt Codev ("Platform", "Biz", "Şirket") olarak, kullanıcılarımızın gizliliğine son derece önem vermekteyiz.
                            Bu Gizlilik Politikası, platformumuzu kullanırken kişisel verilerinizin nasıl toplandığını, kullanıldığını
                            ve korunduğunu açıklamaktadır.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">2. Toplanan Veriler</h2>
                        <p className="text-zinc-300 leading-relaxed mb-4">Hanogt Codev, aşağıdaki bilgileri toplayabilir:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
                            <li>E-posta adresi (hesap oluşturma ve oturum açma amacıyla)</li>
                            <li>Kullanıcı adı ve profil bilgileri</li>
                            <li>Oluşturduğunuz projeler ve kod dosyaları</li>
                            <li>Oturum bilgileri ve tercihler (tema, dil vb.)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">3. Verilerin Kullanımı</h2>
                        <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-4">
                            <p className="text-green-400 font-semibold text-lg">
                                ✓ Kişisel verileriniz hiçbir koşulda üçüncü taraflarla paylaşılmayacak veya satılmayacaktır.
                            </p>
                        </div>
                        <p className="text-zinc-300 leading-relaxed mb-4">Topladığımız veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
                            <li>Hesabınızı oluşturmak ve yönetmek</li>
                            <li>Projelerinizi güvenli bir şekilde saklamak</li>
                            <li>Platform deneyiminizi kişiselleştirmek</li>
                            <li>Teknik destek sağlamak</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">4. Veri Güvenliği</h2>
                        <p className="text-zinc-300 leading-relaxed mb-4">
                            Tüm kullanıcı verileri, yalnızca <span className="font-semibold text-blue-400">özel ve güvenli sunucularımızda</span> saklanmaktadır.
                            Verileriniz endüstri standardı şifreleme yöntemleriyle korunmaktadır.
                        </p>
                        <p className="text-zinc-300 leading-relaxed">
                            Sunucularımız düzenli olarak güvenlik denetimlerinden geçirilmekte ve yetkisiz erişime karşı
                            sürekli izlenmektedir.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">5. Çerezler ve Yerel Depolama</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Platform, oturum bilgilerinizi ve tercihlerinizi saklamak için tarayıcınızın yerel depolama
                            özelliğini (localStorage) kullanmaktadır. Bu veriler yalnızca sizin cihazınızda saklanır
                            ve üçüncü taraflarla paylaşılmaz.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">6. Kullanım Kuralları</h2>
                        <p className="text-zinc-300 leading-relaxed mb-4">Platformumuzu kullanırken aşağıdaki kurallara uymanız gerekmektedir:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-300">
                            <li>Yasalara aykırı içerik oluşturmamak</li>
                            <li>Başkalarının haklarını ihlal etmemek</li>
                            <li>Platformun güvenliğini tehlikeye atacak eylemlerden kaçınmak</li>
                            <li>Spam veya kötü amaçlı yazılım paylaşmamak</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">7. Hesap Silme</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Hesabınızı istediğiniz zaman silme hakkına sahipsiniz. Hesabınız silindiğinde,
                            tüm kişisel verileriniz ve projeleriniz sunucularımızdan kalıcı olarak kaldırılacaktır.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">8. Politika Değişiklikleri</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler yapıldığında
                            kullanıcılarımız bilgilendirilecektir.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">9. İletişim</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Gizlilik politikamız veya verilerinizle ilgili sorularınız için bizimle
                            iletişime geçebilirsiniz.
                        </p>
                    </section>

                    <div className="mt-12 p-6 bg-zinc-900 rounded-xl text-center border border-zinc-800">
                        <p className="text-zinc-400">
                            Bu gizlilik politikası en son <strong className="text-white">29 Aralık 2025</strong> tarihinde güncellenmiştir.
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg"
                    >
                        Ana Sayfaya Dön
                    </a>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 border-t border-zinc-800 mt-12">
                <div className="max-w-4xl mx-auto px-6 text-center text-zinc-500">
                    <p>© 2024 Hanogt Codev. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    );
}
