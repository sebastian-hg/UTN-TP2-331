const { DataTypes } = require('sequelize');
const conexion = require('../config/database'); 

const Venta = conexion.define('venta', {
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad_productos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precio_total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Venta;