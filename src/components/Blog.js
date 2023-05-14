import React from 'react'
import { TextareaAutosize } from '@mui/base';
import { Navbar } from './Navbar'
const Blog = () => {
 
  return (
    <div>
        <Navbar/>
        <div>
           <h1 className='text-3xl font-bold border-b-2 py-6'>
               ChatGPT 4.0
           </h1>          

           <div className='flex justify-center'>
           <img alt="Image" className='py-6 h-64 drop-shadow-xl' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png'/>
           </div>
         
           <TextareaAutosize disabled className='text-lg font-medium border box-shadow-lg w-full  overflow-hidden  p-8 resize-none max-h-max min-h-fit' >
            {`A foreign key is essentially a  field or column in another table that is being referenced by the original table. A foreign key usually references a primary key in another table but as you can see our posts table, it also has a foreign key link to the username which we need for obvious reasons. To ensure data integrity you can use the UNIQUE constraint on the username field which allows it to function as a foreign key.
             ffafd
             Using a column in a table that references a column in a different table is what allows us to have relations between tables in our database hence why SQL databases are referred to as “relational databases”.`}
           </TextareaAutosize>
        </div>
    </div>
  )
}

export default Blog