import React, { useState } from 'react'
import {InputLabel, TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import { BarLoader } from 'react-spinners';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
const UpdateUser = ({data,close,postUpdation}) => {
    const [user,setUser] = useState(data);
    const [loading,setLoading] = useState(false);
    const handleNameChange = (e)=>{
      setUser(
        {
            ...user,
            name : e.target.value
        }
      )
      console.log(user);
    }
    const handleBioChange = (e)=>{
        setUser(
          {
              ...user,
              bio : e.target.value
          }
        )
        console.log(user);
      }
      const handleLocationChange = (e)=>{
        setUser(
          {
              ...user,
              location : e.target.value
          }
        )
        console.log(user);
      }
      const handleEmailChange = (e)=>{
        setUser(
          {
              ...user,
              email : e.target.value
          }
        )
        console.log(user);
      }
   const submit =  ()=>{
    setLoading(true);
    fetch(`/api/profile/update`,{
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify(user)
    })
    .then((res) => res.json())
    .then(output => {
        console.log(output.msg);
        if(output.msg = 'edited')
        {
            postUpdation(user);
            setLoading(false);
        }
    })

   }  
  return (
    <div className='flex justify-center p-2 '>
      <div className='sm:w-[500px] w-full bg-white font-prata border-2 border-cyan-400 p-2'>
       <BarLoader color="#36d7b7" loading={loading} width={'100%'} className='absolute'/> 
      <Button onClick={close} className='float-right'><CancelIcon/></Button>
    <InputLabel className='my-2'>Username</InputLabel>
    <TextField  value={user.username} variant="outlined" fullWidth disabled></TextField>
    
    <InputLabel className='my-2'>Full Name</InputLabel>
    <TextField onChange={handleNameChange}  value={user.name} variant="outlined" fullWidth/>
    
    <InputLabel className='my-2'>Email</InputLabel>
    <TextField onChange={handleEmailChange} type='email' value={user.email} variant="outlined" fullWidth/>

    <InputLabel className='my-2'>Location</InputLabel>
    <TextField onChange={handleLocationChange} type='email' value={user.location} variant="outlined" fullWidth/>

    <InputLabel className='my-2'>Bio</InputLabel>
    <TextField onChange={handleBioChange} placeholder='React | Dev | Node' value={user.bio} color='secondary' variant="outlined" fullWidth/>
    <div className='m-4'>
    <Button onClick={submit} variant="outlined" color='primary'  fullWidth>UPDATE</Button>
    </div>
      </div>    
    </div>
  )
}

export default UpdateUser