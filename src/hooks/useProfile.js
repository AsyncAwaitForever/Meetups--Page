import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://3sq393e8ml.execute-api.eu-north-1.amazonaws.com';

export const useProfileMeetups = (token) => {
  const [profileMeetups, setProfileMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileMeetups = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch profile meetups');

      const data = await response.json();

      // Ändra här för att sätta profileMeetups till data.profile
      setProfileMeetups(data.profile || []);
      setError(null);
    } catch (err) {
      setError('Failed to load profile meetups');
      setProfileMeetups([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileMeetups();
  }, [token]);

  return {
    profileMeetups,
    loading,
    error,
    refetchProfileMeetups: fetchProfileMeetups,
  };
};
