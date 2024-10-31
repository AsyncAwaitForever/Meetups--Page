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

    const endpoint = `https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups/search?keyword=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
