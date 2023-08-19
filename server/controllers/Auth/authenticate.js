const {user} = require('../../database/schema')
const bcrypt = require('bcrypt')
const login = async (req,res) => {
    const {username ,  password} = req.body;
    const userAuth = await user.findOne({username : username});
    
    if(userAuth){
      let isValid = await bcrypt.compare(password,userAuth.password);
      
      if(isValid){
        req.session.username = userAuth.username;
        req.session.userId = userAuth._id;
        res.status(202).json({message : "access given",status:true});
        
      }
      else
      res.status(401).json({message : "invalid username or password",status:false});
      }
      else{
        res.status(404).json({message : "no such user found"});
      }
  }

  const register = async (req,res)=>{
    try{
        const username=req.body.username;
        const password=await bcrypt.hash(req.body.password,4);
        const newOne = new user({
         username : username,
         password : password
        });
        const newuser = await newOne.save();
        req.session.username = username;//create session on registeration
        req.session.userId = newuser._id; 
        res.status(201).json({message : 'user created',isCreated:true});
        
      }
      catch(error){
        console.log(error)
        res.status(403).json({message : 'user already exists',isCreated:false,error:error});
      }
    };

    module.exports = {
        login,
        register
    }