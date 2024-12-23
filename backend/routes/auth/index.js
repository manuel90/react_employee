//Modules
const express = require('express')
const jwt = require('jsonwebtoken')

const middlewareLogged = require('../../middlewares/logged')

//Models
const { Employee, Role, Permission } = require('../../models')

//Utils
const { compareHash } = require('../../lib')

//Constants
const routes = express.Router()


/************* ROUTES ************************/

routes.post('/', async (req, res) => {
	
	try {
		
		const foundEmployee = await Employee.findOne({ 
			where: { email: req.body.email },
			include: [
				{
					model: Role,
					include: {
						model: Permission,
					},
				},
			],
		});
		
		if(!foundEmployee) {
			throw new Error("Email or password wrong.")
		}
		
		const isCorrectPwd = await compareHash(req.body.password, foundEmployee.password)
		if(!isCorrectPwd) {
			throw new Error("Email or password wrong.")
		}
		
		const data = {
			time: Date(),
			id: foundEmployee.id,
			email: foundEmployee.email,
		}
		
		const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
	
		res.send({
			...foundEmployee.toJSON(),
			token,
		});
	} catch(error) {
		res.status(401).send({ message: error?.message});
	}
})

routes.get('/verify', middlewareLogged, async (req, res) => {
	
	try {
		res.send({
			...res.locals.currentUser,
			token: res.locals.tokenJwt,
		});
	} catch(error) {
		res.status(401).send({ message: error?.message});
	}
})

module.exports = routes