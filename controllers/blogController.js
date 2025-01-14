// Import necessary modules
import Blog from '../models/blogModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multer.js';
import { UnauthorizedErr } from '../errors/customErors.js';

// Create a new blog post
const createBlog = async (req, res) => {
    if(req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const newBlog = new Blog(req.body);

        if (req.file) {
            const file = formatImage(req.file);
            const response = await cloudinary.v2.uploader.upload(file);
            newBlog.image = response.secure_url;
            newBlog.imageId = response.public_id;
        }

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve a single blog post by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing blog post
const updateBlog = async (req, res) => {
    if(req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const updateData = { ...req.body };

        if (req.file) {
            // Delete old image if exists
            if (blog.imageId) {
                await cloudinary.v2.uploader.destroy(blog.imageId);
            }
            // Upload new image
            const file = formatImage(req.file);
            const response = await cloudinary.v2.uploader.upload(file);
            updateData.image = response.secure_url;
            updateData.imageId = response.public_id;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a blog post
const deleteBlog = async (req, res) => {
    if(req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Delete image from Cloudinary if exists
        if (blog.imageId) {
            await cloudinary.v2.uploader.destroy(blog.imageId);
        }

        // Delete blog from database
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog and image deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export the functions
export {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};