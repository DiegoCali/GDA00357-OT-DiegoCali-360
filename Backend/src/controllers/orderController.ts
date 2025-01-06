import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class OrderController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {        
        try {
            console.log('\x1b[33m%s\x1b[0m',`POST /orders`);
            const { user_id, name, delivery, phone, email, products } = req.body;
            console.log(user_id);
            await sql.query(
                `EXEC InsertOrder :user_id, :name, :delivery, :phone, :email, :products;`,
                {
                    replacements: {
                        user_id,
                        name,
                        delivery,
                        phone,
                        email,
                        products: JSON.stringify(products)
                    },
                    type: QueryTypes.RAW,
                }
            );            
            res.status(200).send({ message: "Order created successfully" });
        } catch (error) {
            res.status(500).send({ error: `${error}` });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[34m%s\x1b[0m',`PUT /orders`);
            const { id } = req.params;
            const { order_name, delivery, phone, email } = req.body;
            await sql.query(
                `EXEC UpdateOrder :id, :order_name, :delivery, :phone, :email;`,
                {
                    replacements: {
                        id,
                        order_name,
                        delivery,
                        phone,
                        email
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Order updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating order" });
        }
    }

    delete = async (req: Request, res: Response) => {
        console.log('\x1b[31m%s\x1b[0m',`DELETE /orders`);
    }

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /orders`);
            const orders = await sql.query("SELECT * FROM Orders");
            res.status(200).send(orders[0]);
        } catch (error) {
            res.status(500).send({ error: "Error selecting orders" });
        }
    }

    selectById = async (req: Request, res: Response) => {
        try {            
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /orders/${id}`);
            const order = await sql.query("SELECT * FROM OrderDetails WHERE OrderID = :id", {
                replacements: { id },
                type: QueryTypes.SELECT,
            });
            res.status(200).send(order);
        } catch (error) {
            res.status(500).send({ error: "Error selecting order" });
        }
    }

    // Private and individual methods 
    selectByUserId = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /orders/user/${id}`);
            const orders = await sql.query("SELECT * FROM Orders WHERE UserID = :id", {
                replacements: { id },
                type: QueryTypes.SELECT,
            });
            res.status(200).send(orders);
        } catch (error) {
            res.status(500).send({ error: "Error selecting orders" });
        }
    }       
}