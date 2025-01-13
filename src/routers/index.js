import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/auth", authRouter);

export default router;
