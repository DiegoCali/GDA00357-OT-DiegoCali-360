import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class CategoryController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        console.log('\x1b[33m%s\x1b[0m',`POST /categories`);
        try {
            const { u_id, category_name } = req.body;            
            const result = await sql.query(
                `EXEC InsertProductCategory :u_id, :category_name;`,
                {
                    replacements: {
                        u_id,
                        category_name
                    },
                    type: QueryTypes.RAW,
                }
            );        
            res.status(201).send({ message: "Category created", category: result });
        } catch (error) {
            res.status(500).send({ error: "Error creating category" });
        }      
    }

    update = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[34m%s\x1b[0m',`PUT /categories`);
            const { id } = req.params;
            const { category_name } = req.body;
            await sql.query(
                `EXEC UpdateProductCategory :id, :category_name;`,
                {
                    replacements: {
                        id,
                        category_name
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Category updated successfully" });
        } catch (error) {
            res.status(500).send({ error: "Error updating category" });
        }
    }

    delete = async (req: Request, res: Response) => {        
        try {
            const { id } = req.params;
            console.log('\x1b[31m%s\x1b[0m',`DELETE /categories/${id}`);
            await sql.query(
                `EXEC InactivateCategory :id;`,
                {
                    replacements: {
                        id
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send({ message: "Category deleted successfully" });
        } catch (error) {
            res.status(500).send({ error: `${error}` });
        }
    }

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /categories`);
            const categories = await sql.query(
                "SELECT * FROM ProductCategories WHERE StateID = 5"
            );
            res.status(200).send(categories[0]);
        } catch (error) {
            res.status(500).send({ error: "Error selecting categories" });
        }
    }

    selectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /categories/${id}`);
            const categories = await sql.query(`SELECT * FROM ProductCategories WHERE id = ${id}`);
            res.status(200).send(categories);
        } catch (error) {
            res.status(500).send({ error: "Error selecting category" });
        }
    }

    // Private and individual methods
    getProductsById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            console.log('\x1b[32m%s\x1b[0m',`GET /categories/${id}/products`);
            const products = await sql.query(
                `EXEC GetProductsOfCategory :id;`,
                {
                    replacements: {
                        id
                    },
                    type: QueryTypes.RAW,
                }
            );
            res.status(200).send(products[0]);
        } catch (error) {
            res.status(500).send({ error: "Error selecting products" });
        }
    }
}