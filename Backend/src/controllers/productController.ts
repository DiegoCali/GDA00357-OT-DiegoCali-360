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
        console.log('\x1b[34m%s\x1b[0m',`PUT /products`);
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

}