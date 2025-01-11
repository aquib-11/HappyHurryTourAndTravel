import { Router } from "express";
const router = Router();

import {
  getAllDestinations,
  getSingleDestination,
  updateDestination,
  createDestination,
  deleteDestination,
  addImage,
  deleteImage,
  getAllImages
} from "../controllers/destinationController.js";

import {
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

router
  .route("/")
  .get(getAllDestinations)
  .post(authenticateUser, createDestination);

router
  .route("/:id")
  .get(validateIdParam, getSingleDestination)
  .patch(authenticateUser, validateIdParam, updateDestination)
  .delete(authenticateUser, validateIdParam, deleteDestination);

// Image routes
router
  .route("/:id/images")
  .get(validateIdParam, getAllImages)
  .post(authenticateUser, upload.single("image"), validateIdParam, addImage);

router
  .route("/:id/images/:imageId")
  .delete(authenticateUser, validateIdParam, deleteImage);

export default router;
