import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { checkAuth } from "../middleware/checkAuth";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/products", checkAuth(['operator', 'customer']), productController.select);
productRouter.get("/products/:id", checkAuth(['operator', 'customer']), productController.selectById);
productRouter.post("/products", checkAuth(['operator']), productController.insert);
productRouter.put("/products/:id", checkAuth(['operator']), productController.update);
productRouter.put("/products/stock", checkAuth(['operator']), productController.updateStock);
productRouter.delete("/products/:id", checkAuth(['operator']), productController.delete);

export { productRouter };