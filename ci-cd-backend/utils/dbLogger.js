import LoggerModule, { logger } from './logger.js';

export const dbLogging = (sql, timing) => {
	logger.debug(LoggerModule.msg('DB LOGGER',`${sql}`));
	if (timing?.bind) {
		logger.debug(LoggerModule.msg('DB LOGGER',`Query binding params : ${timing.bind}`));
	}
};