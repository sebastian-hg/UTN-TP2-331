const express = require('express');
const router = express.Router();
const { protegerRutaWeb } = require('../controlador/authController');

// Ruta solo para mostrar el menú principal
router.get('/dashboard', protegerRutaWeb, (req, res) => {
  res.render('dashboard', { usuario: req.usuario });
});

module.exports = router;