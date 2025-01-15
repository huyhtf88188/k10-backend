import { Router } from "express";

import { validateBodyRequest } from "../middleware/validationBody.js";
import { verifyAuth, verifyToken } from "../middleware/authMiddleware.js";
import { productValidation } from "../validation/productValidation.js";

const productRouter = Router();

productRouter.get("/", verifyToken, getAllProduct);

productRouter.post(
  "/",
  verifyAuth,
  validateBodyRequest(productValidation),
  createProduct
);
productRouter.get("/:id", verifyToken, getProductById);
productRouter.delete("/:id", verifyAuth, removeProduct);
productRouter.patch(
  "/:id",
  verifyAuth,
  validateBodyRequest(productValidation),
  updateProductById
);
productRouter.patch("/soft-delete/:id", verifyAuth, softDeleteProduct);
productRouter.patch("/restore/:id", verifyAuth, restoreProduct);

export default productRouter;
