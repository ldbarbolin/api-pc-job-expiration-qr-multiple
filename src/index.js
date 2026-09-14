// src/index.js
const { startQrExpirationJob } = require("./jobs/qrExpiration.job");
const sequelize = require("./config/datasource-sequelize.js");
const logger = require("./config/logger");

const startJobs = async () => {
  try {
    // 1. Autenticar BD
    await sequelize.authenticate();
    logger.info("Conexión a la base de datos establecida con éxito para los Jobs.");

    // 2. Iniciar el cron job
    startQrExpirationJob();

    logger.info("🚀 Servicio de Jobs inicializado correctamente.");
  } catch (error) {
    logger.error("No se pudo iniciar el servicio de Jobs:", error);
    process.exit(1);
  }
};

startJobs();