import { Router } from "express";
import { loginSchema, regiterSchema } from "../validation/authValidation.js";
import { login, register } from "../controllers/authControllers.js";
import { validateBodyRequest } from "../middleware/validationBody.js";

const authRouter = Router();

authRouter.post("/login", validateBodyRequest(loginSchema), login);
authRouter.post("/register", validateBodyRequest(regiterSchema), register);

export default authRouter;
