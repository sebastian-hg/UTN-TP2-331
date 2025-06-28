const express = require('express');
const router = express.Router();
const upload = require('../servicio/uploadServicio'); 
const uploadController = require('../controlador/uploadController');

router.post('/imagen', upload.single('imagen'), uploadController.subirImagen);

module.exports = router;
