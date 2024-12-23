//Modules
const express = require('express')


const middlewareLogged = require('../../middlewares/logged')

//Services
const EmployeeRequestService = require('../../services/EmployeeRequestService')

//Utils
const { canUser } = require('../../lib')

//Constants
const routes = express.Router()


/************* ROUTES ************************/

/**
 * Getting all the employee's requests.
 */
routes.get('/', middlewareLogged, async (req, res) => {
	
	try {
		
		
		if(!canUser(res.locals.currentUser, 'read')) {
			throw new Error("You can't perform this action.")
		}
		
		const pageOffset = req.query.page && req.query.page > 0 ? req.query.page - 1 : 0
		const limit = req.query.limit && req.query.limit > 0 ? req.query.limit : 10
		
		const myEmployeeRequestService = new EmployeeRequestService()
		
		const allEmployeeRequests = await myEmployeeRequestService.getAllEmployeeRequests(res.locals.currentUser.id, pageOffset, limit)
		
		res.send(allEmployeeRequests)
	} catch(error) {
		res.status(401).send({ message: error.toString() })
	}
})

routes.post('/', middlewareLogged, async (req, res) => {
	
	try {
		
		if(!canUser(res.locals.currentUser, 'create')) {
			throw new Error("You can't perform this action.")
		}
		
		const myEmployeeRequestService = new EmployeeRequestService()
		
		const employeeRequest = await myEmployeeRequestService.createEmployeeRequest({
			code: req.body.code,
			description: req.body.description,
			summary: req.body.summary,
			employeeId: res.locals.currentUser.id,
		})
		
		res.send(employeeRequest)
	} catch(error) {
		res.status(401).send({ message: error.toString() })
	}
})


routes.delete('/:id', middlewareLogged, async (req, res) => {
	
	try {
		
		if(!canUser(res.locals.currentUser, 'delete')) {
			throw new Error("You can't perform this action.")
		}
		
		const myEmployeeRequestService = new EmployeeRequestService()
		
		await myEmployeeRequestService.deleteEmployeeRequest({
			id: req.params.id,
			employee_id: res.locals.currentUser.id,
		})
		
		res.send()
	} catch(error) {
		res.status(401).send({ message: error.toString() })
	}
})

module.exports = routes