import { Navbar } from './components/Navbar';
import { useEffect,useState } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import {Routes, Route,  BrowserRouter as Router} from 'react-router-dom' 
function App() {
   const [user,setUser] = useState('*')
   useEffect(()=>{
    fetch('/ping')
    .then((res)=>res.json())
    .then((data)=>{
        if(data.isAuth)
        {
          console.log(data.userData.username);
          setUser(data.userData.username)
        }
        
    })
   })

  return (
      <div>
    
  
    <Router>
      <Routes>
      <Route path="/" element={<Home user={user}/>}/> 
         <Route path="/login" element={<Login  />}/> 
         <Route path="/register" element={<Register  />}/> 
         <Route path="/blog/:id" element={<Blog user={user} />}/> 
      </Routes>
    </Router>
  </div>
    
  );
}

export default App;
