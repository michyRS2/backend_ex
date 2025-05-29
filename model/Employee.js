var Sequelize = require("sequelize");
var sequelize = require("./database");
// importa o modelo – chave forasteira roleID
var Role = require("./Role");
var Employee = sequelize.define(
  "employee",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.BIGINT,
    roleId: {
      type: Sequelize.INTEGER,
      // referência a outro modelo
      references: {
        model: Role,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);
Employee.belongsTo(Role);
module.exports = Employee;
