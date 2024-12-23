const bcrypt = require('bcrypt')

const generateHash = (plainText) => {
	return new Promise((resolve, reject) => {
			bcrypt.hash(plainText, 10, (err, hash) => {
				if(err) {
					reject(err)
				}
				resolve(hash)
		});
	})
}

const compareHash = (plainText, hashText) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plainText, hashText, (err, result) => {
			if(err) {
				reject(err)
			}
			resolve(result)
		});
	})
}


const canUser = (currentUser, permission) => {
	try {
		const role = currentUser.Role	
		const permissionsCodes = role.Permissions.map((permision) => permision.code)
		return permissionsCodes.indexOf(permission) !== -1
	} catch(error) {
		return false
	}
}


module.exports = { generateHash, compareHash, canUser }