const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const Producto = conexion.define('producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, {
  timestamps: false  
});

module.exports = Producto;
