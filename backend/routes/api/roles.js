//Modules
const express = require('express')

const middlewareLogged = require('../../middlewares/logged')

const { Role } = require('../../models')

//Constants
const routes = express.Router()


/************* ROUTES ************************/

/**
 * Get all the roles.
 */
routes.get('/', async (req, res) => {
	
	try {
		const roles = await Role.findAll()
		
		res.send(roles)
	} catch(error) {
		res.status(401).send({ message: error.toString() })
	}
})


/**
 * Creates a new role.
 */
routes.post('/', async (req, res) => {
	
	try {
		const myRole = Role.build({
			name: req.body.name,
		})
		
		await myRole.save()
		
		res.send(myRole)
	} catch(error) {
		res.status(401).send({ message: error.toString() })
	}
})

module.exports = routes