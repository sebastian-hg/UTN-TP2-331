const express = require('express');
const router = express.Router();
const authController = require('../controlador/authController');

router.get('/login', authController.renderLogin); 
router.post('/login', authController.loginVista); 
router.post('/api/login', authController.login);  
router.post('/registro', authController.registrar);
router.post('/logout', authController.logout);



module.exports = router;
