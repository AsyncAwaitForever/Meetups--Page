import React, { useState } from "react";
import "./login.scss";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import FormButton from "../../components/Button/Button";

const Login = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    console.log("Toggling overlay");
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="loginPage">
      <Header />

      <div className="loginPage__form-container">
        <LoginForm toggleOverlay={toggleOverlay} />
        {showOverlay && (
           
          <div className="overlay">
            <div className="overlayContent">
            <FormButton type="button" text="To Login" className="close-button" onClick={toggleOverlay} />
              <SignUpForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
