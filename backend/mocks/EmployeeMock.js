const SequelizeMock = require('sequelize-mock');

// Create a Sequelize Mock instance
const DBMock = new SequelizeMock();

// Define a mocked model
const EmployeeMock = DBMock.define('Employee', {
  id: '123',
  name: 'Emmet Brown',
  email: 'emmet@example.com',
	start_date: '2020-03-26',
	salary: 1500,
	password: 'zzzzz1',
	role_id: 1,
});

module.exports = EmployeeMock;