const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const Talla = conexion.define('talla', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'tallas',
  timestamps: false,
});

module.exports = Talla;