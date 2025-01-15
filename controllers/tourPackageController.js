import tourPackage from "../models/tourPackageModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import { formatImage } from "../middleware/multer.js";
import cloudinary from "cloudinary";

// Get all tour packages
export const getAllTourPackages = async (req, res) => {
    const packages = await tourPackage.find({});
    res.status(StatusCodes.OK).json({ packages });
};

// Create a new tour package
export const createTourPackage = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const newPackage = { ...req.body };
    if (req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        newPackage.image = response.secure_url;
        newPackage.imageId = response.public_id;
    }
    const _package = await tourPackage.create(newPackage);
    res.status(StatusCodes.CREATED).json({ _package });
};

// Get a single tour package by ID
export const getSingleTourPackage = async (req, res) => {
    const { id } = req.params;
    const _package = await tourPackage.findById(id);
    if (!_package) throw new NotFoundErr(`No package found with id ${id}`);
    res.status(StatusCodes.OK).json({ _package });
};

// Update a tour package
export const updateTourPackage = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { id } = req.params;
    const _package = await tourPackage.findById(id);
    if (!_package) throw new NotFoundErr(`No package found with id ${id}`);

    if (req.file) {
        // Delete old image if exists
        if (_package.image && _package.image.imageId) {
            await cloudinary.v2.uploader.destroy(_package.image.imageId);
        }
        // Upload new image
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        _package.image = {
            image: response.secure_url,
            imageId: response.public_id
        };
    }
    await _package.save();
    res.status(StatusCodes.OK).json({ msg: "Package updated", _package });
};

// Add an image to a tour package
export const addImageToTourPackage = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { id } = req.params;
    const _package = await tourPackage.findById(id);
    if (!_package) throw new NotFoundErr(`No package found with id ${id}`);

    if (!req.file) {
        throw new Error("Please upload an image");
    }

    const file = formatImage(req.file);{
    const response = await cloudinary.v2.uploader.upload(file);
    _package.image = response.secure_url
    _package.imageId = response.public_id
    }
    await _package.save();
    res.status(StatusCodes.OK).json({ msg: "Image added successfully" });
};

// Delete a tour package
export const deleteTourPackage = async (req, res) => {
    if (req.user.role !== "admin")
        throw new UnauthorizedErr("you are not authorized to access this route");
    const { id } = req.params;
    const _package = await tourPackage.findById(id);
    if (!_package) throw new NotFoundErr(`No package found with id ${id}`);

    // Delete image from Cloudinary if exists
    if (_package.image && _package.image.imageId) {
        await cloudinary.v2.uploader.destroy(_package.image.imageId);
    }

    // Delete tour package from database
    await tourPackage.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json({ msg: "Package and image deleted" });
};
