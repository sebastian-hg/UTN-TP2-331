const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const Venta = conexion.define('venta', {
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  cantidad_productos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  precio_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
});

module.exports = Venta;
