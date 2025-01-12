import { Router } from "express";
const router = Router();

import {
  getAllPriceLists,
  createPriceList,
  updatePriceList,
  deletePriceList,
} from "../controllers/priceListController.js";

import { validateIdParam } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllPriceLists)
  .post(authenticateUser, createPriceList);

router
  .route("/:id")
  .patch(authenticateUser, validateIdParam, updatePriceList)
  .delete(authenticateUser, validateIdParam, deletePriceList);

export default router;
