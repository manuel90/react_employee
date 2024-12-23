
const { DataTypes } = require('sequelize');

const db = require('../connection/db');

const sequelize = db.getSequelizeInstance();

const Employee = require('./Employee');

const EmployeeRequest = sequelize.define('Request', {
  id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
  code: {
		type: DataTypes.STRING(50),
		allowNull: false,
		unique: true,
	},
  description: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	summary: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	employee_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
      model: Employee,
      key: 'id',
    },
	}
},
{
	timestamps: true,
	
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	
	tableName: 'Request',
});

EmployeeRequest.belongsTo(Employee, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
	foreignKey: 'employee_id',
});

module.exports = EmployeeRequest