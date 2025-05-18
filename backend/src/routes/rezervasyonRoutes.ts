import express from 'express';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservationStatus
} from '../controllers/rezervasyonController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all reservations (protected route)
router.get('/', authenticateToken, getReservations);

// Get reservation by ID (protected route)
router.get('/:id', authenticateToken, getReservation);

// Create new reservation (protected route)
router.post('/', authenticateToken, createReservation);

// Update reservation status (protected route)
router.patch('/:id/status', authenticateToken, updateReservationStatus);

export default router; 