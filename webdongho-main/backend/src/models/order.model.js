import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const Order = sequelize.define(
    "orders",
    {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        user_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "completed", "canceled"),
            defaultValue: "pending",
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "orders",
        timestamps: false,
    }
);

export default Order;

