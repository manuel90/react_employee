const SequelizeMock = require('sequelize-mock');

// Create a Sequelize Mock instance
const DBMock = new SequelizeMock();

// Define a mocked model
const EmployeeRequestMock = DBMock.define('EmployeeRequest', {
  id: 8001,
  code: "AZ70001",
  description: "Description ipsum",
	summary: "Lorem ipsum",
	employee_id: 1001,
});

module.exports = EmployeeRequestMock;