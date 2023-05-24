import React, { useEffect,useState } from 'react'
import { TextareaAutosize } from '@mui/base';
import { Navbar } from './Navbar'
import { useParams } from 'react-router-dom';
import api from '../api.js';
const Blog = (props) => {
  const {id} = useParams();
  const [blog,setBlog] = useState([])
  
  const callAPI = ()=>
  {
    
    fetch(`${api}/blogs/${id}`)
    .then(res => res.json())
    .then(data => {setBlog(data)
    console.log(data);})
    console.log(blog);
  }
  useEffect(()=>{
    callAPI()
  },[])
  return (
    <div>
        <Navbar username = {props.user}/>
        <div>
           <h1 className='text-3xl p-3 text-center font-bold border-b-2 py-6'>
               {blog.title}
           </h1>          

           <div className='flex justify-center'>
              <img alt="Image" className='py-6 h-64 drop-shadow-xl' src={blog.imgUrl}/>
           </div>
         
           <TextareaAutosize value={blog.content} disabled className='text-lg font-medium border box-shadow-lg w-full  overflow-hidden  p-8 resize-none max-h-max min-h-fit' />
            
        </div>
    </div>
  )
}

export default Blog