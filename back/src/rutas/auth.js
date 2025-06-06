const express = require('express');
const router = express.Router();
const authController = require('../controlador/authController');

router.get('/login', authController.renderLogin); // formulario
router.post('/login', authController.loginVista); // desde EJS
router.post('/api/login', authController.login);  // API externa
router.post('/registro', authController.registrar); // API o formulario 
router.post('/logout', authController.logout);



module.exports = router;
