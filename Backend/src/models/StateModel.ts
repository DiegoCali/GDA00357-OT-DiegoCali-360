import { sql } from "./Squelize";
import { DataTypes } from "@sequelize/core";

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