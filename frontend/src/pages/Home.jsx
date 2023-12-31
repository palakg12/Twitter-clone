// import LeftSideBar from '../components/LeftSideBar'
// import RightSideBar from '../components/RightSideBar'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import Signin from './Signin'
// import MainTweet from '../components/MainTweet'


// const Home=() =>{
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
//      <MainTweet/>
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

// export default Home




import React from "react";
import LeftSidebar from "../components/LeftSideBar";
import RightSidebar from "../components/RightSideBar";
import MainTweet from '../components/MainTweet'
import Signin from "./Signin";

import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <Signin />
      ) : (
        // <div className="w-full h-full bg-white">
        <div className="bg-custom-color text-white grid grid-cols-1 md:grid-cols-4">
          <div className="px-6">
            <LeftSidebar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <MainTweet />
          </div>
          <div className="px-6">
            <RightSidebar />
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default Home;