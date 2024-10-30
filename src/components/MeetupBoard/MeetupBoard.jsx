import "./meetupBoard.scss";
import MeetupCard from "../MeetupCard/MeetupCard";

const MeetupBoard = ({ meetups }) => {
  return (
    <div className="meetupBoard">
      <h2 className="meetupBoard__title">Upcoming Meetups</h2>
      <div className="meetupBoard__grid">
        {meetups.map((meetup) => (
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
