import "./login.scss";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const Login = () => {
  return (
    <div className="loginPage">
      <Header />

      <div className="loginPage__form-container">
        <LoginForm />

        {/* <SignUpForm /> */}

        <div className="overlay">
          <div className="overlayContent"> </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

//hidden från början, visas när man klickar på signup OVERLAY
