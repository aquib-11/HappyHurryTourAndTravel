import { UnauthorizedErr } from '../errors/customErors.js';
import Testimonial from '../models/testimonialModel.js';

// Create a new booking
export const createTestimonial = async (req, res) => {
    try {
        const testimonial = new Testimonial(req.body);
        await testimonial.save();
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings
export const getAllTestimonials = async (req, res) => {
    // if (req?.user?.role !== "admin")
    //     throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a booking by ID
export const getTestimonialById = async (req, res) => {
    // if (req.user.role !== "admin")
    //     throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking
export const updateTestimonial = async (req, res) => {
    // if (req.user.role !== "admin")
    //     throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!testimonial) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a booking
export const deleteTestimonial = async (req, res) => {
    // if (req.user.role !== "admin")
    //     throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) return res.status(404).json({ message: 'Booking not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};