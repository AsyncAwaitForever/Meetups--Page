import { useState, useEffect } from "react";

const API_BASE_URL = "https://3sq393e8ml.execute-api.eu-north-1.amazonaws.com";

export const useMeetups = () => {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeetups = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/meetups`);
      if (!response.ok) throw new Error("Failed to fetch meetups");
      const data = await response.json();
      setMeetups(data.meetups || []);
      setError(null);
    } catch {
      setError("Failed to load meetups");
      setMeetups([]);
    } finally {
      setLoading(false);
    }
  };

  const getMeetupById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/meetups/${id}`);
    if (!response.ok) throw new Error("Failed to fetch meetup");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  return {
    meetups,
    loading,
    error,
    refetchMeetups: fetchMeetups,
    getMeetupById,
  };
};
