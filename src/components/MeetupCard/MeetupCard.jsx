import { useNavigate } from "react-router-dom";
import "./meetupCard.scss";

const MeetupCard = ({ meetupId, title, category, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to meetup:", meetupId);
    navigate(`/meetups/${meetupId}`);
  };

  return (
    <div className="meetupCard" onClick={handleClick}>
      <h3 className="meetupCard__title">{title}</h3>
      <span className="meetupCard__category">{category}</span>
      <p className="meetupCard__description">{description}</p>
    </div>
  );
};

export default MeetupCard;
