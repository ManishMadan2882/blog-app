const express = require('express');
const route = express.Router();

const { login, register } = require('../controllers/Auth/authenticate');
const { logout } = require('../controllers/Auth/logout');
 
route.post('/login',login);
route.post('/register',register)
route.get('/logout',logout)

module.exports.authRoute = route; 