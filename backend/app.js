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
  
  sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
  
  console.log(`Express app listening on port ${port}`)
})