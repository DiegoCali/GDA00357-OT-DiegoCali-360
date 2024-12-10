import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { Product } from "./ProductModel";
import { ProductCategory } from "./ProductCategoryModel";
import { Order } from "./OrderModel";

export const User = sql.define(
    "User", {
        UserId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        RoleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        StateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        user_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        user_password: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        CustomerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

User.hasMany(Product, {
    foreignKey: "UserId",
});

User.hasMany(ProductCategory, {
    foreignKey: "UserId",
});

User.hasMany(Order, {
    foreignKey: "UserId",
});