import { useState, useEffect } from "react";

// Hook per gestire i filtri
export const useFilters = () => {
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
  });
  const [meetups, setMeetups] = useState([]); // Stato per i meetups
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateFilters = (newFilters) => {
    const trimmedFilters = Object.fromEntries(
      Object.entries(newFilters).map(([key, value]) => [key, value.trim()])
    );

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...trimmedFilters,
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

  // Effettua il fetch dei dati quando i filtri cambiano
  useEffect(() => {
    const fetchMeetups = async () => {
      setLoading(true);
      const url = generateUrl();

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Raw fetched data:", data); // Logga i dati grezzi

        if (Array.isArray(data.meetups)) {
          setMeetups(data.meetups); // Imposta i meetups ricevuti
        } else {
          throw new Error("Fetched data.meetups is not an array");
        }
      } catch (err) {
        console.error("Failed to fetch meetups:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Esegui il fetch solo se ci sono filtri o carica i meetups principali
    if (filters.date || filters.category || filters.location) {
      fetchMeetups();
    } else {
      // Qui puoi caricare i meetups principali o predefiniti se necessario
      setMeetups([]); // Sostituisci con i meetups principali se disponibili
    }
  }, [filters]); // Fetch solo quando i filtri cambiano

  // Logga l'URL ogni volta che i filtri cambiano
  useEffect(() => {
    generateUrl();
  }, [filters]);

  return { filters, updateFilters, meetups, loading, error };
};
