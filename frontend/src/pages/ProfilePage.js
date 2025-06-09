import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    toast.error("Please login first!");
  }

  useEffect(() => {
    const fetchUserInfo = async() => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/user-info`, {withCredentials: true});

        console.log(data)
    }

    fetchUserInfo();
  })

  return <div>ProfilePage</div>;
};

export default ProfilePage;
