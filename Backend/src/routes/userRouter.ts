import { Router } from "express";
import { UserController } from "../controllers/userController";
import { checkAuth } from "../middleware/checkAuth";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", checkAuth(['operator']), userController.select);
userRouter.get("/users/:id", checkAuth(['operator']), userController.selectById);
userRouter.post("/users/:kind", checkAuth(['operator']), userController.insert);
userRouter.put("/users/:id", checkAuth(['operator']), userController.update);
userRouter.delete("/users/:id", checkAuth(['operator']), userController.delete);

export { userRouter };
