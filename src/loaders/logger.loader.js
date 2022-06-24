// Libs
const { createLogger, format, transports, config } = require('winston');
const chalk = require('chalk');

/**
 *
 * @param {*} context string
 * @returns
 */
const createLogger = context => {
  return createLogger({
    levels: config.npm.levels,
    exitOnError: false,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
      format(info => {
        info.level = info.level.toUpperCase();
        info.context = context ? chalk.yellow(basename(context)) : '';
        return info;
      })()
    ),
    transports: createTransports()
  });
};

/**
 * Configura los tipos de logs a generar.
 */
const createTransports = () => {
  const winstonTransports = [];
  if (LOG.CONSOLE_ENABLED) {
    winstonTransports.push(new transports.Console({ format: consoleFormat(), level: LOG.LEVEL }));
  }
  if (LOG.FILE_ENABLED) {
    winstonTransports.push(
      new DailyRotateFile({
        dirname: join(__dirname, '../../logs'),
        filename: 'implementos-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: false,
        maxSize: '10m',
        maxFiles: '15d',
        auditFile: join(__dirname, '../../logs', 'logger-audit.json'),
        format: this.fileFormat()
      })
    );
  }
  return winstonTransports;
};

/**
 * Describe el formato de salida para la consola.
 */
const consoleFormat = () => {
  return format.combine(
    format.cli(),
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => {
      if (info.context) {
        return `[${info.timestamp}] [${info.level}] [${info.context}]: ${info.message.trim()}`;
      }
      return `[${info.timestamp}] [${info.level}]: ${info.message.trim()}`;
    })
  );
};

module.exports.LoggerLoader = { createLogger };
