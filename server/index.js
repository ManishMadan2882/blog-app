require('dotenv').config()
const express = require('express')
const port = 5400
const path = require('path')
const app  =  express()
const bcrypt = require('bcrypt')

const session = require('express-session')
const mongoStore = require('connect-mongo');

const {user} = require('./database/schema')
const {blogs} = require('./database/schema')
const MongoStore = require('connect-mongo')

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","build")));
app.use(session({
  resave : false,
  saveUninitialized:false,
  cookie:{maxAge : 48*3600*1000},
  secret: String(process.env.SECRET),
  store:MongoStore.create({
  mongoUrl:process.env.CLOUD
  })
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,"..","build","index.html"));
});

app.post('/api/submit',async (req,res)=>{
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

app.get('/api/blogs',async (req,res)=>{
    const data = await blogs.find()
    res.json(data)
})
app.get('/api/blogs/:id',async(req,res)=>{
  const blog = await blogs.findOne({_id:req.params.id})

  res.status(200).json(blog)
})

app.post('/api/login',async (req,res) => {
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
app.post('/api/register',async (req,res)=>{
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
app.get('/api/ping',(req,res)=>{
 
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
app.get('/api/logout',(req,res)=>{
   req.session.destroy()
   res.json({msg:"session terminated"})
})
app.listen(port,()=>{
    console.log("Server up and running " + port);
})
