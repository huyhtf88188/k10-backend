import { Router } from "express";
import {
  create,
  getAll,
  getById,
  removeById,
  softDeleteByIdAndUpdate,
  updateById,
} from "../controllers/productControllers.js";
import { productSchema } from "../validations/productValidBody.js";
import { valiBodyRequest } from "../middlewares/valiBodyRequest.js";

const productRoutes = Router();

productRoutes.get("/", getAll);
productRoutes.get("/:id", getById);
productRoutes.post("/", valiBodyRequest(productSchema), create);
productRoutes.patch("/:id", valiBodyRequest(productSchema), updateById);
productRoutes.patch("/soft-delete/:id", softDeleteByIdAndUpdate);
productRoutes.delete("/:id", removeById);

export default productRoutes;
