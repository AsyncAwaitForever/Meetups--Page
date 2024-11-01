import { useEffect, useState } from 'react';
import { useProfileMeetups } from '../../hooks/useProfile';
import useSimpleAuth from '../../hooks/useAuth/useSimpleAuth';
import { Link, useNavigate } from 'react-router-dom';
import './profile.scss';
import Header from '../../components/Header/Header';

const ProfileMeetupsPage = () => {
  const token = useSimpleAuth();
  const { profileMeetups, loading, error } = useProfileMeetups(token);
  const navigate = useNavigate();
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowLoginMessage(true);
    } else {
      setShowLoginMessage(false);
    }
  }, [token]);

  return (
    <>
      <Header />
      {showLoginMessage ? (
        <div className="login-prompt">
          <p>You are not logged in. Please log in to view your Profile.</p>
          <button onClick={() => navigate('/login')} className="login-button">
            Login here
          </button>
        </div>
      ) : (
        <div className="profile-page">
          {loading && (
            <div className="loading-message">Loading your Profile...</div>
          )}
          {error && <div className="error-message">{error}</div>}
          {profileMeetups.length === 0 && !loading && (
            <div className="message">
              No meetups found in your Profile. Please check back later.
            </div>
          )}
          {profileMeetups.length > 0 && (
            <div>
              <h1>Your Meetups</h1>
              <ul className="meetups-list">
                {profileMeetups.map((meetup) => (
                  <li key={meetup.meetupId}>
                    <Link
                      to={`/meetups/${meetup.meetupId}`}
                      className="meetup-link"
                    >
                      <h2>{meetup.title}</h2>
                      <p>Status: {meetup.status}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileMeetupsPage;
