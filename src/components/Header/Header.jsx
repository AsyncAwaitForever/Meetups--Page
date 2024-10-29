import Navbar from "../Navbar/Navbar";
import "./header.scss";
// import logo from "../../assets/logo/";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        {/* <img src={logo} alt="Meetups Logo" /> */}
      </div>
      <Navbar />
    </header>
  );
};

export default Header;

//fixa en logo
