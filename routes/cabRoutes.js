import { Router } from "express";
const router = Router();

import {
  getAllCabs,
  getSingleCab,
  updateCab,
  createCab,
  deleteCab,
  getCabsByType,
  getAvailableCabs
} from "../controllers/cabController.js";

import {
  validateIdParam,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

router
  .route("/")
  .get(getAllCabs)
  .post(authenticateUser, upload.single("image"), createCab);

router
  .route("/:id")
  .get(validateIdParam, getSingleCab)
  .patch(authenticateUser, upload.single("image"), validateIdParam, updateCab)
  .delete(authenticateUser, validateIdParam, deleteCab);

// Filter routes
router.get("/filter/type", getCabsByType);
router.get("/filter/available", getAvailableCabs);

export default router;
