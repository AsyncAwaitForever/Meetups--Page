import "./Login.scss";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="overlay">
        <div className="overlayContent"> </div>
      </div>
    </div>
  );
};

export default Login;

//hidden från början, visas när man klickar på signup OVERLAY
