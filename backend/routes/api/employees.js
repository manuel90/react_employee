//Modules
const express = require('express')

//Services
const EmployeeService = require('../../services/EmployeeService')

//Utils

//Constants
const routes = express.Router()

/************* ROUTES ************************/

/**
 * Registration endpoint.
 */
routes.post('/', async (req, res) => {
	
	try {
		
		const employeeService = new EmployeeService()
		
		const employee = await employeeService.createEmployee({
			name: req.body.name,
			email: req.body.email,
			start_date: new Date(),//For this demo the start date will be the same date when created.
			password: req.body.password,
			salary: req.body.salary,
			roleId: req.body.roleId,
		})
		
		res.send(employee)
	} catch(error) {
		res.status(500).send('error')
	}
})

module.exports = routes