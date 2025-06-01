const authServicio = require('../servicio/authServicio');

const registrar = async (req, res) => {
  try {
    const datos = req.body;
    const usuario = await authServicio.registrarUsuario(datos);
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const login = async (req, res) => {
  try {
    const datos = req.body;
    const resultado = await authServicio.loginUsuario(datos);
    res.json({ mensaje: 'Login exitoso', token: resultado.token });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

const protegerRuta = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ mensaje: 'Token faltante' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token inválido' });

  try {
    const payload = authServicio.verificarToken(token);
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = {
  registrar,
  login,
  protegerRuta,
};
