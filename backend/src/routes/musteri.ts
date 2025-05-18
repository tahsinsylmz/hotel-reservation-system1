import { Router } from 'express';
import { auth, rolKontrol } from '../middlewares/auth';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ mesaj: 'Müşteri route çalışıyor' });
});

// Protected routes
router.get('/profil', auth, (req, res) => {
  res.json({ mesaj: 'Müşteri profili' });
});

// Admin only routes
router.get('/', auth, rolKontrol(['ADMIN']), (req, res) => {
  res.json({ mesaj: 'Tüm müşteriler' });
});

export default router; 