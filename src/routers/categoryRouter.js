import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  removeCategory,
  restoreCategory,
  softDeleteCategory,
  updateCategoryById,
} from "../controllers/categoryControllers.js";
import categoryValidation from "../validation/categoryValidation.js";
import { validateBodyRequest } from "./../middleware/validationBody.js";
import { verifyAuth, verifyToken } from "./../middleware/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/", verifyToken, getAllCategories);

categoryRouter.post(
  "/",
  verifyAuth,
  validateBodyRequest(categoryValidation),
  createCategory
);
categoryRouter.get("/:id", verifyToken, getCategoryById);
categoryRouter.delete("/:id", verifyAuth, removeCategory);
categoryRouter.patch(
  "/:id",
  verifyAuth,
  validateBodyRequest(categoryValidation),
  updateCategoryById
);
categoryRouter.patch("/soft-delete/:id", verifyAuth, softDeleteCategory);
categoryRouter.patch("/restore/:id", verifyAuth, restoreCategory);

export default categoryRouter;
