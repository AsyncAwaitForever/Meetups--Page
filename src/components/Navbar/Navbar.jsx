import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/login">Sign Up</Link>
      <Link to="/review">Review</Link>
      <Link to="/profile">My Profile</Link>
    </nav>
  );
};

export default Navbar;
