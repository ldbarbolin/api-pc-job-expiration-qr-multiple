const { DataTypes } = require("sequelize");
const sequelize = require("../config/datasource-sequelize.js");

const QR = sequelize.define(
  "QR",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    channel: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    accountBankId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: "account_bank_id",
    },

    externalId: {
      type: DataTypes.STRING(50),
      field: "external_id",
    },

    orderId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "order_id",
    },

    qrExternalId: {
      type: DataTypes.STRING(50),
      field: "qrexternal_id",
    },

    qrCodeData: {
      type: DataTypes.TEXT,
      field: "qr_code_data",
    },

    qrType: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "qr_type",
    },

    amount: {
      type: DataTypes.DECIMAL(16, 2),
      allowNull: false,
    },

    currencyCode: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: "currency_code",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    countryCode: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: "country_code",
    },

    singleUse: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "single_use",
    },

    status: {
      type: DataTypes.STRING, // ← BD ENUM ya existe
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expired_at",
    },

    expiredBankAt: {
      type: DataTypes.DATEONLY,
      field: "expired_bank_at",
    }
  },
  {
    tableName: "qr",
    schema: "pay_center",

    timestamps: true,
    // createdAt: "created_at",
    // updatedAt: "updated_at",
  },
);

module.exports = QR;
