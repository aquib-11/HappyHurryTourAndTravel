import express from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from '../controllers/bookPackageController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/', createBooking);
router.get('/',authenticateUser, getAllBookings);
router.get('/:id', authenticateUser, getBookingById);
router.patch('/:id', authenticateUser, updateBooking);
router.delete('/:id', authenticateUser, deleteBooking);

export default router;