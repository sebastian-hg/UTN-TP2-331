const express = require('express');
const router = express.Router();
const ventaControlador = require('../controlador/ventaControlador');

router.post('/ventas', ventaControlador.registrarVenta);
router.get('/ventas/:id', ventaControlador.ventaPorId);
router.get('/imprimir/:id', ventaControlador.imprimirFactura); // ruta GET para imprimir factura por id


module.exports = router;
