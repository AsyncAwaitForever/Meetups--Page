// import React from "react";
import { useNavigate } from "react-router-dom";
import "./meetupCard.scss";

const MeetupCard = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/meetups")}>
      <p>Javascript meetup</p>
      <p>Description</p>
      <p>Car meetup</p>
      <p>Description</p>
    </div>
  );
};

export default MeetupCard;
