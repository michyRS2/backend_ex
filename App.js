const express = require("express");
const app = express();
var cors=require('cors');

app.use(cors());
//Middlewares
app.use(express.json());


//importação de rotas[1]
const employeeRouters = require('./routes/employeeRoute');
//Rota
app.use('/employee', employeeRouters);

//Configurações
app.set("port", process.env.PORT || 3000);


//Rotas
app.use("/teste", (req, res) => {
  res.send("Rota TESTE.");
});

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
