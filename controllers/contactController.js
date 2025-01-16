import { UnauthorizedErr } from '../errors/customErors.js';
import Contact from '../models/contactModel.js';

// Create a new booking
export const createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bookings
export const getAllContacts = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a booking by ID
export const getContactById = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking
export const updateContact = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a booking
export const deleteContact = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Booking not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};