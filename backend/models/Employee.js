
const { DataTypes } = require('sequelize');

const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();

const Role = require('./Role');

const Employee = sequelize.define('Employee', {
  id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
  name: DataTypes.STRING(50),
  email: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},
	start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	salary: {
		type: DataTypes.DOUBLE,
		allowNull: false,
	},
	password: DataTypes.TEXT,
	role_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
      model: Role,
      key: 'id',
    },
	}
},
{
	timestamps: true,
	
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	
	tableName: 'Employee',
});

Employee.belongsTo(Role, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
	foreignKey: 'role_id',
});

module.exports = Employee