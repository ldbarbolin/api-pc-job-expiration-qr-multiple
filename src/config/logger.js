const winston = require('winston');

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Formato visual para la consola
const consoleFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }), // Captura la traza completa si hay un error (crash)
  printf(({ timestamp, level, message, stack, ...meta }) => {
    const base = `${timestamp} [${level}]: ${stack || message}`;
    // Si hay metadata extra (ej. { qrId: "123" }), la adjuntamos como JSON
    const metaString = Object.keys(meta).length ? ` | ${JSON.stringify(meta)}` : '';
    return `${base}${metaString}`;
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: consoleFormat,
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;