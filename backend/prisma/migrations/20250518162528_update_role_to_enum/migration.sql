/*
  Warnings:

  - The `rol` column on the `Kullanici` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `durum` column on the `Rezervasyon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `durum` on the `OdaDurumu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Kullanici" DROP COLUMN "rol",
ADD COLUMN     "rol" "Rol" NOT NULL DEFAULT 'MUSTERI';

-- AlterTable
ALTER TABLE "OdaDurumu" DROP COLUMN "durum",
ADD COLUMN     "durum" "OdaDurumTipi" NOT NULL;

-- AlterTable
ALTER TABLE "Rezervasyon" DROP COLUMN "durum",
ADD COLUMN     "durum" "RezervasyonDurumu" NOT NULL DEFAULT 'AKTIF';
