# Otel Rezervasyon Otomasyon Programı

Bu proje, Kocaeli Üniversitesi Bilgi Sistemleri Mühendisliği Bölümü "Veritabanı Yönetim Sistemleri" dersi için geliştirilmiş bir otel rezervasyon sistemidir.

## 🛠️ Teknoloji Yığını

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js
- **Veritabanı**: PostgreSQL
- **ORM**: Prisma
- **Kimlik Doğrulama**: JWT

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd hotel-reservation-system
```

2. Backend kurulumu:
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin
npx prisma migrate dev
npm run dev
```

3. Frontend kurulumu:
```bash
cd frontend
npm install
npm run dev
```

## 📁 Proje Yapısı

- `backend/`: API ve veritabanı işlemleri
- `frontend/`: Kullanıcı arayüzü
- `sql/`: Veritabanı trigger, view ve index tanımları
- `docs/`: Proje dokümantasyonu

## 👥 Kullanıcı Rolleri

- **Admin**: Sistem yönetimi ve raporlar
- **Otel Yöneticisi**: Otel ve oda yönetimi
- **Müşteri**: Rezervasyon işlemleri

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 