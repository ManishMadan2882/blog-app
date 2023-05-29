import React from 'react'
import { Button } from '@mui/material'
import { SendOutlined } from '@mui/icons-material'
import { TextareaAutosize } from '@mui/base'
import { useState } from 'react'
const NewComment = ({blogId,closeModal}) => {
    const [text,setText] = useState('')
    function comment(){
       fetch(`/api/comment/${blogId}`,{
        method:"post",
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify({
            comment : text
        })
       })
       .then((res)=> res.json())
       .then(data => {
        console.log(data.msg)
        if(data.msg === 'saved')
        window.location.reload(false)
        
    }
        
       )
       .catch(err => console.log(err))  
    }
  return (
    <div >
       <label className='block text-white'>Add Comment</label>
       <TextareaAutosize value={text} onChange={(e)=> setText(e.target.value)} placeholder='Write the Comment here' className='bg-gray-100 rounded-lg p-2 w-full ' minRows={3}/>
       <button onClick={()=> comment()} variant='outlined' className="w-full bg-white rounded-lg" ><SendOutlined  color='primary'/></button> 
    </div>
  )
}

export default NewComment