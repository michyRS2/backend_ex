const { request } = require("express");
var Employee = require("../model/Employee");
var Role = require("../model/Role");
var sequelize = require("../model/database");
const controllers = {};
sequelize.sync();

/* REGISTAR ---------------------- */
controllers.create = async (req, res) => {
  // data
  const { name, email, address, phone, role } = req.body;
  // create
  const data = await Employee.create({
    name: name,
    email: email,
    address: address,
    phone: phone,
    roleId: role,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      console.log("Erro: " + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    message: "Registado",
    data: data,
  });
};

controllers.list = async (req, res) => {
  const data = await Employee.findAll({
    include: [Role],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

/* BUSCAR para EDITAR ----------------------------------------------- */
controllers.get = async (req, res) => {
  const { id } = req.params;
  const data = await Employee.findAll({
    where: { id: id },
    include: [Role],
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

/* EDITAR --------------------------------------------------- */
controllers.update = async (req, res) => {
  console.log("BODY RECEBIDO: ", req.body);

  const { id } = req.params;
  const { name, email, address, phone, role } = req.body;

  console.log("ID:", id);
  console.log("BODY:", req.body);

  try {
    const data = await Employee.update(
      {
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role,
      },
      {
        where: { id: id },
      }
    );

    if (data[0] === 1) {
      res.json({ success: true, message: "Updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Employee not found or no changes made" });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


/*APAGAR------------------ */

controllers.delete = async (req, res) =>{
  //parâmetros por post
  const { id } = req.body;
  //delete por sequelize
  const del = await Employee.destroy({
    where: {id: id}
  })
  res.json({success: true, deleted:del, message:"Deleted successful"});
};

module.exports = controllers;
