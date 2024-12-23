
const { DataTypes } = require('sequelize');

const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();


const Role = sequelize.define('Role', {
  id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
  name: DataTypes.STRING(50),
},
{
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	
	tableName: 'Role',
}
);

module.exports = Role