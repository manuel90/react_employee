
const dotenv = require('dotenv')

//Configurations
dotenv.config()

//Services
const EmployeeRequestService = require("../services/EmployeeRequestService")

//Mocks
const EmployeeRequestMock = require('../mocks/EmployeeMock');

jest.mock("../models", () => ({
  EmployeeRequest: require('../mocks/EmployeeRequestMock'),
}));


describe('getAllEmployeeRequests', () => {
	const myEmployeeRequestService = new EmployeeRequestService()
	
	it('should return all the employee requests data for a valid logged employee', async () => {
    const listRequests = await myEmployeeRequestService.getAllEmployeeRequests(1001, 0, 10);
		
    expect(listRequests.count).toBe(1);
		
  });
	
});