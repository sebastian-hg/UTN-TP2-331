const express = require('express');
const router = express.Router();

const productoController = require('../controlador/productoController');
const {verificarToken } = require('../servicio/authServicio');

// Ruta pública: obtener todos los productos
router.get('/', productoController.obtenerTodos);
router.get('/categoria/:categoria', productoController.buscarPorCategoria);

// Rutas protegidas (requieren token) TODO: probar con Postman
router.get('/:id', verificarToken, productoController.obtenerPorId);
router.post('/', verificarToken, productoController.crearProducto);
router.put('/:id', verificarToken, productoController.modificarProducto);
router.delete('/:id', verificarToken, productoController.eliminarProducto);

module.exports = router;
