import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Login/Login.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Review from "../pages/Review/Review.jsx";
import Meetups from "../pages/Meetups/Meetups.jsx";
import TestPage from "../pages/TestPage/TestPage.jsx";
import "../styling/global.scss";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meetups/:id" element={<Meetups />} />{" "}
        {/* This route needs the :id parameter */}
        <Route path="/review" element={<Review />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
