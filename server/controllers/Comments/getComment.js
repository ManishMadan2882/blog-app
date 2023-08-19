const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const getCommentByBlogId = async(req,res)=>{
    let blog = await  blogs.findOne({_id : req.params.id})
    res.json(blog.comments);
    
}

module.exports  = {
    getCommentByBlogId
}