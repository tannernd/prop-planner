const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    query: `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
  }
);

module.exports = sequelize;
