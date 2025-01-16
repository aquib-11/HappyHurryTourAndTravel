import express from 'express';
import { createContact, getAllContacts, getContactById, updateContact, deleteContact } from '../controllers/contactController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.post('/', createContact);
router.get('/',authenticateUser, getAllContacts);
router.get('/:id', authenticateUser, getContactById);
router.patch('/:id', authenticateUser, updateContact);
router.delete('/:id', authenticateUser, deleteContact);

export default router;