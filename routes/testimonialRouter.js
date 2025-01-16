import express from 'express';
import { createTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/', createTestimonial);
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.delete('/:id', deleteTestimonial);

export default router;