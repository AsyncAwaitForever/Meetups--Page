import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useMeetups } from "../../hooks/useMeetups";
import { useRatings } from "../../hooks/useRatings";
import Header from "../../components/Header/Header";
import "./meetups.scss";

const Meetups = () => {
  const { id } = useParams();
  const { getMeetupById } = useMeetups();
  const {
    ratings,
    loading: ratingsLoading,
    error: ratingsError,
    averageRating,
    totalRatings,
  } = useRatings(id);

  const [meetup, setMeetup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadMeetup = async () => {
      if (!id) return;

      try {
        const data = await getMeetupById(id);
        if (mounted) {
          setMeetup(data.meetup);
          setError(null);
        }
      } catch {
        if (mounted) {
          setError("Failed to load meetup details");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMeetup();

    return () => {
      mounted = false;
    };
  }, [id, getMeetupById]);

  const renderRatings = () => {
    if (ratingsLoading) return <p>Loading reviews...</p>;
    if (ratingsError) return <p>Error loading reviews: {ratingsError}</p>;
    if (!ratings.length) return <p>No reviews yet</p>;

    return (
      <div className="ratings-list">
        {ratings.map((rating) => (
          <div key={rating.ratingId} className="rating-item">
            <div className="rating-header">
              <Rating readonly initialValue={rating.stars} size={20} />
              <span className="rating-date">
                {new Date(rating.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="rating-comment">{rating.comment}</p>
          </div>
        ))}
      </div>
    );
  };

  if (loading)
    return <div className="loading-message">Loading meetup details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!meetup) return <div className="error-message">Meetup not found</div>;

  return (
    <div>
      <Header />
      <div className="meetup-container">
        <div className="meetup-details">
          <h2>{meetup.title}</h2>
          <div className="meetup-info">
            {/* Average Rating Display */}
            <div className="rating-summary">
              <Rating
                readonly
                initialValue={Number(averageRating)}
                size={24}
                allowFraction
              />
              <span className="rating-average">
                {averageRating} ({totalRatings}{" "}
                {totalRatings === 1 ? "review" : "reviews"})
              </span>
            </div>

            {/* Meetup Details */}
            <p>
              <strong>Location:</strong> {meetup.location}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(meetup.time).toLocaleString()}
            </p>
            <p>
              <strong>Host:</strong> {meetup.host}
            </p>
            <p>
              <strong>Category:</strong> {meetup.category}
            </p>
            <p>
              <strong>Description:</strong> {meetup.description}
            </p>
            <p>
              <strong>Available Spots:</strong> {meetup.availableCapacity} /{" "}
              {meetup.maxCapacity}
            </p>

            {/* Reviews Section */}
            <div className="reviews-section">
              <h3>Reviews</h3>
              {renderRatings()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetups;
