// import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/meetups">Meetups</Link>
      <Link to="/review">Review</Link>
      <Link to="/profile">My Profile</Link>
    </div>
  );
};

export default Navbar;
