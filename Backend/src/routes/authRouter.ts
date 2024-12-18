import { Router } from "express";
import { AuthController } from "../controllers/authController";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);

export { authRouter };