import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const Cart = sequelize.define(
    "Cart",
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "carts",
        timestamps: false,
    }
);

export default Cart;
