import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class ProductController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[33m%s\x1b[0m',`POST /products`);
            const { c_id, u_id, name, brand, code, price } = req.body;
            await sql.query(
                `EXEC InsertProduct :c_id, :u_id, :name, :brand, :code, :price;`,
                {
                    replacements: {
                        c_id,
                        u_id,
                        name,
                        brand,
                        code,                        
                        price                        
                    },
                    type: QueryTypes.RAW,
                }
            );            
            res.status(200).send({ message: "Product created successfully" });
        }catch (error) {
            res.status(500).send({ error: "Error inserting product" });
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[34m%s\x1b[0m',`PUT /products`);
            const { id } = req.params;
            const { name, brand, code, price, picture } = req.body;
            await sql.query(
                `EXEC UpdateProduct :id, :name, :brand, :code, :price, :picture;`,
                {
                    replacements: {
                        id,
                        name,
                        brand,
                        code,
                        price,
                        picture
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Product updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating product" });
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[31m%s\x1b[0m',`DELETE /products/${id}`);
            await sql.query(
                `EXEC InactivateProduct :id;`,
                {
                    replacements: {
                        id
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error deleting product" });
        }
    }

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /products`);
            const products = await sql.query("SELECT * FROM Products");
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ error: "Error selecting products" });
        }
    }

    selectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /products/${id}`);
            const products = await sql.query(`SELECT * FROM Products WHERE id = ${id}`);
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ error: "Error selecting product" });
        }
    }

    // Private and individual methods
    updateStock = async (req: Request, res: Response) => {
        try {
            const { id, quantity } = req.body;
            console.log('\x1b[34m%s\x1b[0m',`PUT /products/stock`);
            await sql.query(
                `EXEC UpdateStock :id, :quantity;`,
                {
                    replacements: {
                        id,
                        quantity
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Stock updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating stock" });
        }
    }
}