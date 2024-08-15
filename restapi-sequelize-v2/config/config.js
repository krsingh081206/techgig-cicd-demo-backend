import dotenv from 'dotenv';
dotenv.config();

const config = {
	dbConfig: {
		host: process.env.DB_HOST,
		db: process.env.DB_DATABASE,
		password: process.env.DB_PASSWORD,
		user: process.env.DB_USER,
		dialect: process.env.DB_DIALECT || 'postgres',
		pool: {
			max: parseInt(process.env.DB_POOL_MAX) || 50,
			min: parseInt(process.env.DB_POOL_MIN) || 5,
			acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
			idle: parseInt(process.env.DB_POOL_IDLE) || 60000
		},
		logging: process.env.DB_LOGGING,
		tenant: process.env.TENANT
	},
	log: {
		level: process.env.LOG_LEVEL,
		logDatePattern: process.env.LOG_DATE_PATTERN,
	},
	readinessProbeDelay: process.env.READINESS_PROBE_DELAY,
	forcefulExitTimeout: process.env.FORCEFUL_EXIT_TIMEOUT
}

export default config;