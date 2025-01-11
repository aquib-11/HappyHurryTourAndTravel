import { Router } from "express";
const router = Router();

import {
  getAllHotels,
  getSingleHotel,
  updateHotel,
  createHotel,
  deleteHotel,
  addImage,
  deleteImage,
  getAllImages
} from "../controllers/hotelController.js";

import {
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

router
  .route("/")
  .get(getAllHotels)
  .post(authenticateUser, createHotel);

router
  .route("/:id")
  .get(validateIdParam, getSingleHotel)
  .patch(authenticateUser, validateIdParam, updateHotel)
  .delete(authenticateUser, validateIdParam, deleteHotel);

// Image routes
router
  .route("/:id/images")
  .get(validateIdParam, getAllImages)
  .post(authenticateUser, upload.single("image"), validateIdParam, addImage);

router
  .route("/:id/images/:imageId")
  .delete(authenticateUser, validateIdParam, deleteImage);

export default router;
