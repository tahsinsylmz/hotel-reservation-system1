import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin, isHotelManager } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const { otelId } = req.query;
    const where = otelId ? { otelId: Number(otelId) } : {};

    const rooms = await prisma.oda.findMany({
      where,
      include: {
        otel: {
          select: {
            id: true,
            ad: true
          }
        }
      }
    });
    res.json(rooms);
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Odalar alınamadı' });
  }
});

// Get room by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.oda.findUnique({
      where: { id: Number(id) },
      include: {
        otel: {
          select: {
            id: true,
            ad: true
          }
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
});

// Create new room (admin or hotel manager)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { numara, tip, fiyat, otelId } = req.body;

    // Check if user is admin or hotel manager
    const hotel = await prisma.otel.findUnique({
      where: { id: Number(otelId) }
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Otel bulunamadı' });
    }

    if (req.user?.rol !== 'ADMIN' && req.user?.id !== hotel.yoneticiId) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    // Check if room number already exists in the hotel
    const existingRoom = await prisma.oda.findFirst({
      where: {
        otelId: Number(otelId),
        numara
      }
    });

    if (existingRoom) {
      return res.status(400).json({ error: 'Bu oda numarası zaten kullanılıyor' });
    }

    const room = await prisma.oda.create({
      data: {
        numara,
        tip,
        fiyat: Number(fiyat),
        otelId: Number(otelId)
      }
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ error: 'Oda oluşturulamadı' });
  }
});

// Update room (admin or hotel manager)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { numara, tip, fiyat } = req.body;

    // Check if user is admin or hotel manager
    const room = await prisma.oda.findUnique({
      where: { id: Number(id) },
      include: {
        otel: true
      }
    });

    if (!room) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    if (req.user?.rol !== 'ADMIN' && req.user?.id !== room.otel.yoneticiId) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    // Check if new room number conflicts with existing room
    if (numara !== room.numara) {
      const existingRoom = await prisma.oda.findFirst({
        where: {
          otelId: room.otelId,
          numara
        }
      });

      if (existingRoom) {
        return res.status(400).json({ error: 'Bu oda numarası zaten kullanılıyor' });
      }
    }

    const updatedRoom = await prisma.oda.update({
      where: { id: Number(id) },
      data: {
        numara,
        tip,
        fiyat: Number(fiyat)
      }
    });

    res.json(updatedRoom);
  } catch (error) {
    console.error('Update room error:', error);
    res.status(500).json({ error: 'Oda güncellenemedi' });
  }
});

// Delete room (admin or hotel manager)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin or hotel manager
    const room = await prisma.oda.findUnique({
      where: { id: Number(id) },
      include: {
        otel: true
      }
    });

    if (!room) {
      return res.status(404).json({ error: 'Oda bulunamadı' });
    }

    if (req.user?.rol !== 'ADMIN' && req.user?.id !== room.otel.yoneticiId) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    await prisma.oda.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Oda başarıyla silindi' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Oda silinemedi' });
  }
});

export default router; 