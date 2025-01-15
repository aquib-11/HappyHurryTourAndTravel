import express from 'express';
import { getAllTourPackages, createTourPackage, getSingleTourPackage, updateTourPackage, deleteTourPackage, addImageToTourPackage } from '../controllers/tourPackageController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Get all tour packages
router.get('/', getAllTourPackages);

// Create a new tour package
router.post('/', authenticateUser, upload.single('image'), createTourPackage);

// Get a single tour package by ID
router.get('/:id', getSingleTourPackage);

// Update a tour package
router.put('/:id', authenticateUser, upload.single('image'), updateTourPackage);

// Delete a tour package
router.delete('/:id', authenticateUser, deleteTourPackage);

// Add an image to a tour package
router.post('/:id/image', authenticateUser, upload.single('image'), addImageToTourPackage);

export default router;
