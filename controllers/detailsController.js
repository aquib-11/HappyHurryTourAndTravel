import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundErr, UnauthorizedErr } from "../errors/customErors.js";
import { formatImage } from "../middleware/multer.js";
import cloudinary from "cloudinary";

export const updateAdminData = async (req, res) => {
  if (req.user.role !== "admin")
    throw new UnauthorizedErr("you are not authorized to access this route");
  
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new NotFoundErr(`no user with id ${id}`);

  const updateData = { ...req.body };

  if (req.file) {
    // Delete old image if exists
    if (user.imageId) {
      await cloudinary.v2.uploader.destroy(user.imageId);
    }
    // Upload new image
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    updateData.image = response.secure_url;
    updateData.imageId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  
  res.status(StatusCodes.OK).json({ msg: "user modified", user: updatedUser });
};
