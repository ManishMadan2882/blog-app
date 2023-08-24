import React,{useState} from 'react'
import { Button } from '@mui/material';
import Draft from './Draft';
import Modal from 'react-modal'
import CancelIcon from '@mui/icons-material/Cancel';
import { Logout } from '@mui/icons-material';
import { AccountBox } from '@mui/icons-material';
import logo from '../assets/logo.png'
Modal.setAppElement('#root'); // set the app root element to handle screen readers
export const Navbar = (props) => {
    const [open,isOpen] = useState(false)
    const [menu,setMenu] = useState('hidden')
    const toggleMenu = () =>{
     menu === 'hidden'
     ?
      setMenu('block')
     :setMenu('hidden')
    }
    const openModal = ()=>{
        isOpen(!open)
    }
  return (
        <div>
        <Modal isOpen={open}>
        <div >
        <button onClick={openModal} className='float-right' >{<CancelIcon/>}</button>
        </div>
           <Draft/>
        </Modal>
         <nav className="flex w-full items-center justify-between flex-wrap bg-gradient-to-r from-cyan-600 to-cyan-800 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <a href='/'><img src={logo} className='w-8 rounded-2xl mx-2 shadow-lg'/></a>
            <span className="font-semibold text-xl tracking-tight">Blog-app</span>
          </div>
          <div class="block lg:hidden">
            <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
          </div>
          <div className={`w-full ${menu} lg:flex-grow lg:flex lg:items-center lg:w-auto `}>
            <div className="text-sm lg:flex-grow">
                 
              <a href="/" className="block mt-4 text-lg hover:underline lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                Read Blogs
              </a>
            </div>
            
            <div>
            <Button class="mr-5 inline-block text-sm px-4 py-2 leading-none border rounded text-white border-gray-200 hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={props.username==='*'? ()=> window.location.replace('/login'): openModal}>Create Post +</Button>
              {
               
                (props.username !== '*') ?
             
               (
                 <div className='inline'>
                 <a href={'/profile/'+props.username} className='text-white inline px-5 '>
                   <AccountBox/> 
                   {props.username}
                 </a>
                 <Button  
                 title='LOGOUT'
                 onClick={
                   async ()=>{
                    await fetch('/api/auth/logout');
                    window.location.reload(false) 
                 }
                   
                 }>
                    <Logout htmlColor='white'/>
                 </Button>
                 </div>
                )
                :
                <a href="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
              }
              
            </div>
          </div>
        </nav>
    </div>
  )
}
