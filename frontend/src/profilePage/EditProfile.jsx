import React, { useContext } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import SnoozeHeader from "../general/SnoozeHeader";
import icon from "../../assets/sampleprofile.png";
import { Box, Button, propNames, Text } from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";

const EditProfile = (props) => {
  const userContext = useContext(UserContext);
  console.log(userContext);
  let navigate = useNavigate();

  const name = `${props.user.firstName} ${props.user.lastName}`;

  return (
    <div className="EditProfile">
      <SnoozeHeader />
      <div className="container">
        <div className="icon-box">
          <p className="title">Edit Profile</p>
          <img className="icon" src={icon} alt="" />
          <p>Edit picture or avatar</p>
        </div>
        <div className="info-box">
          <div className="single-box">
            <p className="text-title">Name:</p>
            <p>{name}</p>
          </div>
          <div className="single-box">
            <p className="text-title">Email:</p>
            <p>{props.user.email}</p>
          </div>
        </div>

        <button className="button" onClick={() => navigate("/profilepage")}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
