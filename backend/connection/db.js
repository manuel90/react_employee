const { Sequelize } = require('sequelize');

class Database {
  constructor() {
    if (!Database.instance) {
			// Create a new Sequelize instance
			this._sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
				host: process.env.DB_HOST,
				dialect: process.env.DB_DIALECT,
				port: process.env.DB_PORT || 5432,
				logging: false,
			});
      Database.instance = this;
    }

    return Database.instance;
  }
	
	// Test the connection
	async testConnection() {
		try {
			await this._sequelize.authenticate();
			console.log('Connection to PostgreSQL has been established successfully.');
		} catch(error) {
			console.error('Unable to connect to the database:', error);
		}
	}

  getSequelizeInstance() {
    return this._sequelize;
  }
}

// Export the singleton instance
const dbInstance = new Database();
Object.freeze(dbInstance);

dbInstance.testConnection();

module.exports = dbInstance;