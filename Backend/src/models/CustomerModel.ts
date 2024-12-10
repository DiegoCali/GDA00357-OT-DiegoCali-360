import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { User } from "./UserModel";

export const Customer = sql.define(
    "Customer",
    {
        CustomerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        comercial_name: {
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
    },
    {
        timestamps: false,
    }
);

Customer.hasMany(User, {
    foreignKey: "CustomerId",
});