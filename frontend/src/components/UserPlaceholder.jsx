import React, { useEffect } from "react";
import api from "../redux/api";
import { useLocation, useParams } from "react-router-dom";
import { BackendUrl } from "../App";
const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await api.get(`${BackendUrl}/users/find/${id}`);
        setUserData(userProfile.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;