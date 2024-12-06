import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";

export const OrderDetail = sql.define(
    "OrderDetail", 
    {
        OrderDetailID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        OrderID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProductID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    },
    {        
        timestamps: false
    }
);