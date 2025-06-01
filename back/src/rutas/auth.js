const express = require('express');
const router = express.Router();
const authController = require('../controlador/authController');

router.post('/register', authController.registrar); // TODO: probar con Postman
router.post('/login', authController.login);

module.exports = router;
