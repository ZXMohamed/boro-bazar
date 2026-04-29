import express from "express";
import * as authController from "./auth.controller.js";
import { validate, registerSchema, loginSchema, forgotSchema, otpSchema, resetSchema, changeSchema, googleSchema } from "./validation.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refreshTokens);
router.post("/logout", protect, authController.logout);
router.post("/google", validate(googleSchema), authController.googleAuth);

router.post("/verify-email", validate(otpSchema), authController.verifyEmail);
router.post("/forgot-password", validate(forgotSchema), authController.forgotPassword);
router.post("/verify-otp", validate(otpSchema), authController.verifyOtp);
router.post("/reset-password", validate(resetSchema), authController.resetPassword);

router.get("/profile", protect, authController.getProfile);
router.post("/change-password", protect, validate(changeSchema), authController.changePassword);

export default router;