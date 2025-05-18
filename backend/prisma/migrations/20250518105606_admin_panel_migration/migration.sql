-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'OTEL_YONETICISI', 'MUSTERI');

-- CreateEnum
CREATE TYPE "RezervasyonDurumu" AS ENUM ('AKTIF', 'IPTAL_EDILDI', 'TAMAMLANDI');

-- CreateEnum
CREATE TYPE "OdaDurumTipi" AS ENUM ('MUSAIT', 'DOLU', 'TEMIZLIK', 'BAKIM');

-- CreateTable
CREATE TABLE "musteriler" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "sifre" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'MUSTERI',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "musteriler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oteller" (
    "id" SERIAL NOT NULL,
    "ad" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "sehir" TEXT NOT NULL,
    "yildiz" INTEGER NOT NULL,
    "aciklama" TEXT,
    "yoneticiId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oteller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "odalar" (
    "id" SERIAL NOT NULL,
    "numara" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "fiyat" DOUBLE PRECISION NOT NULL,
    "kapasite" INTEGER NOT NULL,
    "otelId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "odalar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rezervasyonlar" (
    "id" SERIAL NOT NULL,
    "musteriId" INTEGER NOT NULL,
    "odaId" INTEGER NOT NULL,
    "girisTarihi" TIMESTAMP(3) NOT NULL,
    "cikisTarihi" TIMESTAMP(3) NOT NULL,
    "toplamFiyat" DOUBLE PRECISION NOT NULL,
    "durum" "RezervasyonDurumu" NOT NULL DEFAULT 'AKTIF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rezervasyonlar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oda_durumlari" (
    "id" SERIAL NOT NULL,
    "odaId" INTEGER NOT NULL,
    "tarih" TIMESTAMP(3) NOT NULL,
    "durum" "OdaDurumTipi" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "oda_durumlari_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "musteriler_email_key" ON "musteriler"("email");

-- CreateIndex
CREATE INDEX "oteller_sehir_idx" ON "oteller"("sehir");

-- CreateIndex
CREATE INDEX "odalar_otelId_idx" ON "odalar"("otelId");

-- CreateIndex
CREATE INDEX "rezervasyonlar_musteriId_idx" ON "rezervasyonlar"("musteriId");

-- CreateIndex
CREATE INDEX "rezervasyonlar_odaId_idx" ON "rezervasyonlar"("odaId");

-- CreateIndex
CREATE INDEX "rezervasyonlar_girisTarihi_cikisTarihi_idx" ON "rezervasyonlar"("girisTarihi", "cikisTarihi");

-- CreateIndex
CREATE INDEX "oda_durumlari_odaId_tarih_idx" ON "oda_durumlari"("odaId", "tarih");

-- CreateIndex
CREATE UNIQUE INDEX "oda_durumlari_odaId_tarih_key" ON "oda_durumlari"("odaId", "tarih");

-- AddForeignKey
ALTER TABLE "oteller" ADD CONSTRAINT "oteller_yoneticiId_fkey" FOREIGN KEY ("yoneticiId") REFERENCES "musteriler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "odalar" ADD CONSTRAINT "odalar_otelId_fkey" FOREIGN KEY ("otelId") REFERENCES "oteller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rezervasyonlar" ADD CONSTRAINT "rezervasyonlar_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "musteriler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rezervasyonlar" ADD CONSTRAINT "rezervasyonlar_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "odalar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oda_durumlari" ADD CONSTRAINT "oda_durumlari_odaId_fkey" FOREIGN KEY ("odaId") REFERENCES "odalar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
