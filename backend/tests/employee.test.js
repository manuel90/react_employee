
const dotenv = require('dotenv')

//Configurations
dotenv.config()

//Services
const EmployeeService = require("../services/EmployeeService")

//Mocks
const EmployeeMock = require('../mocks/EmployeeMock');

jest.mock("../models", () => ({
  Employee: require('../mocks/EmployeeMock'),
}));


describe('getEmployeeById', () => {
	const myEmployeeService = new EmployeeService()
	
	it('should return employee data for a valid ID', async () => {
    const employee = await myEmployeeService.getEmployeeById('123');
    expect(employee.id).toBe('123');
    expect(employee.name).toBe('Emmet Brown');
    expect(employee.email).toBe('emmet@example.com');
  });

  it('should throw an error if the employee is not found', async () => {
    
		EmployeeMock.findOne = jest.fn().mockResolvedValue(null);
		
    await expect(myEmployeeService.getEmployeeById('999')).rejects.toThrow('Employee not found');
  });
});
