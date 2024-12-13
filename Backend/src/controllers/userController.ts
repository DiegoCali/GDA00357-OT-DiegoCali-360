import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class UserController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        try {
            const { kind } = req.params;   
            console.log('\x1b[32m%s\x1b[0m',`POST /users/${kind}`);         
            switch (kind) {
                case "operator":
                    await this.insertOperator(req, res);
                    break;
                case "customer":
                    await this.insertCustomer(req, res);
                    break;
                default:
                    throw new Error("Invalid kind");                    
            }
            res.status(200).send({ message: "User created successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error inserting user" });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            await sql.query(`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id}`);
            res.status(200).send({ message: "User updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating user" });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;    
            console.log('\x1b[32m%s\x1b[0m',`DELETE /users/${id}`);        
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
            const users = await sql.query("SELECT * FROM users");
            res.status(200).send(users);
        } catch (error) {
            console.log('\x1b[31m%s\x1b[0m',`Error: fetching users`);
            res.status(500).send({ error: "Error fetching users" });
        }
    };    

    insertOperator = async (req: Request, res: Response) => {
        try {
            console.log(req);            
            const { email, name, password, phone, birth_date } = req.body;
            const clean_date = new Date(birth_date).toISOString().split('T')[0];
            await sql.query(
                `EXEC InsertOperator :email, :name, :password, :phone, :birthdate;`,
                {
                  replacements: {
                    email,            
                    name,        
                    password,    
                    phone,            
                    birthdate: clean_date, 
                  },
                  type: QueryTypes.RAW,
                }
              );           
        } catch (error) {
            throw error;
        }
    }

    insertCustomer = async (req: Request, res: Response) => {
        try {
            console.log(req);
            const { email, name, password, phone, birth_date, cy_name, cm_name, address, c_phone, c_email} = req.body;
            const clean_date = new Date(birth_date).toISOString().split('T')[0];
            await sql.query(
                `EXEC InsertCustomer :email, :name, :password, :phone, :birthdate, :cy_name, :cm_name, :address, :c_phone, :c_email;`,
                {
                  replacements: {
                    email,            
                    name,        
                    password,    
                    phone,            
                    birthdate: clean_date, 
                    cy_name,
                    cm_name,
                    address,
                    c_phone,
                    c_email
                  },
                  type: QueryTypes.RAW,
                }
              );
        } catch (error) {
            throw error;
        }
    }
}