const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const updateUserById = async (req,res)=>{
    
    try{
     await user.updateOne({
        _id : req.session.userId
      },
      {
        $set :{
          location : req.body.location,
          name : req.body.name,
          email : req.body.email,
          bio : req.body.bio
        }
      })
      res.json({msg : 'edited',id:req.params.id})

   
    }
    catch(err){
      res.json({msg : 'Some error occured : '+err})
    }
  }

  module.exports = {
    updateUserById
  }