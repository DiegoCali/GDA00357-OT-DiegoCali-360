
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";
import { UserController } from "./userController";
import { hashPassword, comparePassword } from "../utils/handleBcrypt";

export class AuthController {
    login = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`POST /login`);
            const { email, password } = req.body;
            const user : any = await sql.query(
                `EXEC LoginEmail :email;`,
                {
                  replacements: {
                    email                    
                  },
                  type: QueryTypes.SELECT,
                }
            );            
            const checkPassword = comparePassword(password, user[0].user_password);
            if (!checkPassword) {
                throw new Error("Invalid password");
            }
            res.status(200).send({ message: "User logged in successfully", user: user[0] });
        } catch (error) {
            res.status(500).send({ error: "Error logging in" });
        }
    }    
}