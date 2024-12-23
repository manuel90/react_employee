
const middlewareAuthToken = (req, res, next) => {
	
	const authorization = req.get('authorization')
	
	if(authorization) {
		const [type, token] = authorization.trim().split(' ')
		if(type.toLowerCase() === 'bearer') {
			res.locals.jwtToken = token
		}
	}
	
	next()	
}

module.exports = middlewareAuthToken