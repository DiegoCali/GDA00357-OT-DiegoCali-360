import { Router } from "express";
import { DashBoardController } from "../controllers/dashboardController";
import { checkAuth } from "../middleware/checkAuth";
import { UserTypes } from "../utils/userTypes";

const dashboardRouter = Router();
const dashboardController = new DashBoardController();

dashboardRouter.get("/dashboard/:kind/tops", checkAuth([UserTypes.OPERATOR]), dashboardController.getTops);
dashboardRouter.get("/dashboard/actives", checkAuth([UserTypes.OPERATOR]), dashboardController.getActives);

export { dashboardRouter };