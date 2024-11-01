import { useState, useEffect } from "react";

// Hook per gestire i filtri
export const useFilters = () => {
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
  });
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Questa funzione genera l'URL in base ai filtri
  const generateUrl = () => {
    const baseUrl = "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/filter";
    const params = new URLSearchParams();

    if (filters.date) params.append("date", filters.date);
    if (filters.category) params.append("category", filters.category);
    if (filters.location) params.append("location", filters.location);

    const url = `${baseUrl}?${params.toString()}`;
    console.log("Generated URL:", url);
    return url;
  };

  // Esegui il fetch degli meetups ogni volta che i filtri cambiano
  useEffect(() => {
    const fetchMeetups = async () => {
      const url = generateUrl();
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeetups(data); // Imposta i meetups ricevuti
        console.log("Fetched meetups:", data); // Logga i risultati
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetups();
  }, [filters]);

  return { filters, updateFilters, meetups, loading, error };
};
