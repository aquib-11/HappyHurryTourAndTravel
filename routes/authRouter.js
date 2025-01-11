import { Router } from "express";
const router = Router();


import { login, logout, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";
import { getUserRole } from "../controllers/userController.js";

router.post("/register",validateRegisterInput, register);
router.post("/login",validateLoginInput, login);
router.get("/logout",  logout);
// router.post("/verify-email", verifyEmail);
router.get("/userRole",getUserRole )
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