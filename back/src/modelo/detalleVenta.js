const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const DetalleVenta = conexion.define('detalle_venta', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = DetalleVenta;
