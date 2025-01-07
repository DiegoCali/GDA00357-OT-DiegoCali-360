import { Request, Response } from "express";
import { sql } from "../database/Connection";
import { QueryTypes } from "@sequelize/core";

export class DashBoardController {
    getTops = async (req: Request, res: Response) => {
        try {
            const { kind } = req.params;
            // Kind is either 'products' or 'clients'
            console.log('\x1b[32m%s\x1b[0m',`GET /dashboard/${kind}/tops`);
            // Tops are a view in the database, named: Top10Products, Top10Clients
            const result = await sql.query(
                `SELECT * FROM Top10${kind};`,
                {
                    replacements: {
                        kind
                    },
                    type: QueryTypes.SELECT,
                }
            );
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: "Error getting tops" });
        }
    }

    getActives = async (req: Request, res: Response) => {
        try {
            console.log('\x1b[32m%s\x1b[0m',`GET /dashboard/actives`);
            // Actives is a view in the database, named: ActiveProducts
            const result = await sql.query(
                `SELECT * FROM ActiveProducts;`,
                {
                    type: QueryTypes.SELECT,
                }
            );
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ error: "Error getting actives" });
        }
    }
}