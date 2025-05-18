import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all reservations
export const getReservations = async (req: Request, res: Response) => {
  try {
    const { musteriId, odaId } = req.query;
    const where: any = {};

    if (musteriId) {
      where.musteriId = Number(musteriId);
    }
    if (odaId) {
      where.odaId = Number(odaId);
    }

    const reservations = await prisma.rezervasyon.findMany({
      where,
      include: {
        musteri: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true,
            telefon: true
          }
        },
        oda: {
          select: {
            id: true,
            numara: true,
            tip: true,
            fiyat: true,
            otel: {
              select: {
                id: true,
                ad: true
              }
            }
          }
        }
      },
      orderBy: {
        girisTarihi: 'desc'
      }
    });

    res.json(reservations);
  } catch (error) {
    console.error('Get reservations error:', error);
    res.status(500).json({ error: 'Rezervasyonlar alınamadı' });
  }
};

// Get reservation by ID
export const getReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await prisma.rezervasyon.findUnique({
      where: { id: Number(id) },
      include: {
        musteri: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true,
            telefon: true
          }
        },
        oda: {
          select: {
            id: true,
            numara: true,
            tip: true,
            fiyat: true,
            otel: {
              select: {
                id: true,
                ad: true
              }
            }
          }
        }
      }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Rezervasyon bulunamadı' });
    }

    res.json(reservation);
  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({ error: 'Rezervasyon bilgileri alınamadı' });
  }
};

// Create new reservation
export const createReservation = async (req: Request, res: Response) => {
  try {
    const { musteriId, odaId, girisTarihi, cikisTarihi } = req.body;

    // Check if room is available for the given dates
    const conflictingReservation = await prisma.rezervasyon.findFirst({
      where: {
        odaId: Number(odaId),
        durum: 'AKTIF',
        OR: [
          {
            AND: [
              { girisTarihi: { lte: new Date(girisTarihi) } },
              { cikisTarihi: { gt: new Date(girisTarihi) } }
            ]
          },
          {
            AND: [
              { girisTarihi: { lt: new Date(cikisTarihi) } },
              { cikisTarihi: { gte: new Date(cikisTarihi) } }
            ]
          }
        ]
      }
    });

    if (conflictingReservation) {
      return res.status(400).json({ error: 'Bu tarihler için oda müsait değil' });
    }

    // Get room price
    const room = await prisma.oda.findUnique({
      where: { id: Number(odaId) }
    });

    if (!room) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    // Calculate total price
    const nights = Math.ceil(
      (new Date(cikisTarihi).getTime() - new Date(girisTarihi).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const toplamFiyat = room.fiyat * nights;

    // Create reservation
    const reservation = await prisma.rezervasyon.create({
      data: {
        musteriId: Number(musteriId),
        odaId: Number(odaId),
        girisTarihi: new Date(girisTarihi),
        cikisTarihi: new Date(cikisTarihi),
        toplamFiyat,
        durum: 'AKTIF'
      }
    });

    // Update room status
    await prisma.odaDurumu.create({
      data: {
        odaId: Number(odaId),
        tarih: new Date(girisTarihi),
        durum: 'DOLU'
      }
    });

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ error: 'Rezervasyon oluşturulamadı' });
  }
};

// Update reservation status
export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;

    // Check if reservation exists
    const reservation = await prisma.rezervasyon.findUnique({
      where: { id: Number(id) }
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Rezervasyon bulunamadı' });
    }

    // Update reservation status
    const updatedReservation = await prisma.rezervasyon.update({
      where: { id: Number(id) },
      data: { durum }
    });

    // If reservation is cancelled, update room status
    if (durum === 'IPTAL_EDILDI') {
      await prisma.odaDurumu.create({
        data: {
          odaId: reservation.odaId,
          tarih: new Date(),
          durum: 'MUSAIT'
        }
      });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error('Update reservation status error:', error);
    res.status(500).json({ error: 'Rezervasyon durumu güncellenemedi' });
  }
}; 