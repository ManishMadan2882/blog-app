import React, { useEffect,useState } from 'react'
import { Button, TextareaAutosize } from '@mui/base';
import { Navbar } from './Navbar'
import Comment from './Comment';
import { useParams } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from 'react-modal'
import EditIcon from '@mui/icons-material/Edit';
import NewComment from './NewComment';
import AddCommentIcon from '@mui/icons-material/AddComment';
const Blog = (props) => {
  const {id} = useParams();
  const [commentModal,setCommentModalOpen ] = useState(false)
  const [blog,setBlog] = useState([])
  const [comments,setComments] = useState([])
  const addLike = (choice)=>{
     switch(choice)
     {
      case 'like':
          
      case "unlike": 
     }
  }
  const callAPI = ()=>
  {
    
    fetch(`/api/blogs/${id}`)
    .then(res => res.json())
    .then(data => {setBlog(data)
    console.log(data);
    setComments(data.comments)
  })
    console.log(blog);
  }
  useEffect(()=>{
    callAPI()
  },[])
  return (
    <div>
        <Navbar username = {props.user}/>
        <div>
           <h1 className='text-3xl p-3 text-center font-prata border-b-2 py-6'>
               {blog.title}
           </h1>          

           <div className='flex justify-center'>
              <img alt="Image" className='py-6 h-64 drop-shadow-xl' src={blog.imgUrl}/>
           </div>
            <div className='flex justify-center'>

           <TextareaAutosize value={blog.content} disabled className='h-max   text-lg   p-2 pb-28 lg:pb-14 res leading-loose font-prata box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none ' />
          
            </div>
            </div>

            <div className='p-4 border-gray-600 m-8 box-shadow-lg border  flex justify-evenly'>
             {/*  <Button onClick={()=> {
                  like?
                  setLikeCount(likeCount-1)
                  :
                  setLikeCount(likeCount+1)
                  setLike(!like) 
                  fetch(`/api/like/${id}`)
              }} className='px-4 py-2 text-2xl' ><FavoriteIcon  fontSize='large'  />{likeCount}</Button>  */}
              <Button onClick={() => setCommentModalOpen(true)}><AddCommentIcon fontSize='large' />{comments && comments.length}</Button>
            </div>
            {
              <Modal className=' flex justify-center' onRequestClose={()=> setCommentModalOpen(false)}  isOpen={commentModal}>
                    <div className='mt-[20%] w-full md:w-auto bg-gradient-to-r from-cyan-700 to-cyan-200 rounded-2xl p-4 '>
                       <button onClick={()=> setCommentModalOpen(false)} className='block float-right' >{<Cancel/>}</button>
                    <NewComment setComments comments blogId={id} closeModal = {setCommentModalOpen} />
                    </div>
               </Modal>  
            }
            <div className='flex justify-center'>
            <div className='font-prata md:w-96 grid-flow-row grid-cols-1 '>
              {
                
                comments && comments.map((element,key) =>{
                  return <Comment account={element.account} comment={element.comment}/>
                })
              }           
              
            </div>
            </div>

    </div>
  )
}

export default Blog