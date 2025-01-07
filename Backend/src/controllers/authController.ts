
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";
import { hashPassword, comparePassword } from "../utils/handleBcrypt";
import { genToken } from "../utils/webToken";

export class AuthController {
    login = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[33m%s\x1b[0m',`POST /login`);
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
            const token = genToken(user[0]);            
            res.status(200).send({ message: "User logged in successfully", user_id: user[0].UserID, role: user[0].RoleID, token: token, customer_id: user[0].CustomerID });
        } catch (error) {
            res.status(500).send({ error: "Error logging in" });
        }
    }  

    checkState = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /checkState`);
            const { state_id } = req.params;
            const state : any = await sql.query(
                `Select * from States where StateID = :state_id;`,
                {
                  replacements: {
                    state_id                    
                  },
                  type: QueryTypes.SELECT,
                }
            );
            res.status(200).send({ state: state[0] });
        } catch (error) {
            res.status(500).send({ error: "Error checking user" });
        }
    } 
}