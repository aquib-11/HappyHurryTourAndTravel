import cab from "../models/cabModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import { formatImage } from "../middleware/multer.js";
import cloudinary from "cloudinary";

export const getAllCabs = async (req, res) => {
  const cabs = await cab.find({});
  res.status(StatusCodes.OK).json({ cabs });
};

export const createCab = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const newCab = { ...req.body };
  
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newCab.image = response.secure_url;
    newCab.imageId = response.public_id;
  }

  const cabs = await cab.create(newCab);
  res.status(StatusCodes.CREATED).json({ cabs });
};

export const getSingleCab = async (req, res) => {
  const { id } = req.params;
  const cabs = await cab.findById(id);
  if (!cabs) throw new NotFoundErr(`no cab with id ${id}`);
  res.status(StatusCodes.OK).json({ cabs });
};

export const updateCab = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const { id } = req.params;
  const cabs = await cab.findById(id);
  if (!cabs) throw new NotFoundErr(`no cab with id ${id}`);

  const updateData = { ...req.body };

  if (req.file) {
    // Delete old image if exists
    if (cabs.imageId) {
      await cloudinary.v2.uploader.destroy(cabs.imageId);
    }
    // Upload new image
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    updateData.image = response.secure_url;
    updateData.imageId = response.public_id;
  }

  const updatedCab = await cab.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  
  res.status(StatusCodes.OK).json({ msg: "cab modified", cab: updatedCab });
};

export const deleteCab = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const { id } = req.params;
  const cabs = await cab.findById(id);
  if (!cabs) throw new NotFoundErr(`no cab with id ${id}`);

  // Delete image from Cloudinary if exists
  if (cabs.imageId) {
    await cloudinary.v2.uploader.destroy(cabs.imageId);
  }

  // Delete cab from database
  await cab.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "cab and image deleted" });
};

// Filter operations
export const getCabsByType = async (req, res) => {
  const { type } = req.query;
  const cabs = await cab.find({ type });
  res.status(StatusCodes.OK).json({ cabs });
};

export const getAvailableCabs = async (req, res) => {
  const cabs = await cab.find({ isAvailable: true });
  res.status(StatusCodes.OK).json({ cabs });
};
