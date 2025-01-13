import { Router } from "express";
const router = Router();

import {
    getAllCabPricing,
    createCabPricing,
    getSingleCabPricing,
    updateCabPricing,
    deleteCabPricing
} from "../controllers/cabPricingController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

// Define routes for cab pricing
router
    .route("/")
    .get(getAllCabPricing) // Get all cab pricing
    .post(authenticateUser, createCabPricing); // Create new cab pricing

router
    .route("/:id")
    .get(getSingleCabPricing) // Get a single cab pricing by ID
    .patch(authenticateUser, updateCabPricing) // Update cab pricing by ID
    .delete(authenticateUser, deleteCabPricing); // Delete cab pricing by ID

export default router;