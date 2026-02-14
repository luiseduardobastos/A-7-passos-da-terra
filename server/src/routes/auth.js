import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/api/auth/register", authController.register);
authRouter.post("/api/auth/login", authController.login);
authRouter.patch("/api/auth/password", authController.updatePassword);
authRouter.patch("/api/auth/profile", authController.updateProfile);

export { authRouter };
