require('dotenv').config();
const {user} = require('../database/schema')
const {blogs} = require('../database/schema')

const express = require('express');
const route = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')

const MongoStore = require('connect-mongo');

route.use(session({
    resave : false,
    saveUninitialized:false,
    cookie:{maxAge : 48*3600*1000},
    secret: String(process.env.SECRET),
    store:MongoStore.create({
    mongoUrl:process.env.CLOUD
    })
  }));

const { blogRoute } = require('./blog');
const { commentRoute } = require('./comment');
const { authRoute } = require('./auth');
const { profileRoute } = require('./profile');

route.use(express.json());


route.use('/blog',blogRoute)
/* route.post('/create',createPost)
route.put('/update/:id',updateById)
route.delete('/blog/:id',deleteById)
route.get('/blogs',getAllBlogs) 
route.get('/blogs/:id',getBlogById)
*/
route.use('/comment',commentRoute)
route.use('/auth',authRoute)
route.use('/profile',profileRoute)

route.get('/ping',(req,res)=>{  //get client authInfo
 
    if(req.session.username)
    res.json({
        isAuth:true,
        userData:{
            username:req.session.username
        }
    })
    else
    res.json({isAuth:false})
})

module.exports = route