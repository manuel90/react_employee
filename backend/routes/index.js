//Modules
const express = require('express')

//Constants
const routes = express.Router();

const auth = require('./auth');
const api = require('./api');

/************* ROUTES ************************/

routes.use('/api', api);
routes.use('/auth', auth);

routes.get('/', (req, res) => {
  res.send('Express server demo!')
})




module.exports = routes