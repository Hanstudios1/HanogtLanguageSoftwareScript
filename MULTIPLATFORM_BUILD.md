# Hanogt Codev - Çoklu Platform Dağıtım Kılavuzu

Bu kılavuz, Hanogt Codev uygulamasını tüm platformlar için nasıl derleyeceğinizi açıklar.

## 📱 Mobil Uygulamalar (Capacitor)

### Gereksinimler
- Node.js 18+
- Android Studio (Android için)
- Xcode (iOS için - sadece macOS)

### Android Kurulumu

```bash
# Bağımlılıkları yükle
npm install @capacitor/core @capacitor/cli @capacitor/android

# Capacitor'ı başlat
npx cap init "Hanogt Codev" "com.hanogt.codev" --web-dir=out

# Android projesini ekle
npx cap add android

# Next.js'i statik olarak derle
npm run build
npx next export -o out

# Android projesini güncelle
npx cap sync android

# Android Studio'da aç
npx cap open android
```

Android Studio'da:
1. `Build > Build Bundle(s) / APK(s) > Build APK(s)` seçin
2. APK dosyası `android/app/build/outputs/apk/` klasöründe olacak

### iOS Kurulumu (sadece macOS)

```bash
# iOS bağımlılıklarını yükle
npm install @capacitor/ios

# iOS projesini ekle
npx cap add ios

# iOS projesini güncelle
npx cap sync ios

# Xcode'da aç
npx cap open ios
```

Xcode'da:
1. Signing & Capabilities'de geliştirici hesabınızı seçin
2. `Product > Archive` ile IPA oluşturun

---

## 💻 Masaüstü Uygulamalar (Electron)

### Gereksinimler
- Node.js 18+
- Windows: Visual Studio Build Tools (C++ workload)
- macOS: Xcode Command Line Tools
- Linux: Build-essential, rpm-build

### Windows (.exe) Derleme

```bash
# Electron klasörüne git
cd electron

# Bağımlılıkları yükle
npm install

# Windows kurucusu oluştur
npm run electron-build-win
```

Çıktı: `dist/HanogtCodev-Setup-1.0.0.exe`

### macOS (.dmg) Derleme

```bash
# macOS'ta çalıştır
npm run electron-build-mac
```

Çıktı: `dist/HanogtCodev-1.0.0-x64.dmg`

### Linux (.AppImage / .deb) Derleme

```bash
# Linux'ta çalıştır
npm run electron-build-linux
```

Çıktı:
- `dist/HanogtCodev-1.0.0.AppImage`
- `dist/HanogtCodev-1.0.0.deb`

### Tüm Platformları Birden Derleme (macOS gerekli)

```bash
npm run electron-build-all
```

---

## 🚀 Hızlı Başlangıç

### Yerel Geliştirme
```bash
# Web uygulamasını başlat
npm run dev

# Ayrı terminalde Electron'u başlat
npm run electron-dev
```

---

## 📦 Yayınlanan Dosyalar

| Platform | Dosya | Konum |
|----------|-------|-------|
| Windows | HanogtCodev-Setup-1.0.0.exe | `dist/` |
| macOS | HanogtCodev-1.0.0-x64.dmg | `dist/` |
| Linux | HanogtCodev-1.0.0.AppImage | `dist/` |
| Android | app-release.apk | `android/app/build/outputs/apk/release/` |
| iOS | Hanogt Codev.ipa | Xcode Archive |

---

## 🔑 Önemli Notlar

1. **iOS için Apple Developer Account gereklidir** (yıllık $99)
2. **Android için Google Play Console hesabı gereklidir** (tek seferlik $25)
3. **macOS için code signing önerilir** (özellikle dağıtım için)
4. **Windows için code signing opsiyoneldir** (SmartScreen uyarılarını azaltır)

---

## 🌐 İndirme Sayfası

Kullanıcılar aşağıdaki URL'lerden indirme yapabilir:
- Web: https://hanogtcodev.vercel.app
- GitHub Releases: https://github.com/Hanstudios1/HanogtLanguageSoftwareScript/releases
