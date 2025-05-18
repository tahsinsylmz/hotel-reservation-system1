import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Debug endpoint to check database state
router.get('/dbcheck', async (req, res) => {
  try {
    const [
      userCount,
      hotelCount,
      roomCount,
      reservationCount
    ] = await Promise.all([
      prisma.musteri.count(),
      prisma.otel.count(),
      prisma.oda.count(),
      prisma.rezervasyon.count()
    ]);

    // Get role distribution
    const roleDistribution = await prisma.musteri.groupBy({
      by: ['rol'],
      _count: true
    });

    // Get reservation status distribution
    const reservationStatus = await prisma.rezervasyon.groupBy({
      by: ['durum'],
      _count: true
    });

    // Get room status distribution
    const roomStatus = await prisma.odaDurumu.groupBy({
      by: ['durum'],
      _count: true
    });

    res.json({
      counts: {
        users: userCount,
        hotels: hotelCount,
        rooms: roomCount,
        reservations: reservationCount
      },
      roleDistribution,
      reservationStatus,
      roomStatus
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 