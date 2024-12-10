import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";
import { User } from "./UserModel";

export const Role = sql.define(
    "Role",
    {
        RoleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    },
    {        
        timestamps: false,
    }
)

Role.hasMany(User, {
    foreignKey: "RoleId",
});