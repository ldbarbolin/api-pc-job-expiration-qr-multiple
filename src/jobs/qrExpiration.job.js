// src/jobs/qrExpiration.job.js
const cron = require("node-cron");
const { Op } = require("sequelize");
const QR = require("../models/qr.model"); 
const logger = require("../config/logger");

const COMPONENT = "QR Multiple Expiration Job";

const expireOldQrs = async () => {
  try {
    logger.info(`[${COMPONENT}] Iniciando escaneo de QRs múltiples expirados...`);
    const now = new Date();

    // El array ahora desestructura los QRs actualizados gracias a 'returning: true'
    const [affectedRows, updatedQrs] = await QR.update(
      { status: "expired" },
      {
        where: {
          status: { [Op.in]: ["pending", "active"] },
          expiredAt: { [Op.lt]: now },
          singleUse: false, 
        },
        returning: true, // ✨ MAGIA DE POSTGRESQL: Devuelve las filas afectadas
      }
    );

    if (affectedRows > 0) {
      // Extraemos solo los IDs de los QRs modificados
      const expiredIds = updatedQrs.map(qr => qr.id);
      
      // Pasamos los IDs como metadata para que Winston los registre en formato JSON
      logger.info(`[${COMPONENT}] ÉXITO: Se marcaron ${affectedRows} QRs múltiples como expirados.`, {
        expiredIds: expiredIds
      });
    } else {
      logger.debug(`[${COMPONENT}] Escaneo completado. No hay QRs múltiples vencidos.`);
    }
  } catch (error) {
    logger.error(`[${COMPONENT}] Error crítico al expirar QRs múltiples`, {
      message: error.message,
      stack: error.stack,
    });
  }
};

const startQrExpirationJob = () => {
  const cronExpr = process.env.EXPIRATION_JOB_CRON || "1 0 * * *";
  
  logger.info(`[${COMPONENT}] Job programado con cron: ${cronExpr}`);
  
  cron.schedule(cronExpr, () => {
    expireOldQrs();
  });
};

module.exports = { startQrExpirationJob, expireOldQrs };