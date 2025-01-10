import { Router } from "express";

import { valiBodyRequest } from "../validations/index.js";

import { categoriesSchema } from "../validations/categories.js";
import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from "../controllers/categoriesControllers.js";

const categoriesRoutes = Router();

categoriesRoutes.get("/", getAll);
categoriesRoutes.get("/:id", getById);
categoriesRoutes.post("/", valiBodyRequest(categoriesSchema), create);
categoriesRoutes.patch("/:id", valiBodyRequest(categoriesSchema), updateById);
categoriesRoutes.delete("/:id", removeById);

export default categoriesRoutes;
