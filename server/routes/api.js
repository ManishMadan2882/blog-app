require('dotenv').config();

const express = require('express');
const route = express.Router()
const bcrypt = require('bcrypt')
const session = require('express-session')
const {user} = require('../database/schema')
const {blogs} = require('../database/schema')
const MongoStore = require('connect-mongo')

route.use(express.json());
route.use(session({
  resave : false,
  saveUninitialized:false,
  cookie:{maxAge : 48*3600*1000},
  secret: String(process.env.SECRET),
  store:MongoStore.create({
  mongoUrl:process.env.CLOUD
  })
}));


route.post('/submit',async (req,res)=>{ //create a new blog
    const newbie  = new blogs( {
        title:req.body.title,
        content:req.body.content,
        author:req.session.username,
        imgUrl:req.body.imgUrl
    })
   await newbie.save()
   await user.updateOne({username:req.session.username},{ $push: { blogs: newbie._id } })
    res.json({msg:'saved'})

})
route.delete('/blog/:id',async(req,res)=>{
  const blog = await blogs.findOne({
    _id:req.params.id
  })
  if(req.session.username !== blog.author)
  {
    return res.status(401).json({msg: 'unauthorized'}) 
  } 
  
  await blogs.deleteOne({
      _id : req.params.id
    })
   res.status(202).json({msg : 'deleted'}) 
})
route.get('/blogs',async (req,res)=>{
    const data = await blogs.find()
    res.status(200).json(data)
})

route.get('/blogs/:id',async(req,res)=>{

    const blog = await blogs.findOne({_id:req.params.id})

  res.status(200).json(blog)
})
route.post('/comment/:id',async (req,res)=>{
    if (req.session.username){
    await blogs.updateOne({_id: req.params.id},{ $push: { comments: {account:req.session.username,comment:req.body.comment} } })
    res.json({msg:'saved'})
    }
    else 
    res.json({msg:'user unauthorised'})
})
route.get('/comment/:id',async(req,res)=>{
    let blog = await  blogs.findOne({_id : req.params.id})
    res.json(blog.comments);
    
})
route.post('/login',async (req,res) => {
    const {username ,  password} = req.body;
    const userAuth = await user.findOne({username : username});
    
    if(userAuth){
      let isValid = await bcrypt.compare(password,userAuth.password);
      
      if(isValid){
        
        req.session.username = username;
        res.status(202).json({message : "access given",status:true});
        
      }
      else
      res.status(401).json({message : "invalid username or password",status:false});
      }
      else{
        res.status(404).json({message : "no such user found"});
      }
  });
route.post('/register',async (req,res)=>{
    try{
        const username=req.body.username;
        const password=await bcrypt.hash(req.body.password,4);
        const newOne = new user({
         username : username,
         password : password
        });
        await newOne.save();
        req.session.username = username;//create session on registeration
        res.status(201).json({message : 'user created',isCreated:true});
        
      }
      catch(error){
        console.log(error)
        res.status(403).json({message : 'user already exists',isCreated:false,error:error});
      }
    }
)
route.get('/ping',(req,res)=>{
 
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
route.get('/logout',(req,res)=>{
   req.session.destroy()
   res.json({msg:"session terminated"})
})
module.exports = route