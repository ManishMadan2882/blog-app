const { blogs } = require('../../database/schema')
const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
const updateById = async (req, res) => {
  try {
    const blog = await blogs.findOne({ _id: req.params.id });
    if (blog.account == req.session.userId) {
      if (req.body.file) {
        const result = await cloudinary.uploader.upload(req.body.file, {
          folder: 'blogs' // optional folder in Cloudinary
        });
        await blogs.updateOne({
          _id: req.params.id
        },
          {
            $set: {
              title: req.body.title,
              imgUrl: result.secure_url,
              content: req.body.content
            }
          })
          return res.json({msg:"Updated !"})
      }

      await blogs.updateOne({
        _id: req.params.id
      },
        {
          $set: {
            title: req.body.title,
            content: req.body.content
          }
        })
      res.json({ msg: 'Updated !', id: req.params.id })
    }
    else
      res.status(401).json({ msg: "Unauthorized" })

  }
  catch (err) {
    res.json({ msg: 'Something Went Wrong ', error:err })
  }
}

module.exports = {
  updateById
}