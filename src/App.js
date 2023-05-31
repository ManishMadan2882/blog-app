import './index.css'
import { useEffect,useState } from 'react';
import { Navbar } from './components/Navbar';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Page404 from './components/Page404';
import {Routes, Route,  BrowserRouter as Router} from 'react-router-dom' 
function App() {
   const [user,setUser] = useState('*')
   useEffect(()=>{
    fetch('/api/ping')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        if(data.isAuth)
        {
          setUser(data.userData.username)
         
        }
        
    })
    .catch((err)=> console.log('Err  '+err))
   },[])

  return (
      <div>
    
    <Navbar username = {user}/>
    <Router>
      <Routes>
      <Route path="/" element={<Home user={user}/>}/> 
         <Route path="/login" element={<Login  />}/> 
         <Route path="/register" element={<Register  />}/> 
         <Route path="/blog/:id" element={<Blog user={user} />}/>
         <Route path="/pagenotfound" element={<Page404/>}/>
         <Route path="*" element={<Page404/>}/> 
      </Routes>
    </Router>
  </div>
    
  );
}

export default App;
