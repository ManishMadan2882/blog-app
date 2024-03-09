import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import moment from 'moment';
import rehypeRaw from "rehype-raw";
const Card = ({ author, url, imgUrl, title, content, date }) => {
  return (
    <div className='relative'>
      <a href={`/profile/${author}`} className="bg-indigo-100 inline absolute left-6 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
        <AccountBoxIcon />
        {author}
      </a>
      <div className='bg-gray-100 relative w-[300px]  h-[400px] overflow-hidden cursor-pointer  rounded-md border  shadow-lg m-6 p-4 '>
        <Link to={url}>
          <div className=' '>
            <h1 className='font-bold p-1 text-center  text-xl'>
              {title}
            </h1>

            <img className='block mr-auto ml-auto max-h-40 rounded responsive:w-full' src={imgUrl} />
          </div>
          <div className='p-5 block h-36 overflow-hidden'>

            <div id='inline-all-custom overflow-hidden' className=' text-gray-600'>
              <ReactMarkdown children={content.trim()} rehypePlugins={[rehypeRaw]} />
              ...read more
            </div>
          </div>
          <span className="absolute bottom-1 right-2 bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {moment(date).fromNow()}
          </span>
        </Link>

      </div>
    </div>
  )
}

export default Card