const { Usuario } = require('../modelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '';

// Registrar
const registrarUsuario = async ({ nombre_usuario, password }) => {
  const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario } });
  if (usuarioExistente) {
    throw new Error('El usuario ya existe');
  }

  const hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({ nombre_usuario, password: hash });

  return { id: nuevoUsuario.id, nombre_usuario };
};

// Login
const loginUsuario = async ({ nombre_usuario, password }) => {
  const usuario = await Usuario.findOne({ where: { nombre_usuario } });
  if (!usuario) {
    throw new Error('Credenciales incorrectas');
  }

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) {
    throw new Error('Credenciales incorrectas');
  }

  const token = jwt.sign({ id: usuario.id, nombre_usuario: usuario.nombre_usuario }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return { token };
};

// Verificar token
const verificarToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  verificarToken,
};
