import './index.css'
import { useEffect,useState } from 'react';
import { Navbar } from './components/Navbar';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Page404 from './components/Page404';
import { HashLoader } from 'react-spinners';
import {Routes, Route,  BrowserRouter as Router} from 'react-router-dom' 
import Dashboard from './components/Dashboard';


function App() {
  const [loading,setLoading] = useState(true);
   const [user,setUser] = useState('*');
   useEffect(()=>{
    fetch('/api/ping')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        if(data.isAuth)
        {
          setUser(data.userData.username)
        }
        setLoading(false)
        
    })
    .catch((err)=> console.log('Err  '+err))
   },[])

  return (
      <div>
    
    {loading ?
      <HashLoader
        className='absolute mt-[50%] md:mt-[150px] mx-auto align-middle '
        color='#36d7b7'
        size={150}
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
     : 
    <div>
    <Navbar username = {user}/>
    
    <Router>
      <Routes>
      <Route path="/" element={<Home user={user}/>}/> 
         <Route path="/login" element={<Login  />}/> 
         <Route path="/register" element={<Register  />}/> 
         <Route path="/blog/:id" element={<Blog user={user} />}/>
         <Route path="/profile/:username" element={<Dashboard currUser={user}/>}/>
         <Route path="/pagenotfound" element={<Page404/>}/>
         <Route path="*" element={<Page404/>}/> 

      </Routes>
    </Router>
    </div>
    }
  </div>
    
  );
}

export default App;
