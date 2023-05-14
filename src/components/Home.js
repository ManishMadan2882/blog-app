import React from 'react'
import { Navbar } from './Navbar'
const Home = (props) => {
  return (
    <div>
        <Navbar username = {props.user}/>
    </div>
  )
}

export default Home