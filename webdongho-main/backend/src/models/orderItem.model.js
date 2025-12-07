import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const OrderItem = sequelize.define(
    "OrderItem",
    {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        order_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
        product_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    },
    {
        tableName: "order_items",
        timestamps: false,
    }
);

export default OrderItem;
