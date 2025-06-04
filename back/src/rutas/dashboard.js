const express = require('express');
const router = express.Router();
const { protegerRutaWeb } = require('../controlador/authController');
const { obtenerTodos } = require('../controlador/productoController');

router.get('/dashboard', protegerRutaWeb, async (req, res) => {
  try {
    const productos = await obtenerTodos();
    res.render('dashboard', { usuario: req.usuario, productos });
  } catch (error) {
    console.error('Error al cargar dashboard:', error);
    res.status(500).send('Error al cargar dashboard');
  }
});

module.exports = router;
