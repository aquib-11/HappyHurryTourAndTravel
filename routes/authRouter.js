import { Router } from "express";
const router = Router();


import { login, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";
import { getUserRole } from "../controllers/userController.js";
import { updateAdminData } from "../controllers/detailsController.js";
import upload from "../middleware/multer.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
router.post("/register",validateRegisterInput, register);
router.post("/login",validateLoginInput, login);
router.get("/logout",  logout);
router.get("/userRole",getUserRole )
router.patch("/update-user-details/:id", authenticateUser, upload.single("image"),updateAdminData
);

// router.post("/verify-email", verifyEmail);
// router.get("/admin-data", getAdminData);
// router.patch(
//   "/update-user-details/:id",
//   authenticateUser,
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "avatar1", maxCount: 1 },
//   ]),
//   updateAdminData
// );


export default router