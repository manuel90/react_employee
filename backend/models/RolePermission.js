
const { DataTypes } = require('sequelize');

const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();

const Permission = require("./Permission");
const Role = require("./Role");

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id',
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id',
    },
  },
},{
	tableName: 'RolePermission',
});

module.exports = RolePermission