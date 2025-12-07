import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import Order from "./order.model.js"; // <-- QUAN TRỌNG: import Order trước khi define association

const OrderItem = sequelize.define(
    "order_items",
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

// =============================
//        ASSOCIATIONS
// =============================

Order.hasMany(OrderItem, {
    foreignKey: "order_id",
    as: "items",
});

OrderItem.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
});

export default OrderItem;
