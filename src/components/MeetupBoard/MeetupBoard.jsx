import "./meetupBoard.scss";
import MeetupCard from "../MeetupCard/MeetupCard";

const MeetupBoard = ({ meetups }) => {
  return (
    <div className="meetupBoard">
      <h2 className="meetupBoard__title">Upcoming Meetups</h2>
      <div className="meetupBoard__grid">
        {meetups.map((meetup) => (
          <MeetupCard key={meetup.id} {...meetup} />
        ))}
      </div>
    </div>
  );
};

export default MeetupBoard;
