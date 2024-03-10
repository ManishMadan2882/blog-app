const express = require('express');
const route = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {getBlogById,getAllBlogs} = require('../controllers/Posts/getPost');
const {deleteById} = require('../controllers/Posts/deletePost')
const {updateById} = require('../controllers/Posts/updatePost')
const { createPost } = require('../controllers/Posts/createPost');

route.get('/all',getAllBlogs) //all blogs route
route.post('/create',upload.single('file'),createPost)
route.get('/:id',getBlogById)//read by id
route.put('/update/:id',upload.single('file'),updateById) 
route.delete('/:id',deleteById) 

module.exports.blogRoute = route; 