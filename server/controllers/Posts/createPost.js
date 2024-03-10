const { blogs } = require('../../database/schema')
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
const createPost = async (req, res) => { //create a new blog
   try {
    const result = await cloudinary.uploader.upload(req.body.file, {
        folder: 'blogs' // optional folder in Cloudinary
    });
    const newbie = new blogs({
        title: req.body.title,
        content: req.body.content,
        account: req.session.userId,
        imgUrl: result.secure_url
    })
    await newbie.save();
    res.json({ msg: 'Created !', id: newbie._id });
   } catch (error) {
    console.log(error)
    res.status(500).json({msg : 'Failed to upload the blog !'})
   }
}
module.exports = {
    createPost
}