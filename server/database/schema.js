const mongoose = require('mongoose');

require("./connect");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    blogs:{
        type:Array,
        default:[]
    }
});

const blogsSchema = new mongoose.Schema({
    title:String,
    author:String,
    imgUrl:String,
    content:String,
    comments:{
        type:Array,
        default:[]
    },
    likes:{
        type:Number,
        default:0
    }   
})

const user = new mongoose.model("user",userSchema);

const blogs = new mongoose.model("blogs",blogsSchema);

module.exports.user = user;
module.exports.blogs = blogs;