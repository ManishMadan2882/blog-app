import React from 'react'
import { SendOutlined} from '@mui/icons-material'
import { TextareaAutosize } from '@mui/base'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
const NewComment = ({blogId,closeModal,updateInfo}) => {
    const [text,setText] = useState('')
    const [loading,setLoading] = useState(false)
    function comment(){
      setLoading(true);
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
        {
          setLoading(false);
          updateInfo();
          closeModal();
        }
        else window.location.replace('/login')
        
    }
        
       )
       .catch(err => console.log(err))  
    }
  return (
    <div >
       <label className='block text-white'>Add Comment</label>
       <TextareaAutosize value={text} onChange={(e)=> setText(e.target.value)} placeholder='Write the Comment here' className='bg-gray-100 p-2 w-full ' minRows={3}/>
       <button onClick={()=> comment()} className="w-full px-4 py-2 bg-gray-200" >
           {
            loading ?
            <ClipLoader color="#36d7b7" loading={loading} width={'100%'} />
            :
           <SendOutlined  color='secondary'/>
           }
       </button> 
    </div>
  )
}

export default NewComment