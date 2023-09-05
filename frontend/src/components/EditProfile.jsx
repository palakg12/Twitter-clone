// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../redux/api";
// import { changeProfile, logout } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BackendUrl } from "../App";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// import app from "../firebase";

// const EditProfile = ({ setOpen }) => {
//   const { currentUser } = useSelector((state) => state.user);

//   const [img, setImg] = useState(null);
//   const [imgUploadProgress, setImgUploadProgress] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const uploadImg = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setImgUploadProgress(Math.round(progress));
//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//             break;
//         }
//       },
//       (error) => {},
//       () => {
//         // Upload completed successfully, now we can get the download URL
//         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           try {
//             const updateProfile = await api.put(`${BackendUrl}/users/${currentUser._id}`, {
//               profilePicture: downloadURL,
//             });

//             console.log(updateProfile);
//           } catch (error) {
//             console.log(error);
//           }

//           console.log("downloaded " + downloadURL);
//           dispatch(changeProfile(downloadURL));
//         });
//       }
//     );
//   };

//   const handleDelete = async (e) => {
//     const token=localStorage.getItem("token");
//     console.log("tweet",token);
//     e.preventDefault();
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json", // Set the content type as needed
//     };
//     const deleteProfile = await api.delete(`${BackendUrl}/users/${currentUser._id}`
//     ,{headers});
//     dispatch(logout());
//     navigate("/signin");
//   };

//   useEffect(() => {
//     img && uploadImg(img);
//   }, [img]);

//   return (
//     <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
//       <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
//         <button
//           onClick={() => setOpen(false)}
//           className="absolute top-3 right-3 cursor-pointer"
//         >
//           X
//         </button>
//         <h2 className="font-bold text-xl">Edit Profile</h2>
//         <p>Choose a new profile picture</p>
//         {imgUploadProgress > 0 ? (
//           "Uploading " + imgUploadProgress + "%"
//         ) : (
//           <input
//             type="file"
//             className="bg-transparent border border-slate-500 rounded p-2"
//             accept="image/*"
//             onChange={(e) => setImg(e.target.files[0])}
//           />
//         )}

//         <p>Delete Account</p>
//         <button
//           className="bg-red-500 text-white py-2 rounded-full"
//           onClick={handleDelete}
//         >
//           Delete Account
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import api from "../redux/api";
import { changeProfile, logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BackendUrl } from "../App";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Handle the absence of the token, e.g., redirect to login or display an error
      console.error("Token not found in localStorage. Please log in.");
      // Optionally, redirect the user to the login page
      navigate("/signin");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle errors during upload
        console.error("Error during upload:", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            try {
              const updateProfile = await api.put(
                `${BackendUrl}/users/${currentUser._id}`,
                {
                  profilePicture: downloadURL,
                },
              
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add the authorization token to the request headers
                  }
          ,
                }
              );
              window.location.reload(false);

              console.log("Profile update response:", updateProfile);
            } catch (error) {
              console.error("Error updating profile:", error);
            }

            console.log("Downloaded URL:", downloadURL);
            dispatch(changeProfile(downloadURL));
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      }
    );
  };

  const handleDelete = async (e) => {
    const token = localStorage.getItem("token");
    console.log("tweet", token);
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type as needed
    };
    const deleteProfile = await api.delete(
      `${BackendUrl}/users/${currentUser._id}`,
      { headers }
    );
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}

        <p>Delete Account</p>
        <button
          className="bg-red-500 text-white py-2 rounded-full"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
