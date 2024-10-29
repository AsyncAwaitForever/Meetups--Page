import { useNavigate } from "react-router-dom";
import "./meetupCard.scss";

const MeetupCard = ({ id, title, description, category }) => {
  const navigate = useNavigate();

  return (
    <div className="meetupCard" onClick={() => navigate(`/meetups/${id}`)}>
      <h3 className="meetupCard__title">{title}</h3>
      <span className="meetupCard__category">{category}</span>
      <p className="meetupCard__description">{description}</p>
    </div>
  );
};

export default MeetupCard;

//här måste vi fixa med backenden
