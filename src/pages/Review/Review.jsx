import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import Header from "../../components/Header/Header";
import "./review.scss";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    // Will be implemented with backend
    console.log({ rating, review });
  };

  return (
    <div>
      <Header />
      <div className="reviewContainer">
        <h1 className="reviewTitle">Meet up name</h1>
        <div className="starsRating">
          <Rating onClick={handleRating} initialValue={rating} />
        </div>
        <textarea
          className="reviewTextInput"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button className="reviewButton" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Review;
