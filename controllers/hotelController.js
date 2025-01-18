import hotel from "../models/hotelModel.js";
import TourPackage from '../models/tourPackageModel';
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import { formatImage } from "../middleware/multer.js";
import cloudinary from "cloudinary";

export const getAllHotels = async (req, res) => {
  const hotels = await hotel.find({});
  res.status(StatusCodes.OK).json({ hotels });
};

export const createHotel = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const hotels = await hotel.create(req.body);
  res.status(StatusCodes.CREATED).json({ hotels });
};

export const addImage = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
  const hotels = await hotel.findById(id);
  if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);

  // Check if already has 4 images
  if (hotels.images.length >= 4) {
    throw new Error("Maximum limit of 4 images reached for this hotel");
  }

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    hotels.images.push({
      image: response.secure_url,
      imageId: response.public_id
    });
    await hotels.save();
  }
  res.status(StatusCodes.OK).json({ msg: "Image added successfully" });
};

export const deleteImage = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id, imageId } = req.params;
  const hotels = await hotel.findById(id);
  if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);

  // Delete from Cloudinary
  await cloudinary.v2.uploader.destroy(imageId);
  
  // Remove from database
  hotels.images = hotels.images.filter(img => img.imageId !== imageId);
  await hotels.save();

  res.status(StatusCodes.OK).json({ msg: "Image deleted successfully" });
};

export const getAllImages = async (req, res) => {
  const { id } = req.params;
  const hotels = await hotel.findById(id);
  if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);

  res.status(StatusCodes.OK).json({ images: hotels.images });
};

export const getSingleHotel = async (req, res) => {
  const { id } = req.params;
  const hotels = await hotel.findById(id);
  if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);
  res.status(StatusCodes.OK).json({ hotels });
};

export const updateHotel = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const hotels = await hotel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "hotel modified", hotels });
};

export const deleteHotel = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  try {
    const hotels = await hotel.findById(id);
    if (!hotels) throw new NotFoundErr(`no hotel with id ${id}`);

    // Delete all images from Cloudinary
    for (const image of hotels.images) {
      await cloudinary.v2.uploader.destroy(image.imageId);
    }

    // Remove the hotel from the database
    await hotel.findByIdAndRemove(id);

    // Update all tour packages to remove the deleted hotel ID
    await TourPackage.updateMany({ hotels: id }, { $pull: { hotels: id } });

    return res.status(StatusCodes.OK).json({ msg: "Hotel deleted successfully and removed from packages." });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting hotel', error });
  }
};
