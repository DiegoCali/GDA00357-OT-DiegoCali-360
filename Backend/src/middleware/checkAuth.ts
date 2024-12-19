import { verifyToken } from "../utils/webToken";
import { Request, Response, NextFunction } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";


export const checkAuth = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ").pop();
        const tokenData = verifyToken(token || "");
        const userRole : any = await sql.query(
            `EXEC SearchUserRole :roleID;`,
            {
                replacements: { roleID: tokenData.role },
                type: QueryTypes.RAW
            }
        );
        const role = userRole[0][0].role_name.toLowerCase();        
        if (roles.includes(role)) {
            next();
        } else {
            res.status(401).send({ error: "Unauthorized" });
        }
    } catch (error) {
        res.status(401).send({ error: "Unauthorized" });
    }
}
