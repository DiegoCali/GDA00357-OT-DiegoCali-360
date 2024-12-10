import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { User } from "./UserModel";
import { Product } from "./ProductModel";
import { ProductCategory } from "./ProductCategoryModel";
import { Order } from "./OrderModel";

export const State = sql.define(
    "State",
    {
        StateId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        state_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    },
    {        
        timestamps: false,
    }
)

State.hasMany(User, {
    foreignKey: "StateId",
});

State.hasMany(Product, {
    foreignKey: "StateId",
});

State.hasMany(ProductCategory, {
    foreignKey: "StateId",
});

State.hasMany(Order, {
    foreignKey: "StateId",
});