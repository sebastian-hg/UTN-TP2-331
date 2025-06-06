const authServicio = require('../servicio/authServicio');

// Registro usuario
const registrar = async (req, res) => {
  try {
    const datos = req.body;
    const usuario = await authServicio.registrarUsuario(datos);
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Login 
const login = async (req, res) => {
  try {
    const datos = req.body;
    const resultado = await authServicio.loginUsuario(datos);
    res.json({ mensaje: 'Login exitoso', token: resultado.token });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

//deslogeo
const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

// Mostrar formulario login (EJS)
const renderLogin = (req, res) => {
  res.render('login', { error: null });
};

// Login desde formulario EJS (guarda token en cookie y redirige)
const loginVista = async (req, res) => {
  try {
    const datos = req.body;
    const resultado = await authServicio.loginUsuario(datos);

    res.cookie('token', resultado.token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.redirect('/dashboard'); // Redirige al dashboard si el login fue exitoso
  } catch (error) {
    return res.status(401).render('login', { error: 'Credenciales inválidas' });
  }
};

// Middleware para proteger rutas API (token en header Authorization)
const protegerRutaAPI = (req, res, next) => {
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

// Middleware para proteger rutas web (token en cookie)
const protegerRutaWeb = (req, res, next) => {
  const token = req.cookies.token; // Necesitas cookie-parser para esto
  if (!token) return res.redirect('/auth/login');

  try {
    const payload = authServicio.verificarToken(token);
    req.usuario = payload;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }
};

module.exports = {
  registrar,
  login,
  renderLogin,
  loginVista,
  protegerRutaAPI,
  protegerRutaWeb,
  logout
};

