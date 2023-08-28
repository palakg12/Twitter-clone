// import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout } from '../redux/userSlice'


// function Navbar() {
//   // const [userData, setUserData] = useState(null);
//   // const location = useLocation().pathname;
//   const dispatch = useDispatch();

//     const handleLogout= () => {
//         dispatch(logout())
//     }
//     const {currentUser} = useSelector((state) => state.user);

//   return (
//     <div className="flex justify-between items-center mb-0 ">
//       <div className="mx-auto md:mx-0">
//         <img
//           src="/twitter-logo.png"
//           alt="Twitter Logo"
//           width={"40px"}
//           className="ml-8 mt-4 "
//         />
//       </div>
      
//       <div className="col-span-4  md:border-slate-200 md:px-6 my-6 md:my-0">
//         <div className="flex items-center justify-between mt-6">
//       {
//     currentUser ? (
//           <li className="ml-5 mr-5 flex items-center">
//             <button className='btn' onClick={handleLogout} >
//               <FaSignOutAlt /> Logout
//             </button>
//           </li>
//         ) : (
//           <>
//             <li className="ml-5 mr-5 flex items-center">
//               <Link to='/login'>
//                 <FaSignInAlt /> Login
//               </Link>
//             </li>
//             <li className="ml-5 mr-5 flex items-center">
//               <Link to='/register'>
//                 <FaUser /> Register
//               </Link>
//             </li>
//           </>
//         )}
//       </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar



import React, { useState } from "react";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation } from "react-router-dom";
import UserPlaceholder from './UserPlaceholder'

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
      <div className="mx-auto md:mx-0">
        <img
          src="/twitter-logo.png"
          alt="Twitter Logo"
          width={"40px"}
          className="ml-8"
        />
      </div>

      <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">
            {location.includes("profile") ? (
              <UserPlaceholder setUserData={setUserData} userData={userData} />
            ) : location.includes("explore") ? (
              "Explore"
            ) : (
              "Home"
            )}
          </h2>
          <StarBorderPurple500Icon />
        </div>
      </div>

      <div className="px-0 md:px-6 mx-auto">
        <SearchIcon className="absolute m-2" />
        <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
      </div>
    </div>
  );
};

export default Navbar;