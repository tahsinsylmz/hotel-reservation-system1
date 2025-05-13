import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminSifre = await bcrypt.hash('admin123', 10);
  const admin = await prisma.musteri.create({
    data: {
      ad: 'Admin',
      soyad: 'User',
      email: 'admin@example.com',
      telefon: '5551234567',
      sifre: adminSifre,
      rol: 'ADMIN'
    }
  });

  // Create hotel manager
  const yoneticiSifre = await bcrypt.hash('yonetici123', 10);
  const yonetici = await prisma.musteri.create({
    data: {
      ad: 'Otel',
      soyad: 'Yöneticisi',
      email: 'yonetici@example.com',
      telefon: '5559876543',
      sifre: yoneticiSifre,
      rol: 'OTEL_YONETICISI'
    }
  });

  // Create sample hotel
  const otel = await prisma.otel.create({
    data: {
      ad: 'Örnek Otel',
      adres: 'Örnek Mahallesi, Örnek Sokak No:1',
      sehir: 'İstanbul',
      yildiz: 5,
      aciklama: 'Lüks bir otel deneyimi',
      yoneticiId: yonetici.id
    }
  });

  // Create sample rooms
  const odaTipleri = ['Standart', 'Deluxe', 'Suit'];
  for (let i = 1; i <= 10; i++) {
    await prisma.oda.create({
      data: {
        numara: `${i}01`,
        tip: odaTipleri[Math.floor(Math.random() * odaTipleri.length)],
        fiyat: Math.floor(Math.random() * 500) + 500,
        kapasite: Math.floor(Math.random() * 3) + 1,
        otelId: otel.id
      }
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 