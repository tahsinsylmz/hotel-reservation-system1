import { Router } from 'express';
import { auth, rolKontrol } from '../middlewares/auth';
import { validate } from '../middlewares/validation';
import { odaSchema } from '../middlewares/validation';
import { odaOlustur, musaitOdalariListele } from '../controllers/oda';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ mesaj: 'Oda route çalışıyor' });
});

// Public routes
router.get('/musait', musaitOdalariListele);

// Protected routes (Hotel Manager only)
router.post('/:otelId', auth, rolKontrol(['OTEL_YONETICISI']), validate(odaSchema), odaOlustur);
router.put('/:id', auth, rolKontrol(['OTEL_YONETICISI']), (req, res) => {
  res.json({ mesaj: 'Oda güncellendi' });
});

export default router; 