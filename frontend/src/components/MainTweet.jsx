import React, { useState } from "react";
import TimelineTweet from "./TimelineTweet";
import { useSelector } from "react-redux";
import api from "../redux/api";


const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    const token=localStorage.getItem("token");
    console.log("tweet",token);
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Set the content type as needed
    };

    try {
      const submitTweet = await api.post("/tweets/new", {
        userId: currentUser._id,
        description: tweetText,
      }, { headers });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">Welcome {currentUser.name} !</p>
      )}

      <form className="border-b-2 pb-6 ">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-purple-100 text-black border-purple-800 border-2 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="text-l bg-purple-800  text-white py-2 px-10 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;