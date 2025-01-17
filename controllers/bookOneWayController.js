import { UnauthorizedErr } from '../errors/customErors.js';
import BookOneWay from '../models/bookOneWayModel.js';

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const booking = new BookOneWay(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const bookings = await BookOneWay.find().populate('selectCab', 'name image');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const booking = await BookOneWay.findById(req.params.id).populate('selectCab', 'name image');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking
export const updateBooking = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const booking = await BookOneWay.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const booking = await BookOneWay.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};