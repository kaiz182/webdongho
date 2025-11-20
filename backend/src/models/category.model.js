
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const Category = sequelize.define(
    "Categories",
    {
        id: {
            type: DataTypes.CHAR(36),
            primaryKey: true,
            defaultValue: () => uuidv4(),
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: DataTypes.TEXT,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "categories",
        timestamps: false,
    }
);
export default Category;
