import { useState, useEffect } from "react";

export const useFilters = () => {
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
  });
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const generateUrl = () => {
    const baseUrl = "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/filter";
    const params = new URLSearchParams();

    if (filters.date) params.append("date", filters.date);
    if (filters.category) params.append("category", filters.category.trim().toLowerCase());
    if (filters.location) params.append("location", filters.location.trim().toLowerCase());

    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const fetchMeetups = async () => {
      setLoading(true);
      const url = generateUrl();

      try {
        console.log("Fetching meetups with URL:", url);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched meetups:", data.meetups);

        if (Array.isArray(data.meetups) && data.meetups.length > 0) {
          setMeetups(data.meetups);
          setError("");
        } else {
          setMeetups([]);
          setError("No results found.");
        }
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch meetups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetups();
  }, [filters]);

  return { filters, updateFilters, meetups, loading, error };
};
