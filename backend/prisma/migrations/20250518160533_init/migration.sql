/*
  Warnings:

  - You are about to drop the `musteriler` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oda_durumlari` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `odalar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `oteller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rezervasyonlar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "oda_durumlari" DROP CONSTRAINT "oda_durumlari_odaId_fkey";

-- DropForeignKey
ALTER TABLE "odalar" DROP CONSTRAINT "odalar_otelId_fkey";

-- DropForeignKey
ALTER TABLE "oteller" DROP CONSTRAINT "oteller_yoneticiId_fkey";

-- DropForeignKey
ALTER TABLE "rezervasyonlar" DROP CONSTRAINT "rezervasyonlar_musteriId_fkey";

-- DropForeignKey
ALTER TABLE "rezervasyonlar" DROP CONSTRAINT "rezervasyonlar_odaId_fkey";

-- DropTable
DROP TABLE "musteriler";

-- DropTable
DROP TABLE "oda_durumlari";

-- DropTable
DROP TABLE "odalar";

-- DropTable
DROP TABLE "oteller";

-- DropTable
DROP TABLE "rezervasyonlar";

-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "sifre" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "telefon" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'MUSTERI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otel" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "sehir" TEXT NOT NULL,
    "yildiz" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "yoneticiId" INTEGER NOT NULL,

    CONSTRAINT "Otel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oda" (
    "id" SERIAL NOT NULL,
    "numara" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "kapasite" INTEGER NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "otelId" INTEGER NOT NULL,

    CONSTRAINT "Oda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rezervasyon" (
    "id" SERIAL NOT NULL,
    "girisTarihi" TIMESTAMP(3) NOT NULL,
    "cikisTarihi" TIMESTAMP(3) NOT NULL,
    "toplamFiyat" DOUBLE PRECISION NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "musteriId" INTEGER NOT NULL,
    "odaId" INTEGER NOT NULL,

    CONSTRAINT "Rezervasyon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OdaDurumu" (
    "id" SERIAL NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,
    "durum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "odaId" INTEGER NOT NULL,

    CONSTRAINT "OdaDurumu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_email_key" ON "Kullanici"("email");

-- AddForeignKey
ALTER TABLE "Otel" ADD CONSTRAINT "Otel_yoneticiId_fkey" FOREIGN KEY ("yoneticiId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Oda" ADD CONSTRAINT "Oda_otelId_fkey" FOREIGN KEY ("otelId") REFERENCES "Otel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezervasyon" ADD CONSTRAINT "Rezervasyon_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rezervasyon" ADD CONSTRAINT "Rezervasyon_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "Oda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OdaDurumu" ADD CONSTRAINT "OdaDurumu_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "Oda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
