import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all rooms for a hotel
export const getRooms = async (req: Request, res: Response) => {
  try {
    const { otelId } = req.params;
    const rooms = await prisma.oda.findMany({
      where: { otelId: Number(otelId) },
      include: {
        durumlar: {
          orderBy: { tarih: 'desc' },
          take: 1
        }
      }
    });

    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Odalar alınamadı' });
  }
};

// Get room by ID
export const getRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await prisma.oda.findUnique({
      where: { id: Number(id) },
      include: {
        durumlar: {
          orderBy: { tarih: 'desc' },
          take: 1
        }
      }
    });

    if (!room) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    res.json(room);
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ error: 'Oda bilgileri alınamadı' });
  }
};

// Create new room
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { numara, tip, fiyat, kapasite, aciklama, otelId } = req.body;

    // Check if room number already exists in the hotel
    const existingRoom = await prisma.oda.findFirst({
      where: {
        otelId: Number(otelId),
        numara
      }
    });

    if (existingRoom) {
      return res.status(400).json({ error: 'Bu oda numarası zaten kullanımda' });
    }

    // Create room with initial status
    const room = await prisma.oda.create({
      data: {
        numara,
        tip,
        fiyat: Number(fiyat),
        kapasite: Number(kapasite),
        aciklama,
        otelId: Number(otelId),
        durumlar: {
          create: {
            tarih: new Date(),
            durum: 'MUSAIT'
          }
        }
      }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ error: 'Oda oluşturulamadı' });
  }
};

// Update room
export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { numara, tip, fiyat, kapasite, aciklama } = req.body;

    // Check if room exists
    const existingRoom = await prisma.oda.findUnique({
      where: { id: Number(id) }
    });

    if (!existingRoom) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    // Update room
    const room = await prisma.oda.update({
      where: { id: Number(id) },
      data: {
        numara,
        tip,
        fiyat: Number(fiyat),
        kapasite: Number(kapasite),
        aciklama
      }
    });

    res.json(room);
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'Oda güncellenemedi' });
  }
};

// Delete room
export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if room exists
    const existingRoom = await prisma.oda.findUnique({
      where: { id: Number(id) }
    });

    if (!existingRoom) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    // Delete room
    await prisma.oda.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Oda başarıyla silindi' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Oda silinemedi' });
  }
};

// Update room status
export const updateRoomStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { durum } = req.body;

    // Check if room exists
    const existingRoom = await prisma.oda.findUnique({
      where: { id: Number(id) }
    });

    if (!existingRoom) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    // Create new status record
    const status = await prisma.odaDurumu.create({
      data: {
        odaId: Number(id),
        tarih: new Date(),
        durum
      }
    });

    res.json(status);
  } catch (error) {
    console.error('Update room status error:', error);
    res.status(500).json({ error: 'Oda durumu güncellenemedi' });
  }
}; 