import { Router } from "express";
import { regiterSchema } from "../validation/authValidation.js";
import { register } from "../controllers/authControllers.js";
import { validateBodyRequest } from "../middleware/validationBody.js";

const authRouter = Router();

// authRouter.post("/login", validateBodyRequest(regiterSchema), register);
authRouter.post("/register", validateBodyRequest(regiterSchema), register);

export default authRouter;
