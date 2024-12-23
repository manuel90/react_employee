const jwt = require('jsonwebtoken')

//Services
const EmployeeService = require('../services/EmployeeService')

const middlewareLogged = async (req, res, next) => {
	
	try {
		const authorization = req.get('authorization')
		
		if(!authorization) {
			throw new Error("Authentication required.")
		}
		const [type, token] = authorization.trim().split(' ')
		if(type.toLowerCase() !== 'bearer') {
			throw new Error("Authentication required.")
		}
    
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
		
		if(!verified) {
			throw new Error("Authentication required.")
		}
		
		const myEmployeeService = new EmployeeService()
		
		const foundEmployee = await myEmployeeService.getEmployeeById(verified.id);
		
		res.locals.currentUser = {...foundEmployee.toJSON()}
		res.locals.tokenJwt = token
		
		next()
  } catch(error) {
    res.status(403).send(error?.message)
  }
	
}

module.exports = middlewareLogged