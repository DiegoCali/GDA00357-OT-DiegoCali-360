import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { OrderDetail } from "./OrderDetailModel";

export const Product = sql.define(
    "Product",
    {
        ProductId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        brand: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        StateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false,        
    }
);

Product.hasMany(OrderDetail, {
    foreignKey: "ProductId",
});