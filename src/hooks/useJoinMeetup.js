import { useState } from "react";

const API_BASE_URL = "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com";

export const useJoinMeetup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const joinMeetup = async (meetupId) => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token"); // Get auth token if needed

      const response = await fetch(
        `${API_BASE_URL}/meetups/${meetupId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization if needed
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join meetup");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    joinMeetup,
    loading,
    error,
  };
};
