// scripts/seedRoles.js
const Role = require('../model/Role');
const sequelize = require('../model/database');

async function seed() {
  await sequelize.sync({ force: false }); // sem apagar as tabelas

  const roles = ['Admin', 'Project Manager', 'Programmer'];

  for (const roleName of roles) {
    // cria ou ignora se já existir
    await Role.findOrCreate({ where: { role: roleName } });
  }

  console.log('Roles seed completed.');
  process.exit();
}

seed();
