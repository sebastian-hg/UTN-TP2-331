const express = require('express');
const router = express.Router();

const productoController = require('../controlador/productoController');
const {verificarToken } = require('../servicio/authServicio');

// Ruta pública: obtener todos los productos
router.get('/', productoController.obtenerTodos);
router.get('/categoria/:categoria', productoController.buscarPorCategoria);

// Rutas protegidas (requieren token) TODO: probar con Postman
router.get('/:id', productoController.obtenerPorId);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.modificarProducto);
router.post('/estado/:id', productoController.cambiarEstadoProducto);

module.exports = router;
