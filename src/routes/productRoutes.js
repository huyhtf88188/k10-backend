import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from "../controllers/productControllers.js";
import { valiBodyRequest } from "../validations/index.js";
import { productSchema } from "../validations/productValidBody.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", valiBodyRequest(productSchema), create);
productRoutes.patch("/:id", valiBodyRequest(productSchema), updateById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
