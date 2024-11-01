import { useState, useEffect } from "react";

// Hook per gestire i filtri
export const useFilters = () => {
  const [filters, setFilters] = useState({
    date: '',
    category: '',
    location: '',
  });

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

    // Aggiungi i parametri solo se non sono vuoti
    if (filters.date) params.append("date", filters.date);
    if (filters.category) params.append("category", filters.category);
    if (filters.location) params.append("location", filters.location);

    const url = `${baseUrl}?${params.toString()}`;
    console.log("Generated URL:", url); // Assicurati di avere il log dell'URL generato
    return url;
  };

  // Logga l'URL ogni volta che i filtri cambiano
  useEffect(() => {
    generateUrl();
  }, [filters]);

  return { filters, updateFilters, generateUrl };
};
