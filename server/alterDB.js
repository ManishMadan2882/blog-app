const connect = require('./database/connect')
const {blogs,user} = require('./database/schema')

async function alter(){

    const data = await blogs.find();
    data.forEach(async (doc)=>{
     const name = doc.author;
     const userid =await  user.findOne({username:name})
     blogs.updateOne({
        _id: doc._id
     },
     {$set:{
        account : userid._id
     }}
     ).then(()=>{'done for '+doc._id})
    });
}



alter()

