const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./model/database");
const Role = require("./model/Role");

app.use(cors());
// Middlewares
app.use(express.json());

// Importação de rotas
const employeeRouters = require("./routes/employeeRoute");
const roleRouter = require('./routes/role');

// Rotas
app.use("/employee", employeeRouters);
app.use("/roles", roleRouter);

// Configurações
app.set("port", process.env.PORT || 3000);

app.use("/teste", (req, res) => {
  res.send("Rota TESTE.");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

async function startServer() {
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
      console.log("Roles já existem, tudo ok");
    }

    app.listen(app.get("port"), () => {
      console.log("Start server on port " + app.get("port"));
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação: ", error);
  }
}

// Inicia o servidor
startServer();
