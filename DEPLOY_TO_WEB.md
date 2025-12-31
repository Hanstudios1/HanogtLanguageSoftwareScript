# Projeyi Web'de Ücretsiz Yayınlama (Vercel)

Next.js projelerini yayınlamanın en kolay ve ücretsiz yolu, Next.js'in yaratıcısı olan **Vercel** platformunu kullanmaktır. Projenizi GitHub'a yüklediğiniz için bu işlem sadece 2 dakika sürer.

## Adım Adım Kurulum

1.  **Vercel'e Kaydolun:**
    *   [vercel.com](https://vercel.com/signup) adresine gidin.
    *   **"Continue with GitHub"** seçeneğine tıklayın ve GitHub hesabınızla giriş yapın.

2.  **Yeni Proje Ekleyin:**
    *   Giriş yaptıktan sonra Dashboard (Panel) ekranında **"Add New..."** butonuna tıklayın ve **"Project"**i seçin.
    *   Listede GitHub repolarınızı göreceksiniz. `HanogtLanguageSoftwareScript` projesinin yanındaki **Import** butonuna tıklayın.

3.  **Ayarları Kontrol Edin (Önemli!):**
    *   Vercel, projenizin Next.js olduğunu otomatik anlar.
    *   *Build Command* ve *Output Directory* ayarlarını değiştirmeyin (Default kalabilir).
    *   **Not:** Projemizde `next.config.ts` içinde `output: 'export'` ayarı olduğu için Vercel bunu statik site olarak optimize edecektir. Bu gayet uygundur.

4.  **Yayınlayın (Deploy):**
    *   Mavi renkli **"Deploy"** butonuna basın.
    *   Ekranda konfetiler patlayana kadar bekleyin (Yaklaşık 1 dakika).

5.  **Tebrikler!**
    *   Kurulum bitince size `hanogt-language-software.vercel.app` gibi ücretsiz bir domain verecek.
    *   Bu linki arkadaşlarınıza atabilir, her yerden sitenize girebilirsiniz.

## Güncelleme Nasıl Yapılır?
Bilgisayarınızda kodları değiştirip GitHub'a her `git push` yaptığınızda, Vercel bunu otomatik algılar ve sitenizi kendi kendine günceller. Ekstra bir şey yapmanıza gerek yoktur.
