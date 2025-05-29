var Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "ai2_ex", //database
  "postgres_miguel", //username
  "wzuIuyakQHz2jgpgYuUvoZ5eP6LWHw2u",//password
  {
    host: "dpg-d0s3hc2dbo4c73bb7p20-a",
    port: "5432",
    dialect: "postgres",
  }
);
module.exports = sequelize;
