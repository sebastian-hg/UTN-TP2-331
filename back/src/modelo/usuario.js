const { DataTypes } = require('sequelize');
const conexion = require('../config/database');

const Usuario = conexion.define('usuario', {
  email: {
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
