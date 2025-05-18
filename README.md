# Otel Rezervasyon Otomasyon Programı

Bu proje, Kocaeli Üniversitesi Bilgi Sistemleri Mühendisliği Bölümü "Veritabanı Yönetim Sistemleri" dersi için geliştirilmiş bir otel rezervasyon sistemidir.

## 🛠️ Teknoloji Yığını

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js
- **Veritabanı**: PostgreSQL
- **ORM**: Prisma
- **Kimlik Doğrulama**: JWT

## 🚀 Kurulum (Windows)

1. **Gereksinimler**
   - Node.js (v18 veya üzeri)
   - PostgreSQL (v14 veya üzeri)
   - Git Bash veya PowerShell

2. **Projeyi Klonlama**
   ```bash
   git clone https://github.com/yourusername/hotel-reservation-system1.git
   cd hotel-reservation-system
   ```

3. **Backend Kurulumu**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # .env dosyasını düzenleyin
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

4. **Frontend Kurulumu**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📁 Proje Yapısı

- `backend/`: API ve veritabanı işlemleri
  - `src/`: Kaynak kodlar
    - `controllers/`: API kontrolcüleri
    - `routes/`: API rotaları
    - `middlewares/`: Ara yazılımlar
  - `prisma/`: Veritabanı şeması ve seed
- `frontend/`: Kullanıcı arayüzü
  - `src/`: Kaynak kodlar
    - `components/`: UI bileşenleri
    - `pages/`: Sayfalar
    - `services/`: API servisleri

## 👥 Kullanıcı Rolleri

- **Admin**: Sistem yönetimi ve raporlar
  - Email: admin@example.com
  - Şifre: admin123

- **Otel Yöneticisi**: Otel ve oda yönetimi
  - Email: yonetici@example.com
  - Şifre: yonetici123

- **Müşteri**: Rezervasyon işlemleri
  - Email: musteri@example.com
  - Şifre: musteri123

## 🔍 API Endpoints

### Auth
- `POST /api/auth/kayit` - Yeni kullanıcı kaydı
- `POST /api/auth/giris` - Kullanıcı girişi

### Otel
- `GET /api/oteller` - Otel listesi
- `GET /api/oteller/:id` - Otel detayı
- `POST /api/oteller` - Yeni otel oluşturma (Yönetici)

### Oda
- `GET /api/odalar/musait` - Müsait odalar
- `POST /api/odalar/:otelId` - Yeni oda oluşturma (Yönetici)

### Rezervasyon
- `POST /api/rezervasyonlar` - Rezervasyon oluşturma
- `DELETE /api/rezervasyonlar/:id` - Rezervasyon iptali

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 