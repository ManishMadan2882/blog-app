import React,{useState} from 'react'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
const Register = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [msg,setMsg] = useState('');
    function postToAPI(){
        let payload = {
            username:username,password:password
        }
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })
            .then(response => response.json())
            .then(data => {
                if(data.isCreated)
                window.location.replace('/');
                else
                setMsg(data.message)
            })
            .catch(error => console.error(error));
    } 
  return (
    <div className='flex justify-center rounded drop-shadow-xl mt-[10%]'>
     
       <div className='border p-5'>
       <h1 className='text-center text-2xl'>One step to go 🔥</h1>
       <div className='m-6'>
       <TextField id="outlined-basic" value={username} onChange={(e)=>setUsername(e.target.value)}  label="Username" variant="outlined"  />
       </div>
       <div className='m-6'>
       <TextField id="outlined-basic" value={password} type='password' onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
       </div>
       <div className='justify-center flex'>
       <Button className='w-full' variant="contained" onClick={postToAPI}>Sign Up</Button>
       </div>
       <h1 className='text-center p-2'>{msg}</h1>
       </div>

    </div>
  )
}

export default Register