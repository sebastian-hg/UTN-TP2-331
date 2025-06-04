const express = require('express');
const router = express.Router();
const authController = require('../controlador/authController');

router.get('/login', authController.renderLogin);      
router.post('/login', authController.loginVista);      
router.post('/register', authController.registrar)


module.exports = router;
