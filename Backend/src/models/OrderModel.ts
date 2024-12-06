import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";

export const Order = sql.define(
    "Order",
    {
        OrderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        StateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        order_name: { // Name of the buyer
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        delivery_address: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        delivery_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);