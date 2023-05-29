import React from 'react'
import { AccountBox } from '@mui/icons-material';

const Comment = ({account,comment}) => {
  return (
    <div className='bg-slate-100 shadow-lg  p-2 m-3 rounded-lg '>
       <h1 className='border-b  '><AccountBox color='primary'/>{account}</h1>
       <span>{comment}</span>
    </div>
  )
}

export default Comment