import { Sequelize } from "@sequelize/core";
import { MsSqlDialect } from "@sequelize/mssql";


export const sql = new Sequelize({
    dialect: MsSqlDialect,
    server: `${process.env.DB_HOST}`,
    port: parseInt(`${process.env.DB_PORT}`),
    database: `${process.env.DB_NAME}`,
    authentication: {
        type: 'default',
        options: {
            userName: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASS}`,
        },
    },
    trustServerCertificate: true,
});