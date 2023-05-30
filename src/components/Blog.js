import React, { useEffect,useState } from 'react'
import { Button, TextareaAutosize } from '@mui/base';
import Comment from './Comment';
import { useParams,useNavigate } from 'react-router-dom';
import { Cancel } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import Modal from 'react-modal'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewComment from './NewComment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";


const Blog = ({user}) => {
  const {id} = useParams();
  const navigate =  useNavigate();
  const [commentModal,setCommentModalOpen ] = useState(false)
  const [blog,setBlog] = useState([])
  const [comments,setComments] = useState([])
  const [openDel,setOpenDel] = useState(false)
  const convertStringToHTML = htmlString => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, 'text/html');

    return html.body;
}
  const deleteBlog = ()=>{ // makes DELETE request to remove the blog

    fetch(`/api/blog/${id}`,{
      method : 'DELETE'
    }).then(res => res.json())
      .then(data => console.log(data.msg))
      .catch(err => console.log(err)) 

  }

  const callAPI = ()=> // loads the blog contents
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
    {
        (blog.author === user) && <div className='float-right p-2' >
          <Button title='Delete Blog' onClick={()=>setOpenDel(true)}> <Delete color='primary' fontSize='medium'/></Button>
          <Dialog
        open={openDel}
        onClose={()=> setOpenDel(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this blog?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Blog will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>{
            deleteBlog()
            setOpenDel(false)
            navigate(-1)
          }} autoFocus>
            Yes
          </Button>
          <Button  onClick={()=> setOpenDel(false)}>No</Button>
        </DialogActions>
      </Dialog>
        </div>}
        <div>
           <h1 className='text-3xl p-3 text-center font-prata border-b-2 py-6'>
               {blog.title}
           </h1>          

           <div className='flex justify-center'>
              <img alt="Image" className='py-6 h-64 drop-shadow-xl' src={blog.imgUrl}/>
           </div>
             <div  className='flex justify-center '>
               <div id='blogContent' className='shadow-lg  border h-max font-lora p-4 pb-28 lg:pb-14 leading-loose box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none '>
                  
                <ReactMarkdown  children={blog.content} rehypePlugins={[rehypeRaw]}/>     
             
             </div>
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