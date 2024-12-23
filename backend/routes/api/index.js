//Modules
const express = require('express')


//Constants
const routes = express.Router()


/************* ROUTES ************************/

const apiEmployees = require('./employees')
const apiRoles = require('./roles')
const apiRequests = require('./requests')

routes.use('/employees', apiEmployees)
routes.use('/roles', apiRoles)
routes.use('/requests', apiRequests)

module.exports = routes