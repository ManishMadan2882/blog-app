const connect = require('./database/connect')
const {blogs,user} = require('./database/schema')

async function alter(){

    const data = await user.find();
    data.forEach(async (doc)=>{
      let newArr = [];
     const blogArr = doc.blogs;
     blogArr.forEach(async (element)=>{
      const blog = await blogs.findOne({_id: element})
      if(blog != null)
         newArr.push(element);
      await user.updateOne({_id:doc._id},
         {
            blogs : newArr
         }
         )
     })
    
    });
}



alter()

