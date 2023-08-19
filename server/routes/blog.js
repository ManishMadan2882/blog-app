const express = require('express');
const route = express.Router();

const {getBlogById,getAllBlogs} = require('../controllers/Posts/getPost');
const {deleteById} = require('../controllers/Posts/deletePost')
const {updateById} = require('../controllers/Posts/updatePost')
const { createPost } = require('../controllers/Posts/createPost');

route.get('/all',getAllBlogs) //all blogs route
route.post('/create',createPost)
route.get('/:id',getBlogById)//read by id
route.put('/update/:id',updateById) 
route.delete('/:id',deleteById) 


module.exports.blogRoute = route; 