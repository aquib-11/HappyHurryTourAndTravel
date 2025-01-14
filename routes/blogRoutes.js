import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new blog post
router.post('/', authenticateUser,  createBlog);

// Retrieve all blog posts
router.get('/', getAllBlogs);

// Retrieve a single blog post by ID
router.get('/:id', getBlogById);

// Update an existing blog post
router.put('/:id', authenticateUser,  updateBlog);

// Delete a blog post
router.delete('/:id', authenticateUser,  deleteBlog);

export default router;
