const mongoose = require('mongoose');

require("./connect");
//User Scheme 
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
    name:{
        type:String
    },
    bio:{
        type:String
    },
    location:{
        type:String
    },
    imgUrl:{
        type: String,
        default : "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
    },
    email:{
        type:String
    },
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'blogs'
        }
    ]
});
//blog scheme
const blogsSchema = new mongoose.Schema({
    title:String,
    account:{
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    author:{
        type: String
    },
    imgUrl:String,
    content:String,
    comments:{
        type:Array,
        default:[]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }   
})

const user = new mongoose.model("user",userSchema);

const blogs = new mongoose.model("blogs",blogsSchema);

module.exports.user = user;

module.exports.blogs = blogs;