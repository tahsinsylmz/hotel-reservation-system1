import { PrismaClient, Rol } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.kullanici.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      sifre: adminPassword,
      ad: 'Admin',
      soyad: 'User',
      rol: Rol.ADMIN,
    },
  });

  // Create hotel manager
  const managerPassword = await bcrypt.hash('yonetici123', 10);
  const manager = await prisma.kullanici.upsert({
    where: { email: 'yonetici@example.com' },
    update: {},
    create: {
      email: 'yonetici@example.com',
      sifre: managerPassword,
      ad: 'Otel',
      soyad: 'Yöneticisi',
      rol: Rol.OTEL_YONETICISI,
    },
  });

  // Create sample hotels
  const hotel1 = await prisma.otel.create({
    data: {
      ad: 'Grand Hotel',
      aciklama: 'Lüks bir otel deneyimi',
      adres: 'Merkez Mahallesi, Atatürk Caddesi No:1',
      sehir: 'İstanbul',
      yildiz: 5,
      yoneticiId: manager.id,
    },
  });

  const hotel2 = await prisma.otel.create({
    data: {
      ad: 'City Hotel',
      aciklama: 'Şehir merkezinde konforlu konaklama',
      adres: 'Cumhuriyet Caddesi No:42',
      sehir: 'Ankara',
      yildiz: 4,
      yoneticiId: manager.id,
    },
  });

  // Create sample rooms
  await prisma.oda.createMany({
    data: [
      {
        numara: '101',
        tip: 'Standart',
        kapasite: 2,
        fiyat: 500,
        otelId: hotel1.id,
      },
      {
        numara: '102',
        tip: 'Deluxe',
        kapasite: 3,
        fiyat: 750,
        otelId: hotel1.id,
      },
      {
        numara: '201',
        tip: 'Standart',
        kapasite: 2,
        fiyat: 400,
        otelId: hotel2.id,
      },
      {
        numara: '202',
        tip: 'Suite',
        kapasite: 4,
        fiyat: 1000,
        otelId: hotel2.id,
      },
    ],
  });

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