import destination from "../models/destinationModel.js";
import TourPackage from "../models/tourPackageModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import { formatImage } from "../middleware/multer.js";
import cloudinary from "cloudinary";

export const getAllDestinations = async (req, res) => {
  const destinations = await destination.find({});
  res.status(StatusCodes.OK).json({ destinations });
};

export const createDestination = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const destinations = await destination.create(req.body);
  res.status(StatusCodes.CREATED).json({ destinations });
};

export const addImage = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id } = req.params;
  const destinations = await destination.findById(id);
  if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);

  // Check if already has 4 images
  if (destinations.images.length >= 4) {
    throw new Error("Maximum limit of 4 images reached for this destination");
  }
if(!req.file) {
  throw new Error("Please upload an image");
}
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    destinations.images.push({
      image: response.secure_url,
      imageId: response.public_id
    });
    await destinations.save();
  }
  res.status(StatusCodes.OK).json({ msg: "Image added successfully" });
};

export const deleteImage = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");

  const { id, imageId } = req.params;
  const destinations = await destination.findById(id);
  if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);

  // Delete from Cloudinary
  await cloudinary.v2.uploader.destroy(imageId);
  
  // Remove from database
  destinations.images = destinations.images.filter(img => img.imageId !== imageId);
  await destinations.save();

  res.status(StatusCodes.OK).json({ msg: "Image deleted successfully" });
};

export const getAllImages = async (req, res) => {
  const { id } = req.params;
  const destinations = await destination.findById(id);
  if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);

  res.status(StatusCodes.OK).json({ images: destinations.images });
};

export const getSingleDestination = async (req, res) => {
  const { id } = req.params;
  const destinations = await destination.findById(id);
  if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);
  res.status(StatusCodes.OK).json({ destinations });
};

export const updateDestination = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  const destinations = await destination.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);
  res.status(StatusCodes.OK).json({ msg: "destination modified", destinations });
};

export const deleteDestination = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  const { id } = req.params;
  try {
    const destinations = await destination.findById(id);
    if (!destinations) throw new NotFoundErr(`no destination with id ${id}`);

    // Delete all images from Cloudinary
    for (const image of destinations.images) {
      await cloudinary.v2.uploader.destroy(image.imageId);
    }

    // Remove the destination from the database
    await destination.findByIdAndRemove(id);

    // Update all tour packages to remove the deleted destination ID
    await TourPackage.updateMany({ destinations: id }, { $pull: { destinations: id } });

    return res.status(200).json({ message: 'Destination deleted successfully and removed from packages.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting destination', error });
  }
};
// hello