import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", userController.select);
userRouter.get("/users/:id", userController.selectById);
userRouter.post("/users/:kind", userController.insert);
userRouter.put("/users/:id", userController.update);
userRouter.delete("/users/:id", userController.delete);

export { userRouter };
