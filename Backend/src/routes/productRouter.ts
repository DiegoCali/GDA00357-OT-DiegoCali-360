import { Router } from "express";
import { ProductController } from "../controllers/productController";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/products", productController.select);
productRouter.get("/products/:id", productController.selectById);
productRouter.post("/products", productController.insert);
productRouter.put("/products/:id", productController.update);
productRouter.delete("/products/:id", productController.delete);

export { productRouter };