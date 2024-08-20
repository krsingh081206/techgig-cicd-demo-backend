import Sequelize from 'sequelize';
var DataTypes = Sequelize.DataTypes;

import product from './product.js';
import config from './../config/config.js';
import { dbLogging } from '../utils/dbLogger.js';

const dbConfig= config.dbConfig;

// sequelise and model setup
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
	logging: dbConfig.logging === 'true' ? dbLogging : false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//public
db.product = product(sequelize, DataTypes);

export default db;
