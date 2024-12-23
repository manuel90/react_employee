//Modules
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

//Configurations
dotenv.config()

//Database connection
const db = require('./connection/db');

//Constants
const app = express()
const port = process.env.PORT || 3001
const sequelize = db.getSequelizeInstance();



//Middlewares
const middlewareAuthToken = require('./middlewares/authToken')
app.use(express.json())
app.use(middlewareAuthToken)
app.use(cors())



/************* ROUTES ************************/
const routes = require('./routes')
app.use('/', routes);

//Starts server.
app.listen(port, () => {
  
  (async () => {
    await sequelize.sync({ force: false }) // Set to true if you want to recreate tables
    console.log('Database synced.')
  })();
  
  console.log(`Express app listening on port ${port}`)
})