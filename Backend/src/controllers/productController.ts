import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class ProductController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");        
    }

    update = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    }

    delete = async (req: Request, res: Response) => {
        throw new Error("Method not implemented.");
    }

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /products`);
            const products = await sql.query("SELECT * FROM products");
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ error: "Error selecting products" });
        }
    }

    selectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /products/${id}`);
            const products = await sql.query(`SELECT * FROM products WHERE id = ${id}`);
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send({ error: "Error selecting product" });
        }
    }

    // Private and individual methods}

}