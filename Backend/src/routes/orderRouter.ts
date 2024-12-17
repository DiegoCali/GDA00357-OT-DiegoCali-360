import { Router } from "express";
import { OrderController } from "../controllers/orderController";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get("/orders", orderController.select);
orderRouter.get("/orders/:id", orderController.selectById);
orderRouter.post("/orders", orderController.insert);
orderRouter.put("/orders/:id", orderController.update);
orderRouter.delete("/orders/:id", orderController.delete);

export { orderRouter };