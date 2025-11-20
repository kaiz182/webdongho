// models/profile.model.js
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { randomUUID } from "crypto";

class Profile extends Model { }

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => randomUUID(),
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        gender: {
            type: DataTypes.ENUM("male", "female", "other"),
            allowNull: false,
            defaultValue: "other",
        },
    },
    {
        sequelize,
        modelName: "Profile",
        tableName: "profiles",
        timestamps: false,
    }
);

export default Profile;
