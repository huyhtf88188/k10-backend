import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../validations/auth.js";
import { valiBodyRequest } from "../middlewares/valiBodyRequest.js";

const authRoutes = Router();

authRoutes.post("/register", valiBodyRequest(registerSchema), register);

authRoutes.post("/login", valiBodyRequest(loginSchema), login);

export default authRoutes;
