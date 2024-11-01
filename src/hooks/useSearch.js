import { useState } from "react";

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); 

  const search = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(false); 

    if (!query || query.length < 1) {
      setError("Keyword must be at least one character");
      setLoading(false);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();

    try {
      const response = await fetch(
        "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups"
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      setResults(data.meetups); 
      setHasSearched(true); 


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search, hasSearched };
};

export default useSearch;
