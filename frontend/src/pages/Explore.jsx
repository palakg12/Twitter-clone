// import LeftSideBar from '../components/LeftSideBar'
// import RightSideBar from '../components/RightSideBar'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import Signin from './Signin'
// import ExploreTweets from '../components/ExploreTweets'

// const Explore = () =>{
//   const {currentUser} = useSelector((state) => state.user);
//   return ( 
// <>
//   {
//     !currentUser ? (
//       <Signin/>
//     ): (
//       <div className="grid grid-cols-1 ml-4 mt-2 md:grid-cols-4 border-y-2">
// <div className='px-6 py-6'>
//   <LeftSideBar/>
//   </div>
    
//     <div className="col-span-2 mt-4 border-x-2 border-t-slate-800 px-6">
//       <ExploreTweets/>
//     </div>
//     <div className='px-6 py-6'>
//       <RightSideBar/>
//     </div>
//     </div>
//     )
//   }  
//   </>
//   )
// }

// export default ExploreTweets




import React from "react";
import ExploreTweets from "../components/ExploreTweets";
import LeftSidebar from "../components/LeftSideBar";
import RightSidebar from "../components/RightSideBar";
import { useSelector } from "react-redux";
import Signin from "./Signin";

const Explore = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        <div className="bg-custom-color text-white grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar/>
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <ExploreTweets/>
          </div>
          <div className="px-6">
            <RightSidebar/>
          </div>
        </div>
      )
    }
  )
    </>
  );
  };

export default Explore;