import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Rating } from "react-simple-star-rating";
import { useMeetups } from "../../hooks/useMeetups";
import Header from "../../components/Header/Header";
import "./meetups.scss";

const Meetups = () => {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMeetupById } = useMeetups();

  // State
  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch meetup data
  const loadMeetup = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getMeetupById(id);
      setMeetup(data);
    } catch (err) {
      console.error("Failed to load meetup:", err);
      setError("Failed to load meetup details");
    } finally {
      setLoading(false);
    }
  }, [id, getMeetupById]);

  useEffect(() => {
    loadMeetup();
  }, [loadMeetup]);

  // Loading and error states
  if (loading)
    return <div className="loading-message">Loading meetup details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!meetup) return <div className="error-message">Meetup not found</div>;

  // Calculate average rating
  const averageRating =
    meetup.ratings.length > 0
      ? meetup.ratings.reduce((acc, curr) => acc + curr.stars, 0) /
        meetup.ratings.length
      : 0;

  return (
    <div>
      <Header />
      <div className="meetup-container">
        {/* Meetup Details */}
        <div className="meetup-details">
          <div className="meetup-header">
            <h2>{meetup.title}</h2>
            <div className="rating-summary">
              <Rating readonly initialValue={averageRating} size={24} />
              <span>({meetup.ratings.length} reviews)</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="meetup-info">
            <p>Category: {meetup.category}</p>
            <p>Location: {meetup.location}</p>
            <p>Time: {new Date(meetup.time).toLocaleString()}</p>
            <p>Host: {meetup.host}</p>
            <p>Description: {meetup.description}</p>
            <p>
              Available Spots: {meetup.availableCapacity} / {meetup.maxCapacity}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="ratings-section">
            <h3>Reviews</h3>
            {meetup.ratings.length > 0 ? (
              <div className="ratings-list">
                {meetup.ratings.map((rating) => (
                  <div key={rating.ratingId} className="rating-item">
                    <div className="rating-header">
                      <Rating readonly initialValue={rating.stars} size={20} />
                      <span className="rating-user">User: {rating.userId}</span>
                    </div>
                    <p className="rating-comment">{rating.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-button"
              onClick={() => navigate(`/review/${id}`)}
            >
              Write review
            </button>
            <button className="action-button">Join this meetup</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetups;
