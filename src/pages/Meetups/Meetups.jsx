import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Header from "../../components/Header/Header";
import "./meetups.scss";

const Meetups = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // This will be replaced with backend data
  const mockMeetup = {
    id: id,
    name: "Meet up name:",
    category: "Tech",
    place: "Meet up place:",
    date: "Meet up date:",
    host: "Meet up host:",
    description: "Meet up Desc.:",
    reviews: [
      { id: 1, username: "John Doe", rating: 5, text: "Review nr. one" },
      { id: 2, username: "Jane Smith", rating: 4, text: "xxxxxxxxxxxxxxxxxx" },
      { id: 3, username: "Bob Wilson", rating: 3, text: "xxxxxxxxxxxx" },
    ],
  };

  const handleWriteReview = () => {
    navigate(`/review/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="meetup-container">
        <div className="meetup-details">
          <div className="meetup-header">
            <h2>{mockMeetup.name}</h2>
          </div>
          <p>{mockMeetup.category}</p>
          <p>{mockMeetup.place}</p>
          <p>{mockMeetup.date}</p>
          <p>{mockMeetup.host}</p>
          <p>{mockMeetup.description}</p>

          <div className="reviews-section">
            {mockMeetup.reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-content">
                  <div className="review-header">
                    <span className="review-username">{review.username}</span>
                    <Rating
                      initialValue={review.rating}
                      readonly={true}
                      size={20}
                    />
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              </div>
            ))}

            <div className="review-navigation">
              <button className="nav-button">◀</button>
              <button className="nav-button">▶</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-button" onClick={handleWriteReview}>
              Write review!
            </button>
            <button className="action-button">Join this meet up!</button>
          </div>

          <button className="show-more">Show more reviews</button>
        </div>
      </div>
    </div>
  );
};

export default Meetups;
