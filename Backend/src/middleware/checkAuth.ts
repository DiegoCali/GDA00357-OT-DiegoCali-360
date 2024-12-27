import { verifyToken } from "../utils/webToken";
import { Request, Response, NextFunction } from "express";


export const checkAuth = (roles: number[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ").pop();        
        const tokenData = verifyToken(token || "");
        const role = tokenData.role;     
        if (roles.includes(role)) {
            next();
        } else {
            res.status(401).send({ error: "Unauthorized" });
        }
    } catch (error) {
        res.status(401).send({ error: "Unauthorized" });
    }
}
