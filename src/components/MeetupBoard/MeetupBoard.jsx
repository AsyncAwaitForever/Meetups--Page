/* eslint-disable react/prop-types */
import "./meetupBoard.scss";
import MeetupCard from "../MeetupCard/MeetupCard";

const MeetupBoard = ({ meetups }) => {
  const meetupsList = Array.isArray(meetups) ? meetups : [];

  return (
    <div className="meetupBoard">
      <h2 className="meetupBoard__title">Upcoming Meetups</h2>
      <div className="meetupBoard__grid">
        {meetupsList.map((meetup) => (
          <MeetupCard
            key={meetup.meetupId}
            meetupId={meetup.meetupId}
            title={meetup.title}
            category={meetup.category}
            description={meetup.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetupBoard;
