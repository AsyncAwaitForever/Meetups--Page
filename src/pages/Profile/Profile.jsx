import { useProfileMeetups } from '../../hooks/useProfile';
import useSimpleAuth from '../../hooks/useAuth/useSimpleAuth';
import { Link } from 'react-router-dom';
import './profile.scss';
import Header from '../../components/Header/Header';

const ProfileMeetupsPage = () => {
  const token = useSimpleAuth();
  const { profileMeetups, loading, error } = useProfileMeetups(token);

  if (loading) return <div className="loading-message">Loading meetups...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!profileMeetups.length)
    return (
      <div className="message">No meetups found. Please check back later.</div>
    );

  return (
    <>
      <Header />
      <div className="profile-page">
        <h1>Your Meetups</h1>
        <ul className="meetups-list">
          {profileMeetups.map((meetup) => (
            <li key={meetup.meetupId}>
              <Link to={`/meetups/${meetup.meetupId}`} className="meetup-link">
                {' '}
                <h2>{meetup.title}</h2>
                <p>Status: {meetup.status}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProfileMeetupsPage;
