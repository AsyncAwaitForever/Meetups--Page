import { useState, useCallback, useEffect } from "react";

const API_BASE_URL = "https://uw8qzn03l8.execute-api.eu-north-1.amazonaws.com";

export const useRatings = (meetupId) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRatings = useCallback(async () => {
    if (!meetupId) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/meetups/${meetupId}/ratings`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ratings response:", data);

      setRatings(data.ratings || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setError("Failed to load ratings");
      setRatings([]);
    } finally {
      setLoading(false);
    }
  }, [meetupId]);

  const calculateAverageRating = useCallback(() => {
    if (!ratings.length) return 0;
    const sum = ratings.reduce((acc, rating) => acc + Number(rating.stars), 0);
    return (sum / ratings.length).toFixed(1);
  }, [ratings]);

  useEffect(() => {
    if (meetupId) {
      fetchRatings();
    }
  }, [meetupId, fetchRatings]);

  return {
    ratings,
    loading,
    error,
    fetchRatings,
    averageRating: calculateAverageRating(),
    totalRatings: ratings.length,
  };
};
