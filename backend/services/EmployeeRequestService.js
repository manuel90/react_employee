
const { EmployeeRequest } = require("../models")

class EmployeeRequestService {
	
	
	/**
	 * Create a EmployeeRequest record in the Database.
	 * @param {*} employeeRequestData 
	 * @returns 
	 */
	async createEmployeeRequest(employeeRequestData) {
		
		/**
		 * TODO: Implement validations.
		 */
		
		const myEmployeeRequest = EmployeeRequest.build({
			code: employeeRequestData.code,
			description: employeeRequestData.description,
			summary: employeeRequestData.summary,
			employee_id: employeeRequestData.employeeId,
		})
		
		await myEmployeeRequest.save()
		return myEmployeeRequest
	}
	
	/**
	 * Returns all the EmployeeRequest of a Employee in pagination format.
	 * @param {*} employeeId 
	 * @param {*} pageOffset 
	 * @param {*} limit 
	 * @returns 
	 */
	async getAllEmployeeRequests(employeeId, pageOffset, limit) {
		return await EmployeeRequest.findAndCountAll({
			where: {
				employee_id: employeeId,
			},
			offset: pageOffset*limit,
			limit: limit,
		});
	}
	
	/**
	 * Delete a EmployeeRequest record of the Database.
	 * @param {*} criteria 
	 */
	async deleteEmployeeRequest(criteria) {
		return await EmployeeRequest.destroy({
			where: criteria,
		});
	}
	
}

module.exports = EmployeeRequestService