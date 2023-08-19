const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const createComment = async (req,res)=>{
    if (req.session.username){
    await blogs.updateOne({_id: req.params.id},{ $push: { comments: {account:req.session.username,comment:req.body.comment} } })
    res.json({msg:'saved'})
    }
    else 
    res.json({msg:'user unauthorised'})
}
module.exports = {
    createComment
}