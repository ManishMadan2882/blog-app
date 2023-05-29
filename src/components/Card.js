import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';

const Card = ({author,url,imgUrl,title,content}) => {
  return (
    <div className='bg-gray-100 relative h-[400px] overflow-hidden cursor-pointer  rounded-md border  shadow-lg m-6 p-4 '>
     
      <Link to={url}>
      <div className=' '>
      <h1 className='font-bold p-1 text-center  text-xl'>
          {title}
        </h1>
        
        <img className='block mr-auto ml-auto max-h-40 rounded responsive:w-full' src={imgUrl}/>
      </div>
      <div className='p-5 block h-36 overflow-hidden'>
        
        <p className=' text-gray-600'>
          {content}...Read More
        </p>
      </div>
      </Link>
      <h1 className='absolute bottom-1  text-sm text-center'>
          <AccountBoxIcon/>{author}
        </h1>
    </div>
  )
}

export default Card