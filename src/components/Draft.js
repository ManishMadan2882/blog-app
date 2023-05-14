import React,{useState} from 'react'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';

const Draft = () => {
   const [title,setTitle] = useState('')
   const [imgUrl,setImgUrl] = useState('')
   const [content,setContent] = useState('') 
   const upload = ()=>{
    const payload = {
        title:title,
        imgUrl:imgUrl,
        content:content
    }
    console.log(payload);
   }
  return (
    <div>
        
       <div className='m-5'>
       <TextField value={title} onChange={(e)=>setTitle(e.target.value)} id="outlined" label="Title" variant="outlined" />
       </div>
       <div className='m-5'>
       <TextField value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)} id="outlined" label="Image URL" variant="outlined" />
       </div>        
       <div className='m-5'>
        <label className='block'>Content</label>
        <TextareaAutosize
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            placeholder='I would share my opion on ChatGPT 4.0 ....'
            className='border w-full border-blue-500 p-6'
            minRows={10}

        />
       </div>
       
       <Button variant="contained" onClick={upload} className='py-2 w-full'>submit</Button>
    </div>
  )
}

export default Draft