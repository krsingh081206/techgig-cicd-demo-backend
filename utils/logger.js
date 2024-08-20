import winston from 'winston';
import config from '../config/config.js';

//initialize logger
const myCustomFormat = winston.format.printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

export const logger = winston.createLogger({
	level: config.log.level,
	format: winston.format.combine(
		winston.format.timestamp(), // Add timestamp to log entries
		myCustomFormat
	),
	transports: [
		new winston.transports.Console()
	]
});

const msg = (module, msg ) => { 
	return `[${module}] - [${msg}]`;
};
export default {msg};