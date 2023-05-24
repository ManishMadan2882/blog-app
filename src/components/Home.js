import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { Navbar } from './Navbar'
import api from '../api.js'
const Home = (props) => {
    const [blogs,setBlogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(api+'/blogs');
            const jsonData = await response.json();
            setBlogs(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);     
    
  return (
    <div>
        <Navbar username = {props.user}/>
        <h1 className='m-6 text-2xl font-extralight'>Latest Blogs</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {blogs.map((Element,key)=>{
            return <Link to={`/blog/${Element._id}`}>
                     <Card  imgUrl={Element.imgUrl}  title={Element.title} content = {Element.content}/>
                   </Link>
        })}
        </div>
        
    </div>
  )
}

export default Home