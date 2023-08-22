const express = require('express');
const route = express.Router();

const {getUserById} = require('../controllers/Profile/getUser');
const { updateUserById } = require('../controllers/Profile/updateUser');


route.get('/:username',getUserById)//read by id
route.put('/update',updateUserById)


module.exports.profileRoute = route; 