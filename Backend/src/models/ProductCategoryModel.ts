import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { Product } from "./ProductModel";

export const ProductCategory = sql.define(
    "ProductCategory",
    {
        CategoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,            
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        StateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {      
        tableName: "ProductCategories",  
        timestamps: false,
    }
);

ProductCategory.hasMany(Product, {
    foreignKey: "CategoryId",
});