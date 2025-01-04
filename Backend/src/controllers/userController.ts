import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";
import { hashPassword } from "../utils/handleBcrypt";

export class UserController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        try {
            const { kind } = req.params;   
            console.log('\x1b[33m%s\x1b[0m',`POST /users/${kind}`);     
            let result;    
            switch (kind) {
                case "operator":
                    result = await this.insertOperator(req, res);
                    break;
                case "customer":
                    result = await this.insertCustomer(req, res);
                    break;
                default:
                    throw new Error("Invalid kind");                    
            }
            res.status(200).send({ message: `User created succesfully`, user: result });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error Inserting User", error: error });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[34m%s\x1b[0m',`PUT /users`);
            const { id } = req.params;
            const { email, user_name, user_password, phone, birth_date} = req.body;
            const clean_date = new Date(birth_date).toISOString().split('T')[0];
            const hashedPassword = hashPassword(user_password);
            await sql.query(
                `EXEC UpdateUser :id, :email, :name, :password, :phone, :birthdate;`,
                {
                  replacements: {
                    id,
                    email,            
                    name: user_name,        
                    password: hashedPassword,    
                    phone,            
                    birthdate: clean_date, 
                  },
                  type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating user" });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;    
            console.log('\x1b[31m%s\x1b[0m',`DELETE /users/${id}`);        
            await sql.query(
                `EXEC InactivateUser :id;`,
                {
                  replacements: {
                    id
                  },
                  type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error deleting user" });
        }
    };

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /users`);
            const users = await sql.query("SELECT * FROM Users");
            res.status(200).send(users[0]);
        } catch (error) {            
            res.status(500).send({ error: "Error fetching users" });
        }
    }; 
    
    selectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /users/${id}`);
            const users = await sql.query(`SELECT * FROM Users WHERE UserId = ${id}`);            
            res.status(200).send(users[0][0]);
        } catch (error) {            
            res.status(500).send({ error: "Error fetching user" });
        }
    }

    getCustomerData = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /customer/${id}`);
            const customer = await sql.query(`SELECT * FROM Customers WHERE CustomerID = ${id}`);            
            res.status(200).send(customer[0][0]);
        } catch (error) {            
            res.status(500).send({ error: "Error fetching customer data" });
        }
    }
    // Private and individual methods
    private insertOperator = async (req: Request, res: Response) => {
        try {                 
            const { email, name, password, phone, bdate } = req.body;            
            const clean_date = new Date(bdate).toISOString().split('T')[0];
            const hashedPassword = hashPassword(password);
            const result : any = await sql.query(
                `EXEC InsertOperator :email, :name, :password, :phone, :bdate;`,
                {
                  replacements: {
                    email,            
                    name,        
                    password: hashedPassword,    
                    phone,            
                    bdate: clean_date, 
                  },
                  type: QueryTypes.RAW,
                }
            );    
            // Handle the result to get the user id
            const user_id = result[0][0]?.UserID;
            return user_id;
        } catch (error) {
            throw error;
        }
    }

    private insertCustomer = async (req: Request, res: Response) => {
        try {            
            const { email, name, password, phone, bdate, cy_name, cm_name, address, c_phone, c_email} = req.body;            
            const clean_date = new Date(bdate).toISOString().split('T')[0];            
            const hashedPassword = hashPassword(password);
            const result : any = await sql.query(
                `EXEC InsertCustomer :email, :name, :password, :phone, :bdate, :cy_name, :cm_name, :address, :c_phone, :c_email;`,
                {
                  replacements: {
                    email,            
                    name,        
                    password: hashedPassword,    
                    phone,            
                    bdate: clean_date, 
                    cy_name,
                    cm_name,
                    address,
                    c_phone,
                    c_email
                  },
                  type: QueryTypes.RAW,
                }
            );
            // Handle the result to get the user id
            const user_id = result[0][0]?.UserID;
            return user_id;
        } catch (error) {
            throw error;
        }
    }
}