const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const Usuario = conexion.define('usuario', {
  nombre_usuario: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;
