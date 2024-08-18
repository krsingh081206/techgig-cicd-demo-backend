import dotenv from 'dotenv';
dotenv.config();

const ISSUER = process.env.ISSUER;
const SPA_CLIENT_ID = process.env.SPA_CLIENT_ID;
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;

const config = {

	resourceServer: {
		oidc: {
			clientId: SPA_CLIENT_ID,
			issuer: ISSUER,
			testing: {
				disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
			}
		},
		assertClaims: {
			aud: 'api://default',
			cid: SPA_CLIENT_ID
		}
	},
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