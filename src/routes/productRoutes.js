import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  updateById,
} from "../controllers/productControllers.js";
import { productSchema } from "../validations/productValidBody.js";
import { valiBodyRequest } from "../middlewares/valiBodyRequest.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", valiBodyRequest(productSchema), create);
productRoutes.patch("/:id", valiBodyRequest(productSchema), updateById);
productRoutes.delete("/:id", removeById);

export default productRoutes;
