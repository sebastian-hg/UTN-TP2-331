const { Usuario } = require('../modelo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_clave_secreta_para_jwt_12345';

// Registrar
const registrarUsuario = async ({ email, password }) => {
  const usuarioExistente = await Usuario.findOne({ where: { email } });
  if (usuarioExistente) {
    throw new Error('El usuario ya existe');
  }

  const hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = await Usuario.create({ email, password: hash });

  return { id: nuevoUsuario.id, email };
};

// Login
const loginUsuario = async ({ email, password }) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    throw new Error('Credenciales incorrectas');
  }

  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) {
    throw new Error('Credenciales incorrectas');
  }

  // Firmar JWT con id y email
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

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
