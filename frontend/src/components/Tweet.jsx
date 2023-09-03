import axios from "axios";
import React, { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import api from "../redux/api";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BackendUrl } from "../App";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [userData, setUserData] = useState();

  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await api.get(`${BackendUrl}/users/find/${tweet.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleLike = async (e) => {
    e.preventDefault();
 const token=localStorage.getItem("token");
    console.log("tweet",token);
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type as needed
    };
    try {
      const like = await axios.put(`${BackendUrl}/tweets/${tweet._id}/like`, {
        id: currentUser._id,
      }, {headers});

      if (location.includes("profile")) {
        const newData = await api.get(`${BackendUrl}/tweets/user/all/${id}`);
        setData(newData.data);
      } else if (location.includes("explore")) {
        const newData = await api.get(`${BackendUrl}/tweets/explore`);
        setData(newData.data);
      } else {
        const newData =await api.get(`${BackendUrl}/tweets/timeline/${currentUser._id}`);
        setData(newData.data);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.name}</h3>
            </Link>

            <span className="font-normal">@{userData.name}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={handleLike}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;

