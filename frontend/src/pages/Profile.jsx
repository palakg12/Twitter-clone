import React, { useState, useEffect } from "react";
import LeftSidebar from "../components/LeftSideBar";
import RightSidebar from "../components/RightSideBar";
import EditProfile from "../components/EditProfile";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BackendUrl } from "../App";
import Tweet from "../components/Tweet";
import { following } from "../redux/userSlice";
import api from "../redux/api";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweets = await api.get(`${BackendUrl}/tweets/user/all/${id}`);
        const userProfile = await api.get(`${BackendUrl}/users/find/${id}`);
// console.log(userProfile)
        setUserTweets(userTweets.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser, id]);

  const handleFollow = async (e) => {
    const token=localStorage.getItem("token");
    console.log("tweet",token);
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type as needed
    };

    if (!currentUser.following.includes(id)) {
      try {
        const follow = await api.put(`${BackendUrl}/users/follow/${id}`, {
          id: currentUser._id,
        },{headers});
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    } else {
      try {
        const unfollow = await api.put(`${BackendUrl}/users/unfollow/${id}`, {
          id: currentUser._id,
        },{headers});
        dispatch(following(id));
      } catch (err) {
        console.log("error", err);
      }
    }
  };
  
  return (
    <>
      <div className="bg-custom-color text-white grid grid-cols-1 md:grid-cols-4">
        <div className="px-6 py-4">
          <LeftSidebar/>
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img src={userProfile?.profilePicture}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser._id === id ? (
              <button
                className="px-4 -y-2 bg-purple-500 rounded-full text-white"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button
                className="px-4 -y-2 bg-purple-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Following
              </button>
            ) : (
              <button
                className="px-4 -y-2 bg-purple-500 rounded-full text-white"
                onClick={handleFollow}
              >
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweets &&
              userTweets.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweets} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;





