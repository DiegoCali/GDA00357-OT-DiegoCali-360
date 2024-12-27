import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { checkAuth } from "../middleware/checkAuth";
import { UserTypes } from "../utils/userTypes";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get("/orders", checkAuth([UserTypes.OPERATOR]), orderController.select);
orderRouter.get("/orders/:id", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), orderController.selectById);
orderRouter.post("/orders", checkAuth([UserTypes.OPERATOR, UserTypes.CUSTOMER]), orderController.insert);
orderRouter.put("/orders/:id", checkAuth([UserTypes.OPERATOR]), orderController.update);
orderRouter.delete("/orders/:id", checkAuth([UserTypes.OPERATOR]), orderController.delete);

export { orderRouter };