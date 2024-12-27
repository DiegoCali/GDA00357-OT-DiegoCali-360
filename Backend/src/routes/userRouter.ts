import { Router } from "express";
import { UserController } from "../controllers/userController";
import { checkAuth } from "../middleware/checkAuth";
import { UserTypes } from "../utils/userTypes";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/users", checkAuth([UserTypes.OPERATOR]), userController.select);
userRouter.get("/users/:id", checkAuth([UserTypes.OPERATOR]), userController.selectById);
userRouter.post("/register/:kind", userController.insert);
userRouter.put("/users/:id", checkAuth([UserTypes.OPERATOR]), userController.update);
userRouter.delete("/users/:id", checkAuth([UserTypes.OPERATOR]), userController.delete);

export { userRouter };
