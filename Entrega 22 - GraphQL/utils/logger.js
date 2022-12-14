import log4js from 'log4js';
import config from '../config.js';

class Logger {
    constructor() {
        log4js.configure(config.log4js);
        this.logger = log4js.getLogger();

        this.logInfo = (message) => {
            this.logger.info(message);
        }

        this.logWarn = (message) => {
            this.logger.warn(message);
        }

        this.logReqInfo = (req, res, next) => {
            this.logger.info(`Ruta ${req.path} metodo ${req.method}`);
            next();
        }

        this.logReqWarn = (req, res, next) => {
            this.logger.warn(`Ruta ${req.path} metodo ${req.method} no implementados`);
            next();
        }

        this.logError = (error) => {
            this.logger.error(`Error: ${error.message}`)
        }
    }
}

const logger = new Logger();
export default logger