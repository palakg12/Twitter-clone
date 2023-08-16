import React from 'react'
import { FaHome,FaSearch,FaBell,FaFacebookMessenger,FaListAlt,FaUser
,FaMagento } from 'react-icons/fa'
function NavBar() {
  return (
    <div className='mainPage'>
    <nav className="navbar-expand">
        <ul className='navitems'> 
        <li className='navlist'>
            <FaHome/>   Home
            </li>
            <li className='navlist'>
               <FaSearch/>Explore
            </li>
            <li className='navlist'>
                <FaBell/>Notifications
            </li>
            <li className='navlist'>
               <FaFacebookMessenger/>Messages
            </li>
            <li className='navlist'>
               <FaListAlt/> Lists
            </li>
            <li className='navlist'>
               <FaUser/>Profile
            </li>
            <li className='navlist'>
              <FaMagento/> More
            </li>
        </ul>
        <button className='post'>POST</button>
    </nav>
    <main className='mainpge'>
       <h1 className="mainhead">For You</h1>
       <h1 className='mainhead'>Following</h1>
    </main>
    </div>
  )
}

export default NavBar