import { useState } from "react";

const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    setLoading(true);
    setError(null);

    if (!query || query.length < 1) {
        setError("keyword must be at least one character ");
        setLoading(false);
        return;
      }
  
    const endpoint = `https://uw8qzn03l8.execute-api.eu-north-1.amazonaws.com/meetups/search?keyword=${encodeURIComponent(query)}`;

  
    try {
      console.log("Request to:", endpoint);
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Status:", response.status);
      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      console.log(data);
      
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return { results, loading, error, search };
};

export default useSearch;
