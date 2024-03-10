import React,{useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextField, Tooltip } from '@mui/material'

import {Button} from '@mui/material'
import { Google, Info } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ImageUpload from './ImageUpload';
const  modules  = {
  toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script:  "sub" }, { script:  "super" }],
      ["blockquote", "code-block"],
      [{ list:  "ordered" }, { list:  "bullet" }],
      [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
  ],
};
const Draft = () => {
   const [title,setTitle] = useState('')
   const [image,setImage] = useState([]);
   const [content,setContent] = useState('') 
   const [mode,setMode] = useState('edit')
   const modeChange = (e)=>{
    setMode(e.target.value)
   }
   /*  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  } */
   const upload = ()=>{
    const data = new FormData();
    data.set('title',title);
    data.set('content',content)
        fetch('/api/blog/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: data
          })
            .then(response => response.json())
            .then(data =>{ 
                console.log(data)
                window.location.replace(`/blog/${data.id}`);
            })
            .catch(error => console.error(error));
   }
  return (
    <div>
       <div className='m-5 flex justify-between'>
       <TextField value={title} onChange={(e)=>setTitle(e.target.value)} id="outlined" label="Title" variant="outlined" />
       <Button variant="contained" onClick={upload} className='py-2 w-48 '>UPLOAD</Button>
       </div>
       <ImageUpload image={image} setImage={setImage}/>      
       <div className='m-5'>
        <label className=''>Content</label>
        <Tooltip title="Use the provided features to format your text">
           <Info fontSize='small'/>
        </Tooltip>
        <ToggleButtonGroup
         color="primary"
         exclusive
         value={mode}
         
         className='float-right'
         aria-label="Platform"
        >
        <ToggleButton onClick={(e)=>modeChange(e)} value="edit">Edit</ToggleButton>
        <ToggleButton onClick={(e)=>modeChange(e)} value="preview">Preview</ToggleButton>
        
       </ToggleButtonGroup> 
        {(mode === 'edit') ? 
        <ReactQuill className='my-10 h-96' defaultValue={content} modules={modules} onChange={setContent} theme="snow" placeholder="Content goes here..."  />
        
        :
            <div id='blogContent' className='shadow-lg overflow-hidden border h-max font-lora p-4 pb-28 lg:pb-14 leading-loose box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none '>
                  
                <ReactMarkdown  children={content} rehypePlugins={[rehypeRaw]}/>     
                 
             </div>
        }
       </div>
       
       
    </div>
  )
}

export default Draft