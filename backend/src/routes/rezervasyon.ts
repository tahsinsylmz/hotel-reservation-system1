import { Router } from 'express';
import { auth, rolKontrol } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { rezervasyonSchema } from '../middlewares/validation';
import { rezervasyonYap, rezervasyonIptal } from '../controllers/rezervasyon';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ mesaj: 'Rezervasyon route çalışıyor' });
});

// Protected routes (Customer only)
router.post('/', auth, rolKontrol(['MUSTERI']), validate(rezervasyonSchema), rezervasyonYap);
router.delete('/:id', auth, rolKontrol(['MUSTERI']), rezervasyonIptal);
router.get('/musteri', auth, rolKontrol(['MUSTERI']), (req, res) => {
  res.json({ mesaj: 'Müşteri rezervasyonları' });
});

export default router; 