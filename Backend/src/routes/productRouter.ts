import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { checkAuth } from "../middleware/checkAuth";
import { UserTypes } from "../utils/userTypes";

const productRouter = Router();
const productController = new ProductController();

productRouter.get("/products", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), productController.select);
productRouter.get("/products/:id", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), productController.selectById);
productRouter.post("/products", checkAuth([UserTypes.OPERATOR]), productController.insert);
productRouter.put("/products/:id", checkAuth([UserTypes.OPERATOR]), productController.update);
productRouter.put("/products/stock", checkAuth([UserTypes.OPERATOR]), productController.updateStock);
productRouter.delete("/products/:id", checkAuth([UserTypes.OPERATOR]), productController.delete);

export { productRouter };