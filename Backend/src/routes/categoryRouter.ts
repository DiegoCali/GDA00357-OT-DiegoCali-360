import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/categories", categoryController.select);
categoryRouter.get("/categories/:id", categoryController.selectById);
categoryRouter.post("/categories", categoryController.insert);
categoryRouter.put("/categories/:id", categoryController.update);
categoryRouter.delete("/categories/:id", categoryController.delete);

export { categoryRouter };