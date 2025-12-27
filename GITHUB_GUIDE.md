# Projeyi GitHub'da Yayınlama Kılavuzu

Bu proje **HanogtLanguageSoftwareScript**'i GitHub'a yüklemek için aşağıdaki adımları sırasıyla uygulayın.

## 1. Hazırlık (GitHub Hesabı ve Repo Oluşturma)

1.  **Giriş Yapın:** [github.com](https://github.com/) adresine gidin ve hesabınıza giriş yapın (yoksa ücretsiz üye olun).
2.  **Yeni Repo Oluşturun:**
    *   Sayfanın sağ üst köşesindeki **+** işaretine tıklayın ve **New repository** seçeneğini seçin.
    *   **Repository name:** Projenize bir isim verin (Örn: `HanogtLanguageSoftwareScript`).
    *   **Description (İsteğe bağlı):** "Açık kaynaklı, çok dilli kodlama editörü ve IDE." yazabilirsiniz.
    *   **Public/Private:** Herkesin görmesi için **Public**'i seçin.
    *   **Önemli:** *Add a README file*, *.gitignore* veya *license* seçeneklerini **İŞARETLEMEYİN**. Biz bunları zaten oluşturduk.
    *   **Create repository** butonuna basın.

3.  **Linki Kopyalayın:**
    *   Repo oluşturulduktan sonra karşınıza çıkan ekranda `https://github.com/KULLANICI_ADINIZ/HanogtLanguageSoftwareScript.git` şeklinde biten linki kopyalayın.

## 2. Bilgisayarınızda Git Ayarları (Terminal)

Projenizin bulunduğu klasörde (`c:\Users\Oğuz Han Guluzade\.gemini\antigravity\playground\nodal-perigee`) olduğunuzdan emin olun. Terminali veya PowerShell'i bu klasörde açın ve şu komutları sırasıyla yazın:

### Adım 1: Git'i Başlatın
```bash
git init
```
*(Bu komut .git klasörünü oluşturur ve projeyi Git'e tanıtır.)*

### Adım 2: Dosyaları Ekleyin
```bash
git add .
```
*(Tüm proje dosyalarını paketlenmek üzere hazırlar.)*

### Adım 3: İlk Kaydı Oluşturun (Commit)
```bash
git commit -m "İlk sürüm: Proje tamamlandı. Web ve Desktop modu aktif."
```
*(Dosyaları 'İlk sürüm' mesajıyla kaydeder.)*

### Adım 4: Ana Dalı (Branch) Belirleyin
```bash
git branch -M main
```
*(Ana çalışma dalının ismini 'main' yapar.)*

## 3. GitHub ile Bağlantı ve Yükleme

### Adım 1: Bağlantıyı Ekleyin
Aşağıdaki komutta `LINKI_BURAYA_YAPISTIRIN` kısmını 1. bölümde kopyaladığınız GitHub linkiyle değiştirin:
```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/HanogtLanguageSoftwareScript.git
```
*(Örnek: `git remote add origin https://github.com/oguzhan/hanogt.git`)*

### Adım 2: Dosyaları Gönderin (Push)
```bash
git push -u origin main
```

> **Not:** Bu aşamada GitHub kullanıcı adınızı ve şifrenizi (veya Token) sorabilir.
> *   Eğer şifre sorarsa ve kabul etmezse, GitHub ayarlarından "Personal Access Token" oluşturup şifre yerine onu kullanmanız gerekebilir.
> *   Ya da `git credential manager` penceresi açılırsa oradan tarayıcı ile giriş yapabilirsiniz.

## 4. Güncelleme Nasıl Yapılır? (Yeni Özellik Ekledikten Sonra)
Projeye yeni özellikler ekleyip kaydettikten sonra, bu değişiklikleri GitHub'a göndermek için terminalde şu 3 komutu sırasıyla yazmanız yeterlidir:

```bash
git add .
git commit -m "Guncelleme: Yapilan degisikliklerin kisa ozeti"
git push
```
*(Örnek mesaj: "Google Auth eklendi ve Logo düzeltildi" gibi.)*
