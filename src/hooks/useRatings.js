import { useState, useCallback } from "react";

// Mock ratings data (replace with actual API calls later)
const mockRatings = {
  1: [
    {
      ratingId: "r1",
      userId: "u1",
      meetupId: "1",
      stars: 5,
      comment: "Great session!",
    },
    {
      ratingId: "r2",
      userId: "u2",
      meetupId: "1",
      stars: 4,
      comment: "Very informative",
    },
  ],
  2: [
    {
      ratingId: "r3",
      userId: "u3",
      meetupId: "2",
      stars: 5,
      comment: "Excellent meetup!",
    },
  ],
  // Add more mock ratings as needed
};

export const useRatings = (meetupId) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRatings = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual API call later
      const mockData = mockRatings[meetupId] || [];
      setRatings(mockData);
      setError(null);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      setError("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  }, [meetupId]);

  const calculateAverageRating = useCallback(() => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.stars, 0);
    return sum / ratings.length;
  }, [ratings]);

  return {
    ratings,
    loading,
    error,
    fetchRatings,
    averageRating: calculateAverageRating(),
    totalRatings: ratings.length,
  };
};
