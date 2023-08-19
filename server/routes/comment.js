const express = require('express');
const route = express.Router();

const {createComment} = require('../controllers/Comments/createComment');
const {getCommentByBlogId} = require('../controllers/Comments/getComment');

route.post('/:id',createComment)
route.get('/:id',getCommentByBlogId)


module.exports.commentRoute = route; 