import React, { useState, useEffect } from 'react';
import Card from './Card';
import {Button} from '@mui/material';
import { green } from '@mui/material/colors';
import { Edit } from '@mui/icons-material';
import { useParams,useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Modal} from '@mui/material';
import UpdateUser from './UpdateUser';
import { DotLoader } from 'react-spinners';
const Dashboard = ({currUser}) => {
  const {username} = useParams();
  const [user, setUser] = useState({});
  const [loading,setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function postUpdation(newData){
     setUser(newData);
  }
  useEffect(()=>{
    fetch(`/api/profile/${username}`)
    .then((res) => res.json())
    .then((data)=>{
      setUser(data);
      setLoading(false)
    })      
  },[])

  return (
    <div className="bg-white  p-6 rounded shadow-md">
       <DotLoader color="#36d7b7" loading={loading} width={'100%'} className='absolute ml-[50%] mt-48'/>
       {!loading &&  
      <div>
       <div className="border w-full  bg-gradient-to-r from-cyan-600 to-sky-800 ...">
             {currUser === user.username &&
             <Button onClick={openModal} className=" p-2 absolute float-right " title="Edit Profile" sx={{ color: green[100] }}>
                Edit
                <Edit/>
             </Button>}
              <Modal
             open={modalIsOpen}
             onClose={closeModal}
             >
                   <UpdateUser data={user} close={closeModal} postUpdation={postUpdation}/>
             </Modal> 
          <div className='flex justify-center w-full h-[150] rounded-md p-4'>

            <div className='text-white font-semibold'>
             
            <img width={200} className='rounded-full shadow-2xl  ' src = {user.imgUrl}/>
            
            {user.name 
              && 
            <h1 className='text-center text-2xl font-lora font-semibold  text-shadow-lg' >{user.name}</h1>}
            {user.bio 
              && 
            <h1 className='text-center text-md font-lora font-semibold'>{user.bio}</h1>
            }
            <h1 className='text-center text-xl font-lora font-semibold'>{"@" + user.username}</h1>
            
            {user.location
              && 
            <h1 className='text-center text-md font-lora font-semibold'><LocationOnIcon/>{user.location}</h1>}
            </div>
          </div> 
      </div>
      <h1 className='text-2xl text-black p-2 underline'>Blog posts</h1>
      <div className='flex justify-center'>
           
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-[98%] '>
               {
                user.blogs && user.blogs.map((Element,key) => {
                return <Card
                 key={key}
                 author={user.username}
                 title={Element.title}
                 content={Element.content.slice(0,100)}
                 imgUrl={Element.imgUrl}
                 url={"/blog/"+Element._id} 
               />
                })
               } 
            </div>
          </div>
          </div>}
    </div>
  );
};

export default Dashboard;
