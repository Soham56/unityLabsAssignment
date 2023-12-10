const express = require('express');
const router = express.Router();

const registerUser  = require('../controllers/authControllers/register');
const loginUser = require('../controllers/authControllers/login');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;