const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const ProductoTalla = conexion.define('producto_talla', {
  productoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'productos',
      key: 'id',
    },
  },
  tallaId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tallas',
      key: 'id',
    },
  },
}, {
  tableName: 'producto_talla',
  timestamps: false,
});

module.exports = ProductoTalla;
