import { Router } from "express";
import { UserController } from "../controllers/userController";
import { checkAuth } from "../middleware/checkAuth";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", checkAuth, userController.select);
userRouter.get("/users/:id", userController.selectById);
userRouter.post("/users/:kind", userController.insert);
userRouter.put("/users/:id", userController.update);
userRouter.delete("/users/:id", userController.delete);

export { userRouter };
