const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const updateById = async (req,res)=>{
    try{
     const blog = await blogs.findOne({_id:req.params.id})
     if(blog.account == req.session.userId)
     {
      await blogs.updateOne({
        _id : req.params.id
      },
      {
        $set :{
          title : req.body.title,
          imgUrl : req.body.imgUrl,
          content : req.body.content
        }
      })
      res.json({msg : 'edited',id:req.params.id})
     }
     else
     res.status(401).json({msg:"Unauthorized"})
   
    }
    catch(err){
      res.json({msg : 'Something Went Wrong '+err})
    }
  }

  module.exports = {
    updateById
  }