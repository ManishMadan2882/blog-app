import React, { useEffect,useState } from 'react'
import { Button} from '@mui/base';
import EditDraft from './EditDraft';
import { Edit} from '@mui/icons-material';
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
import { HashLoader } from 'react-spinners';

const Blog = ({user}) => {
  const {id} = useParams();
  const navigate =  useNavigate();
  const [commentModal,setCommentModalOpen ] = useState(false)
  const [blog,setBlog] = useState([])
  const [comments,setComments] = useState([])
  const [openDel,setOpenDel] = useState(false)
  const [openEdit,setOpenEdit] = useState(false)
  const [loading,setLoading] = useState(true);
  const deleteBlog = ()=>{ // makes DELETE request to remove the blog

    fetch(`/api/blog/${id}`,{
      method : 'DELETE'
    }).then(res => res.json())
      .then(data => window.location.replace('/'))
      .catch(err => console.log(err)) 

  }

  const callAPI = ()=> // loads the blog contents
  {
    
    fetch(`/api/blog/${id}`)
    .then(res => res.json())
    .then(data => {
      if(data.msg === 'not found')
      {
        window.location.replace('/pagenotfound')
      }
      setBlog(data)
    console.log(data);
    setComments(data.comments)
    setLoading(false)
  })
    console.log(blog);
  }
  useEffect(()=>{
    callAPI()
  },[])
  return (
    <div>
    <HashLoader
        className='absolute mt-[50%] md:mt-[150px] mx-auto align-middle '
        color='#36d7b7'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
     {!loading &&
       <div>
       {

(blog.account.username === user) && <div className='float-right p-2 ' >
  <Button className='m-2'><Edit color='primary' onClick={()=>setOpenEdit(true)}/></Button>
  <Modal isOpen={openEdit}>
       <div >
       <button onClick={()=>setOpenEdit(false)} className='float-right' >{<Cancel/>}</button>
       </div>
          <EditDraft title={blog.title} content={blog.content} imgUrl={blog.imgUrl} id={id}/>
   </Modal>
 
  <Button className='m-2' title='Delete Blog' onClick={()=>setOpenDel(true)}> <Delete color='primary' fontSize='medium'/></Button>
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
  <Button  
  className='p-2 m-2 bg-rose-800 text-white shadow-md'
  onClick={()=>{
    deleteBlog()
    setOpenDel(false)
    navigate(-1)
  }} autoFocus>
    Yes
  </Button>
  <Button  
   className='p-2 m-2  bg-green-800 text-white shadow-md'
  onClick={()=> setOpenDel(false)}>No</Button>
</DialogActions>
</Dialog>
</div>}
<div>
   <h1 className='text-3xl p-3 text-center font-prata border-b-2 py-6'>
       {blog.title}
   </h1>          

   {blog.imgUrl &&  <div className='flex justify-center'>
      <img alt="Image" className='py-6 max-w-full lg:max-w-[60%] drop-shadow-xl' src={blog.imgUrl}/>
   </div>}
     <div  className='flex justify-center '>
       <div id='blogContent' className='shadow-lg overflow-hidden border h-max font-lora p-4 pb-28 lg:pb-14 leading-loose box-shadow-lg w-full lg:w-[60%] bg-white text-justify resize-none '>
          
        <ReactMarkdown  children={blog.content} rehypePlugins={[rehypeRaw]}/>     
         
     </div>
     </div>
    </div>

    <div className='p-4 flex   justify-center'>
    
      <Button className=' w-full lg:w-[60%] border-gray-600 m-8 box-shadow-lg border py-2 ' onClick={() => setCommentModalOpen(true)}><AddCommentIcon fontSize='large' />{comments && comments.length}</Button>
    </div>
    {
      <Modal className=' flex justify-center' onRequestClose={()=> setCommentModalOpen(false)}  isOpen={commentModal}>
            <div className='mt-[20%] w-full md:w-auto bg-gradient-to-r from-cyan-700 to-cyan-600  p-4 '>
               <button onClick={()=> setCommentModalOpen(false)} className='block float-right p-4' >{<Cancel/>}</button>
            <NewComment setComments comments blogId={id} closeModal = {setCommentModalOpen} updateInfo = {callAPI} />
            </div>
       </Modal>  
    }
    <div className='flex justify-center'>
    <div className='font-prata w-full lg:w-[60%] grid-flow-row grid-cols-1 '>
      {
        
        comments && comments.map((element,key) =>{
          return <Comment account={element.account} comment={element.comment}/>
        })
      }           
      
    </div>
    </div>
       </div>
      }
  
    
    

    </div>
  )
}

export default Blog