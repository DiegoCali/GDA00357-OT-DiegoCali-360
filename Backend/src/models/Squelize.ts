import { Sequelize } from "@sequelize/core";
import { MsSqlDialect } from "@sequelize/mssql";
import dotenv from "dotenv";

dotenv.config();

export const sql = new Sequelize({
    dialect: MsSqlDialect,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT||"1433"),
    database: process.env.DB_DATABASE,
    authentication: {
        type: "default",
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
    },
});