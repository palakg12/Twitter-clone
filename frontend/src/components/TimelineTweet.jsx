import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import api from "../redux/api";
import { BackendUrl } from "../App";
const TimelineTweet = () => {
  const [timeLine, setTimeLine] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await api.get(
          `${BackendUrl}/tweets/timeline/${currentUser._id}`
        );

        setTimeLine(timelineTweets.data);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);

  // console.log("Timeline", timeLine);
  return (
    <div className=" mt-6 ">
      {timeLine &&
        timeLine.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setTimeLine} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;