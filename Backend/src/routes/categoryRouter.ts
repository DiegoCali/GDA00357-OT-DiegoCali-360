import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { checkAuth } from "../middleware/checkAuth";
import { UserTypes } from "../utils/userTypes";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/categories", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), categoryController.select);
categoryRouter.get("/categories/:id", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), categoryController.selectById);
categoryRouter.post("/categories", checkAuth([UserTypes.OPERATOR]), categoryController.insert);
categoryRouter.put("/categories/:id", checkAuth([UserTypes.OPERATOR]), categoryController.update);
categoryRouter.delete("/categories/:id", checkAuth([UserTypes.OPERATOR]), categoryController.delete);
categoryRouter.get("/categories/:id/products", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), categoryController.getProductsById);

export { categoryRouter };