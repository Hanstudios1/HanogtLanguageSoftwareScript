# Google ile Giriş (OAuth) Kurulum ve Hata Çözüm Rehberi

## 🚨 En Sık Karşılaşılan### 🛑 "Hata 400: redirect_uri_mismatch" Çözümü (GÜNCEL)

Şu an aldığınız hatanın sebebi, Vercel'in her güncellemede yeni bir "Preview URL" (Önizleme Linki) oluşturmasıdır.

Google Cloud Console'a **şunu aynen eklemeniz gerekiyor**:

```text
https://hanogt-language-software-script-qjudaqez2-hanstudios1s-projects.vercel.app/api/auth/callback/google
```

**Neden?**
Linkin içindeki `qjudaqez2` kısmı her "git push" yaptığımızda değişebilir.
1.  Google Cloud Console > Credentials > OAuth 2.0 Client ID ayarına gidin.
2.  "Authorized redirect URIs" kısmına yukarıdaki uzun linki yapıştırın ve kaydedin.
3.  Birkaç dakika bekleyip tekrar deneyin.

**Kalıcı Çözüm:**
Vercel Dashboard'da projenizin "Production" domaini (örneğin `hanogt-language-software-script.vercel.app`) vardır. Google'a bunu eklerseniz ve siteye bu linkten girerseniz bu hatayı bir daha almazsınız.: `https://hanogt-yazilim.vercel.app`).
    *   Adresi kopyalayın. **(Sonunda `/` işareti OLMASIN)**.

2.  **Vercel Ayarını Kontrol Edin:**
    *   Vercel Dashboard > Settings > Environment Variables.
    *   `NEXTAUTH_URL` değişkenini bulun.
    *   Değerinin kopyaladığınız adresle **birebir aynı** olduğundan emin olun (Örn: `https://hanogt-yazilim.vercel.app`).

3.  **Google Console Ayarını Düzeltin (En Önemlisi):**
    *   [Google Cloud Console](https://console.cloud.google.com/apis/credentials) adresine gidin.
    *   **OAuth 2.0 Client ID**'nize tıklayın.
    *   **"Authorized redirect URIs"** başlığı altındaki listeye bakın.
    *   Şu adresin ekli olduğundan emin olun (Sonundaki kod çeşidi çok önemli):
    *   `https://SITENIZIN-ADRESI.vercel.app/api/auth/callback/google`

    > **Dikkat:** `http` değil `https` olmalı. Adres yanlışsa silip doğrusunu ekleyin ve **SAVE** butonuna basın.

---

## Sıfırdan Kurulum Adımları

## Adım 1: Google Cloud Console'a Gidin
1.  [Google Cloud Console](https://console.cloud.google.com/) adresine gidin ve Gmail hesabınızla giriş yapın.
2.  Sol üstteki proje seçme menüsüne tıklayın ve **"New Project"** diyerek yeni bir proje oluşturun (Adına "Hanogt App" diyebilirsiniz).

## Adım 2: OAuth Ekranını Ayarlayın
1.  Sol menüden **"APIs & Services"** > **"OAuth consent screen"** kısmına gidin.
2.  **User Type** olarak **"External"** seçin ve **Create** butonuna basın.
3.  **App Information:**
    *   **App name:** Hanogt Language Software
    *   **User support email:** Kendi emailini seçin.
    *   **Developer contact information:** Kendi emailini yazın.
4.  **Save and Continue** diyerek ilerleyin (Scopes kısmını boş geçebilirsiniz).
5.  **Test Users** kısmında, test aşamasında kendi email adresinizi ekleyin (Bu önemli, yoksa giriş yapamazsınız).

## Adım 3: Kimlik Bilgilerini (Credentials) Alın
1.  Sol menüden **"Credentials"** kısmına tıklayın.
2.  Yukarıdaki **"+ CREATE CREDENTIALS"** butonuna basın ve **"OAuth client ID"** seçeneğini seçin.
3.  **Application type:** **Web application** seçin.
4.  **Name:** "Hanogt Web Client" yazabilirsiniz.
5.  **Authorized JavaScript origins:**
    *   `http://localhost:3000`
    *   `https://SITENIZIN-ADRESI.vercel.app` (Canlı site adresi)
6.  **Authorized redirect URIs (Çok Önemli):**
    *   `http://localhost:3000/api/auth/callback/google`
    *   `https://SITENIZIN-ADRESI.vercel.app/api/auth/callback/google` (Canlı site adresi + uzantısı)
7.  **Create** butonuna basın.

## Adım 4: Projeye Ekleyin (Local ve Vercel)
Google size iki adet kod verecek: **Client ID** ve **Client Secret**.

### Bilgisayarınız İçin (Local):
Proje klasörünüzde `.env.local` dosyasına yapıştırın.

### Vercel İçin (Canlı Site):
1.  Vercel.com > Project Settings > Environment Variables kısmına gidin.
2.  Şu değişkenleri ekleyin:
    *   `GOOGLE_CLIENT_ID`: (Google'dan aldığınız)
    *   `GOOGLE_CLIENT_SECRET`: (Google'dan aldığınız)
    *   `NEXTAUTH_secret`: `rastgele_karmasik_sifre`
    *   `NEXTAUTH_URL`: `https://SITENIZIN-ADRESI.vercel.app`
