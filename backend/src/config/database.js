// config/database.js
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default sequelize;
