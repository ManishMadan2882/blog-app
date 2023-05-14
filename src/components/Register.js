import React,{useState} from 'react'
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
const Register = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    function postToAPI(){
        let payload = {
            username:username,password:password
        }
        fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.replace('/');
            })
            .catch(error => console.error(error));
    } 
  return (
    <div className='flex justify-center  m-3'>
     
       <div className='border p-5'>
     
       <div className='m-6'>
       <TextField id="outlined-basic" value={username} onChange={(e)=>setUsername(e.target.value)}  label="Username" variant="outlined"  />
       </div>
       <div className='m-6'>
       <TextField id="outlined-basic" value={password} onChange={(e)=>setPassword(e.target.value)} label="Password" variant="outlined" />
       </div>
       <div className='justify-center flex'>
       <Button variant="contained" onClick={postToAPI}>Sign Up</Button>
       </div>
       </div>

    </div>
  )
}

export default Register