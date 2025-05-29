const express = require("express");
const app = express();
var cors = require("cors");
const { sequelize, Role } = require("./model");

app.use(cors());
//Middlewares
app.use(express.json());

//importação de rotas[1]
const employeeRouters = require("./routes/employeeRoute");
const sequelize = require("./model/database");
//Rota
app.use("/employee", employeeRouters);

//Configurações
app.set("port", process.env.PORT || 3000);

//Rotas
app.use("/teste", (req, res) => {
  res.send("Rota TESTE.");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Ligação à base de dados estabelecida");

    await sequelize.sync();

    const existingRoles = await Role.findAll();
    if (existingRoles.length === 0) {
      await Role.bulkCreate([
        { role: "Admin" },
        { role: "Project Manager" },
        { role: "Programmer" },
      ]);
      console.log("Roles criados!");
    } else {
      console.log("Roles já existem, tenha um bom dia");
    }

    app.listen(app.get("port"), () => {
      console.log("Start server on port " + app.get("port"));
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação: ", error);
  }
})();
