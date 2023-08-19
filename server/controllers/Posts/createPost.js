const {user} = require('../../database/schema')
const {blogs} = require('../../database/schema')
const createPost = async (req,res)=>{ //create a new blog
    console.log(req.session.userId);
    const newbie  = new blogs( {
        title:req.body.title,
        content:req.body.content,
        account:req.session.userId,
        imgUrl:req.body.imgUrl
    })
   await newbie.save()
   await user.updateOne({username:req.session.username},{ $push: { blogs: newbie._id } })
    res.json({msg:'saved',id:newbie._id})

}
module.exports = {
    createPost
}