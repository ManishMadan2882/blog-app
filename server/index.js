const express = require('express')
const port = 5400
const app  =  express()
const bcrypt = require('bcrypt')

const session = require('express-session')
const mongoStore = require('connect-mongo');

const {user} = require('./database/schema')
const {blogs} = require('./database/schema')

app.use(express.json());

app.use(session({
  resave : false,
  saveUninitialized:true,
  cookie:{maxAge : 48*3600*1000000},
  secret: String(process.env.SECRET),
  mongoUrl:process.env.CLOUD
}));

app.post('/submit',async (req,res)=>{
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

app.get('/blogs',async (req,res)=>{
    const data = await blogs.find()
    res.json(data)
})
app.get('/blogs/:id',async(req,res)=>{
  const blog = await blogs.findOne({_id:req.params.id})

  res.status(200).json(blog)
})

app.post('/login',async (req,res) => {
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
app.post('/register',async (req,res)=>{
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
app.get('/ping',(req,res)=>{
    console.log(req.session.username);
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
app.get('/logout',(req,res)=>{
   req.session.destroy()
   res.json({msg:"session terminated"})
})
app.listen(port,()=>{
    console.log("Server up and running " + port);
})
