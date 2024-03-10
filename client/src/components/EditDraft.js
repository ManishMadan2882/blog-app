import React,{useState} from 'react'
import { TextField, Tooltip } from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Button} from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Info } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
const EditDraft = (props) => {
   const [title,setTitle] = useState(props.title)
   const [imgUrl,setImgUrl] = useState(props.imgUrl)
   const [content,setContent] = useState(props.content) 
   const [mode,setMode] = useState('edit')
   const modeChange = (e)=>{
    setMode(e.target.value)
   }
   
   const upload = ()=>{
    const payload = {
        title:title,
        imgUrl:imgUrl,
        content:content
    }
    
        fetch(`/api/blog/update/${props.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })
            .then(response => response.json())
            .then(data =>{ 
                console.log(data)
                window.location.replace(`/blog/${data.id}`);
            })
            .catch(error => console.error(error));
    
    console.log(payload);
   }
  return (
    <div>
       <div className='m-5'>
       <TextField value={title} onChange={(e)=>setTitle(e.target.value)} id="outlined" label="Title" variant="outlined" />
       </div>
       <div className='m-5'>
       <TextField value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)} id="outlined" label="Cover Image URL" variant="outlined" />
       </div>        
       <div className='m-5 my-8'>
        <label className=''>Content</label>
        
        <Tooltip title="Edit the text using the provided formatting features">
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
            <div id='blogContent' className='shadow-lg   overflow-hidden border h-max font-lora p-4 pb-28 lg:pb-14 leading-loose box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none '>
                  
                <ReactMarkdown  children={content} rehypePlugins={[rehypeRaw]}/>     
                 
             </div>
        }
        <Button  variant="contained" onClick={upload} className='py-2 w-full  '>UPDATE</Button>
       </div>
       
       
    </div>
  )
}

export default EditDraft