// src/config/datasource-sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pay_center',
  process.env.DB_USER || 'app_user',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false, // Ponlo en 'console.log' si quieres ver el SQL crudo que ejecuta
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;