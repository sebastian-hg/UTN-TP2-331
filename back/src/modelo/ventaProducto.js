const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const VentaProducto = conexion.define('ventaProducto', {
  ventaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  talla: {
    type: DataTypes.STRING,
    allowNull: true
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'ventaProducto'
});

module.exports = VentaProducto;
