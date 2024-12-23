const { generateHash } = require("../lib")

//Models
const { Employee, Role, Permission } = require("../models")

class EmployeeService {
	
	
	/**
	 * Create a Employee record in the Database.
	 * @param {*} employeeData 
	 * @returns 
	 */
	async createEmployee(employeeData) {
		
		const myEmployee = Employee.build({
			name: employeeData.name,
			email: employeeData.email,
			start_date: employeeData.start_date,
			password: await generateHash(employeeData.password),
			salary: employeeData.salary,
			role_id: employeeData.roleId,
		})
		
		await myEmployee.save()
		return myEmployee
	}
	
	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	async getEmployeeById(id) {
		const employee = await Employee.findOne({ 
			where: { id },
			include: [
				{
					model: Role,
					include: {
						model: Permission,
					},
				},
			],
		});
		if(!employee) {
			throw new Error("Employee not found")
		}
		return employee
	}
	
}

module.exports = EmployeeService