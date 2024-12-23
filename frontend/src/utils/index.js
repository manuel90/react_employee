
export const canUser = (currentUser, permission) => {
	try {
		const role = currentUser.Role	
		const permissionsCodes = role.Permissions.map((permision) => permision.code)
		return permissionsCodes.indexOf(permission) !== -1
	} catch(error) {
		return false
	}
}

export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const baseUrlEndpoint = 'http://localhost:8001'


export const delay = (mili) => {
	return new Promise((resolve) => {
		setTimeout(resolve, mili)
	})
}