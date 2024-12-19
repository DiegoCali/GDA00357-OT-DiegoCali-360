import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { checkAuth } from "../middleware/checkAuth";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get("/orders", checkAuth(['operator']), orderController.select);
orderRouter.get("/orders/:id", checkAuth(['operator', 'customer']), orderController.selectById);
orderRouter.post("/orders", checkAuth(['operator', 'customer']), orderController.insert);
orderRouter.put("/orders/:id", checkAuth(['operator']), orderController.update);
orderRouter.delete("/orders/:id", checkAuth(['operator']), orderController.delete);

export { orderRouter };