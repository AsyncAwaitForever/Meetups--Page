import './profile.scss';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="profileContainer">
      <Header />
      <h1>My Meet Ups</h1>
      <ul>
        <li>
          <Link to="/meetup/1">Meet Up 1</Link>
        </li>
        <li>
          <Link to="/meetup/2">Meet Up 2</Link>
        </li>
        <li>
          <Link to="/meetup/3">Meet Up 3</Link>
        </li>
        <li>
          <Link to="/meetup/4">Meet Up 4</Link>
        </li>
        <li>
          <Link to="/meetup/5">Meet Up 5</Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
