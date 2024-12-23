const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();


const Employee = require('./Employee');
const Role = require('./Role');
const Permission = require('./Permission');

const RolePermission = require('./RolePermission');
const EmployeeRequest = require('./EmployeeRequest');


// Define the many-to-many association
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'role_id' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permission_id' });

module.exports = { Role, Permission, Employee, EmployeeRequest, sequelize };