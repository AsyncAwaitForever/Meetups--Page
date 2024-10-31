import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { useMeetups } from "../../hooks/useMeetups";
import { useRatings } from "../../hooks/useRatings";
import Header from "../../components/Header/Header";
import FormButton from "../../components/Button/Button";
import "./meetups.scss";

const Meetups = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState(null);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

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

  const handleJoinMeetup = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please log in to join meetups");
      navigate("/login");
      return;
    }

    setJoinLoading(true);
    setJoinError(null);

    try {
      const response = await fetch(
        `https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/${id}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
          throw new Error("Please log in again");
        }
        throw new Error(errorData.message || "Failed to join meetup");
      }

      // Refresh meetup data after successful join
      const updatedMeetup = await getMeetupById(id);
      setMeetup(updatedMeetup.meetup);
      alert("Successfully joined the meetup!");
    } catch (error) {
      console.error("Error joining meetup:", error);
      setJoinError(error.message);
    } finally {
      setJoinLoading(false);
    }
  };

  const handleLeaveMeetup = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    setLeaveLoading(true);
    setLeaveError(null);

    try {
      const response = await fetch(
        `https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/${id}/unregister`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login");
          throw new Error("Please log in again");
        }
        throw new Error(errorData.message || "Failed to leave meetup");
      }

      // Refresh meetup data after successfully leaving
      const updatedMeetup = await getMeetupById(id);
      setMeetup(updatedMeetup.meetup);
      alert("Successfully left the meetup!");
    } catch (error) {
      console.error("Error leaving meetup:", error);
      setLeaveError(error.message);
    } finally {
      setLeaveLoading(false);
    }
  };

  const renderRatings = () => {
    if (ratingsLoading) return <p>Loading reviews...</p>;
    if (ratingsError) return <p>Error loading reviews: {ratingsError}</p>;
    if (!ratings.length) return <p>No reviews yet</p>;

    return (
      <div className="ratings-list">
        {ratings.map((rating) => (
          <div key={rating.ratingId} className="rating-item">
            <div className="rating-header">
              <div className="rating-user-info">
                <span className="user-id">Name: {rating.userId}</span>
                <Rating readonly initialValue={rating.stars} size={20} />
              </div>
              <span className="rating-date">
                {new Date(rating.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="rating-comment">{rating.text}</p>
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

            <div className="action-buttons">
              <FormButton
                text={
                  !sessionStorage.getItem("token")
                    ? "Login to Join"
                    : joinLoading
                    ? "Joining..."
                    : "Join Meetup"
                }
                onClick={handleJoinMeetup}
                className="action-button"
                disabled={joinLoading || meetup.availableCapacity === 0}
              />
              <FormButton
                text={leaveLoading ? "Leaving..." : "Leave Meetup"}
                onClick={handleLeaveMeetup}
                className="action-button leave-button"
                disabled={leaveLoading}
              />
              <FormButton
                text="Leave Review"
                onClick={() => navigate(`/review/${id}`)}
                className="action-button"
                disabled={!sessionStorage.getItem("token")}
              />
              {joinError && <p className="error-message">{joinError}</p>}
              {leaveError && <p className="error-message">{leaveError}</p>}
            </div>

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
