import React from 'react'

const Card = ({imgUrl,title,content}) => {
  return (
    <div className='bg-gray-100 h-[400px] overflow-hidden cursor-pointer  rounded-md border  shadow-lg m-6 p-4 '>
      <div className=' '>
        <img className=' w-full rounded responsive:w-full' src={imgUrl}/>
      </div>
      <div className='p-5   overflow-hidden'>
        <h1 className='font-bold   text-xl'>
          {title}
        </h1>
        <p className=' text-gray-600 '>
          {content}
        </p>
      </div>
    </div>
  )
}

export default Card