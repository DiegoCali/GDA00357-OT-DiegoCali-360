import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class OrderController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {        
        try {
            console.log('\x1b[33m%s\x1b[0m',`POST /orders`);
            const { user_id, name, delivery, phone, email, products } = req.body;
            const result : any = await sql.query(
                `EXEC InsertOrder :user_id, :name, :delivery, :phone, :email;`,
                {
                    replacements: {
                        user_id,
                        name,
                        delivery,
                        phone,
                        email
                    },
                    type: QueryTypes.RAW,
                }
            );
            const order_id = result[0][0]?.OrderID;
            const total = await this.setProducts(order_id, products);                     
            await this.setOrderTotal(order_id, total);
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
            res.status(200).send(orders);
        } catch (error) {
            res.status(500).send({ error: "Error selecting orders" });
        }
    }

    selectById = async (req: Request, res: Response) => {
        console.log('\x1b[32m%s\x1b[0m',`GET /orders/:id`);
    }

    // Private and individual methods    
    setProducts = async (order_id: number, products: any) => {
        let total = 0;
        const promises = products.map(async (product: any) => {
            const { id, quantity } = product;
            const result : any = await sql.query(
                `EXEC InsertOrderDetail :order_id, :id, :quantity;`,
                {
                    replacements: {
                        order_id,
                        id,
                        quantity
                    },
                    type: QueryTypes.RAW,
                }
            );
            const subtotal = result[0][0]?.Subtotal;
            total += subtotal;            
        });
        await Promise.all(promises);
        return total;
    }    

    setOrderTotal = async (order_id: number, total: number) => {
        await sql.query(
            `EXEC SetOrder :order_id, :total;`,
            {
                replacements: {
                    order_id,
                    total
                },
                type: QueryTypes.RAW,
            }
        );
    }
}