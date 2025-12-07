import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { } from "sequelize";

const Review = sequelize.define(
    "Reviews",
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
        product_id: {
            type: DataTypes.CHAR(36),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: DataTypes.TEXT,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "reviews",
        timestamps: false,
    }
);
export default Review;