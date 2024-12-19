import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { checkAuth } from "../middleware/checkAuth";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/categories", checkAuth(['operator', 'customer']), categoryController.select);
categoryRouter.get("/categories/:id", checkAuth(['operator', 'customer']), categoryController.selectById);
categoryRouter.post("/categories", checkAuth(['operator']), categoryController.insert);
categoryRouter.put("/categories/:id", checkAuth(['operator']), categoryController.update);
categoryRouter.delete("/categories/:id", checkAuth(['operator']), categoryController.delete);

export { categoryRouter };