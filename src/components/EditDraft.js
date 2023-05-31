import React,{useState} from 'react'
import { TextField, Tooltip } from '@mui/material'
import {Button} from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Info } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
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
    
        fetch(`/api/update/${props.id}`, {
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
       <TextField value={imgUrl} onChange={(e)=>setImgUrl(e.target.value)} id="outlined" label="Image URL" variant="outlined" />
       </div>        
       <div className='m-5'>
        <label className=''>Content</label>
        
        <Tooltip title="Content is Editable in Markdown Format">
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
        <TextareaAutosize
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            placeholder='I would share my opion on ChatGPT 4.0 ....'
            className='border w-full border-blue-500 p-6'
            minRows={10}

        />
        :
            <div id='blogContent' className='shadow-lg overflow-hidden border h-max font-lora p-4 pb-28 lg:pb-14 leading-loose box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none '>
                  
                <ReactMarkdown  children={content} rehypePlugins={[rehypeRaw]}/>     
                 
             </div>
        }
       </div>
       
       <Button  variant="contained" onClick={upload} className='py-2 w-full'>UPDATE</Button>
    </div>
  )
}

export default EditDraft