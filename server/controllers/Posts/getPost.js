const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const getBlogById = async(req,res)=>{
  try{
  
   const blog = await blogs.findOne({_id:req.params.id}).populate('account','username')
   if(blog == null)
   return res.status(404).json({msg:'not found'})
   
   res.status(200).json(blog)
   
   } 
   catch(err){
     return res.status(404).json({msg:'not found'})  
   } 
 }
  const getAllBlogs = async (req,res)=>{
    const data = await blogs.find().populate('account','username')
    res.status(200).json(data)
};



module.exports = {getBlogById,getAllBlogs}


