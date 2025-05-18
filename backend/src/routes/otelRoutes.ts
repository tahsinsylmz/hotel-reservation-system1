import express from 'express';
import { PrismaClient, Rol } from '@prisma/client';
import { authenticateToken, isAdmin, isHotelManager } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await prisma.otel.findMany({
      include: {
        odalar: true,
        yonetici: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true
          }
        }
      }
    });
    res.json(hotels);
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({ error: 'Oteller alınamadı' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await prisma.otel.findUnique({
      where: { id: Number(id) },
      include: {
        odalar: true,
        yonetici: {
          select: {
            id: true,
            ad: true,
            soyad: true,
            email: true
          }
        }
      }
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Otel bulunamadı' });
    }

    res.json(hotel);
  } catch (error) {
    console.error('Get hotel error:', error);
    res.status(500).json({ error: 'Otel bilgileri alınamadı' });
  }
});

// Create new hotel (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { ad, aciklama, adres, sehir, yildiz, yoneticiId } = req.body;

    if (!sehir) {
      return res.status(400).json({ error: 'Şehir bilgisi gereklidir' });
    }

    const hotel = await prisma.otel.create({
      data: {
        ad,
        aciklama,
        adres,
        sehir,
        yildiz: Number(yildiz),
        yoneticiId: Number(yoneticiId)
      }
    });

    res.status(201).json(hotel);
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({ error: 'Otel oluşturulamadı' });
  }
});

// Update hotel (admin or hotel manager)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { ad, aciklama, adres, sehir, yildiz } = req.body;

    // Check if user is admin or hotel manager
    const hotel = await prisma.otel.findUnique({
      where: { id: Number(id) }
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Otel bulunamadı' });
    }

    if (req.user?.rol !== Rol.ADMIN && req.user?.id !== hotel.yoneticiId) {
      return res.status(403).json({ error: 'Bu işlem için yetkiniz yok' });
    }

    const updatedHotel = await prisma.otel.update({
      where: { id: Number(id) },
      data: {
        ad,
        aciklama,
        adres,
        sehir,
        yildiz: Number(yildiz)
      }
    });

    res.json(updatedHotel);
  } catch (error) {
    console.error('Update hotel error:', error);
    res.status(500).json({ error: 'Otel güncellenemedi' });
  }
});

// Delete hotel (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.otel.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Otel başarıyla silindi' });
  } catch (error) {
    console.error('Delete hotel error:', error);
    res.status(500).json({ error: 'Otel silinemedi' });
  }
});

export default router; 