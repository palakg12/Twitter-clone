import React from 'react'
import {FaHome ,FaSearch,FaStar,FaUser} from 'react-icons/fa'
import MainSection from './MainSection'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
   <div className='mainPage'>
   <nav className="navbar-expand">
       <ul className='navitems'> 
       <li className='navlist'>
           <FaHome/>Home
           </li>
           <li className='navlist'>
              <FaSearch/>Explore
           </li>
           <li className='navlist'>
              <FaUser/>Profile
           </li>
          
       </ul>
   </nav>
      <main className='mainpge'>
      <h1 className="mainhead">Home <FaStar/></h1> 
      <MainSection/>
      
   </main>
   </div>
  )
}

export default NavBar