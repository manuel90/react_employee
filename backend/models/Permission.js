
const { DataTypes } = require('sequelize');

const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();

const Permission = sequelize.define('Permission', {
  id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
  code: DataTypes.STRING(50),
},
{
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	
	tableName: 'Permission',
}
);

module.exports = Permission