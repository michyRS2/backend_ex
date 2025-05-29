const Role = require("../model/Role");
const sequelize = require("../model/database");

const seedRoles = async () => {
  await sequelize.sync();

  const roles = ["Admin", "Project Manager", "Programmer"];
  for (const role of roles) {
    await Role.findOrCreate({ where: { role } });
  }

  console.log("Roles inseridas!");
  process.exit();
};

seedRoles();
