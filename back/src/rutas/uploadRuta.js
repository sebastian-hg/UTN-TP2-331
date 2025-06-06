const express = require('express');
const router = express.Router();
const upload = require('../servicio/uploadServicio'); // Importar el servicio de multer
const uploadController = require('../controlador/uploadController');

// Ruta POST para subir imagen, campo del form: 'imagen'
router.post('/imagen', upload.single('imagen'), uploadController.subirImagen);

module.exports = router;
