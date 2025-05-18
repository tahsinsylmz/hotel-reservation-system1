
# 🏨 Otel Rezervasyon Sistemi

Modern ve kullanıcı dostu bir otel rezervasyon sistemi. React, Node.js ve PostgreSQL kullanılarak geliştirilmiştir.

## ✨ Özellikler

- 🔐 Kullanıcı kimlik doğrulama ve yetkilendirme
- 🏨 Otel listeleme ve detay görüntüleme
- 🛏️ Oda rezervasyonu ve yönetimi
- 👤 Kullanıcı profili ve rezervasyon geçmişi
- 👨‍💼 Otel yöneticisi paneli
- 👨‍💻 Admin paneli

## 🛠️ Teknoloji Yığını

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- JWT Authentication

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v18 veya üzeri)
- PostgreSQL (v14 veya üzeri)
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/hotel-reservation-system.git
cd hotel-reservation-system
```

2. Backend kurulumu:
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

3. Frontend kurulumu:
```bash
cd frontend
npm install
npm run dev
```

## 📁 Proje Yapısı

```
hotel-reservation-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── prisma/
│       └── schema.prisma
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── context/
    └── public/
```

## 👥 Kullanıcı Rolleri

### Admin
- Sistem yönetimi
- Kullanıcı yönetimi
- Raporlar

### Otel Yöneticisi
- Otel bilgilerini düzenleme
- Oda yönetimi
- Rezervasyon onayları

### Müşteri
- Rezervasyon yapma
- Profil yönetimi
- Rezervasyon geçmişi

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- Rol tabanlı yetkilendirme
- Şifre hashleme
- CORS koruması

## 📝 API Endpoints

### Auth
- `POST /api/auth/kayit` - Yeni kullanıcı kaydı
- `POST /api/auth/giris` - Kullanıcı girişi
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri

### Otel
- `GET /api/oteller` - Otel listesi
- `GET /api/oteller/:id` - Otel detayı
- `POST /api/oteller` - Yeni otel oluşturma (Yönetici)

### Oda
- `GET /api/odalar/:otelId` - Otel odaları
- `POST /api/odalar` - Yeni oda oluşturma (Yönetici)

### Rezervasyon
- `POST /api/rezervasyonlar` - Rezervasyon oluşturma
- `GET /api/rezervasyonlar` - Rezervasyon listesi
- `DELETE /api/rezervasyonlar/:id` - Rezervasyon iptali

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

