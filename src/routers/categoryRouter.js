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
import { validateBodyRequest } from "../middleware/validationBody.js";
import categoryValidation from "../validation/categoryValidation.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.post(
  "/",
  validateBodyRequest(categoryValidation),
  createCategory
);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", removeCategory);
categoryRouter.patch(
  "/:id",
  validateBodyRequest(categoryValidation),
  updateCategoryById
);
categoryRouter.patch("/soft-delete/:id", softDeleteCategory);
categoryRouter.patch("/restore/:id", restoreCategory);

export default categoryRouter;
