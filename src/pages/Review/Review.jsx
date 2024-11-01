import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Header from "../../components/Header/Header";
import FormButton from "../../components/Button/Button";
import "./review.scss";

const Review = () => {
  const { meetupId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [meetupTitle, setMeetupTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetupDetails = async () => {
      try {
        const response = await fetch(
          `https://3sq393e8ml.execute-api.eu-north-1.amazonaws.com/meetups/${meetupId}`
        );
        if (!response.ok) throw new Error("Failed to fetch meetup details");
        const data = await response.json();
        setMeetupTitle(data.meetup.title);
      } catch {
        setError("Failed to load meetup details");
      }
    };

    fetchMeetupDetails();
  }, [meetupId]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (!sessionStorage.getItem("token")) {
      alert("Please log in to leave a review");
      navigate("/login");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `https://3sq393e8ml.execute-api.eu-north-1.amazonaws.com/meetups/${meetupId}/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            stars: rating,
            text: review,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit review");

      alert("Review submitted successfully!");
      navigate(`/meetups/${meetupId}`);
    } catch {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="reviewContainer">
        <h1 className="reviewTitle">
          {error ? "Error" : meetupTitle || "Loading..."}
        </h1>
        <div className="starsRating">
          <Rating onClick={handleRating} initialValue={rating} size={40} />
        </div>
        <textarea
          className="reviewTextInput"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <FormButton
          text={loading ? "Submitting..." : "Submit Review"}
          onClick={handleSubmit}
          disabled={loading}
          className="reviewButton"
        />
      </div>
    </div>
  );
};

export default Review;
