# Google ile Giriş (OAuth) Kurulum Rehberi

Projenizde "Google ile Giriş Yap" özelliğinin çalışması için Google Cloud üzerinden bir "Uygulama" oluşturup gerekli şifreleri almanız gerekmektedir. Bu işlem tamamen ücretsizdir.

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
    *   `http://localhost:3000` ekleyin.
6.  **Authorized redirect URIs (Çok Önemli):**
    *   `http://localhost:3000/api/auth/callback/google` adresini buraya ekleyin.
7.  **Create** butonuna basın.

## Adım 4: Projeye Ekleyin
Google size iki adet kod verecek: **Client ID** ve **Client Secret**.

1.  Proje klasörünüzde `.env.local` adında yeni bir dosya oluşturun.
2.  İçine şu bilgileri yapıştırın ve Google'dan aldığınız kodları ilgili yerlere yazın:

```env
GOOGLE_CLIENT_ID=buraya_google_client_id_kodunu_yapistir
GOOGLE_CLIENT_SECRET=buraya_google_client_secret_kodunu_yapistir

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=rastgele_karmasik_bir_sifre_yaz_buraya
```

Artık projenizi (`npm run dev`) yeniden başlattığınızda Google girişi çalışacaktır!
