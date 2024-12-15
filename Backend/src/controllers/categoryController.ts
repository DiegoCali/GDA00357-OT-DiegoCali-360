import { ControllerInterface } from "../interfaces/controllerInterface";
import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class CategoryController implements ControllerInterface {
    insert = async (req: Request, res: Response) => {
        console.log('\x1b[33m%s\x1b[0m',`POST /categories`);
        try {
            const { user_id, category_name } = req.body;
            const result = await sql.query(
                `EXEC InsertProductCategory :user_id, :category_name;`,
                {
                    replacements: {
                        user_id,
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
        console.log('\x1b[34m%s\x1b[0m',`PUT /categories`);
    }

    delete = async (req: Request, res: Response) => {
        console.log('\x1b[31m%s\x1b[0m',`DELETE /categories`);
        try {
            const { id } = req.params;
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
            res.status(500).send({ error: "Error deleting category" });
        }
    }

    select = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /categories`);
            const categories = await sql.query("SELECT * FROM ProductCategories");
            res.status(200).send(categories);
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
}