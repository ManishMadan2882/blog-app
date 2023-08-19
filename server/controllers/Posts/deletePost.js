const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const deleteById = async(req,res)=>{
    const blog = await blogs.findOne({
      _id:req.params.id
    })
    if(req.session.userId != blog.account)
    {
      return res.status(401).json({msg: 'unauthorized'}) 
    } 
    
    await blogs.deleteOne({
        _id : req.params.id
      })
     res.status(202).json({msg : 'deleted'}) 
  }
  module.exports = {
    deleteById
  }