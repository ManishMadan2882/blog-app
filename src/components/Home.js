import React from 'react'
import Card from './Card'
import { useEffect,useState } from 'react'
import { HashLoader } from 'react-spinners'
const Home = (props) => {
    const [blogs,setBlogs] = useState([])
    const [loading,setLoading ] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/blog/all');
            const jsonData = await response.json();
            console.log(jsonData[0].account.username)
            setBlogs(jsonData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);     
    
  return (
    <div>
        {
          !loading ?
          <div>
        <h1 className='m-6 text-2xl font-extralight'>Latest Blogs</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 '>
        {blogs.map((Element,key)=>{
            return <div className='flex justify-center '>
                     <Card key={key} url={"/blog/"+Element._id}  imgUrl={Element.imgUrl}  title={Element.title} content = {Element.content.slice(0,200)} author={Element.account ? Element.account.username : ""}  />
                   </div>
        })}
        </div>
        </div>
        :
        <HashLoader
        className='absolute mt-[50%] md:mt-[150px] mx-auto align-middle '
        color='#36d7b7'
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
        }
        
    </div>
  )
}

export default Home