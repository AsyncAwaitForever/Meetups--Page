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
    if (filters.category) params.append("category", filters.category.trim().toLowerCase()); // Trim e converti in minuscolo
    if (filters.location) params.append("location", filters.location.trim().toLowerCase()); // Trim e converti in minuscolo

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
        } else {
          const allResults = [];
          for (const key of Object.keys(filters)) {
            if (filters[key]) {
              const fallbackUrl = `https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/filter?${key}=${filters[key].trim().toLowerCase()}`; // Trim e converti in minuscolo
              const fallbackResponse = await fetch(fallbackUrl);
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                console.log(`Fallback fetched meetups for ${key}:`, fallbackData.meetups);

                if (Array.isArray(fallbackData.meetups)) {
                  allResults.push(...fallbackData.meetups);
                }
              } else {
                console.error(`Error fetching fallback meetups for ${key}:`, fallbackResponse.statusText);
              }
            }
          }
          const uniqueResults = Array.from(new Set(allResults.map(meetup => meetup.meetupId)))
                                      .map(id => allResults.find(meetup => meetup.meetupId === id));
          setMeetups(uniqueResults);
          console.log("Unique fallback meetups:", uniqueResults);
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
