import cabPricing from "../models/cabPricing.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";

// Get all cab pricing entries
export const getAllCabPricing = async (req, res) => {
    const pricing = await cabPricing.find({}).populate('pricing.cabType');
    res.status(StatusCodes.OK).json({ pricing });
};

// Create a new cab pricing entry
export const createCabPricing = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { route, pricing } = req.body;
    const newPricing = await cabPricing.create({ route, pricing });
    res.status(StatusCodes.CREATED).json({ newPricing });
};

// Get a single cab pricing entry by ID
export const getSingleCabPricing = async (req, res) => {
    const { id } = req.params;
    const pricing = await cabPricing.findById(id).populate('pricing.cabType');
    if (!pricing) throw new NotFoundErr(`No pricing found with id ${id}`);
    res.status(StatusCodes.OK).json({ pricing });
};

// Update a cab pricing entry
export const updateCabPricing = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { id } = req.params;
    const updatedPricing = await cabPricing.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPricing) throw new NotFoundErr(`No pricing found with id ${id}`);
    res.status(StatusCodes.OK).json({ msg: "Pricing updated", updatedPricing });
};

// Delete a cab pricing entry
export const deleteCabPricing = async(req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { id } = req.params;
    const pricing = await cabPricing.findById(id);
    if (!pricing) throw new NotFoundErr(`No pricing found with id ${id}`);
    await cabPricing.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: "Pricing deleted" });
};     