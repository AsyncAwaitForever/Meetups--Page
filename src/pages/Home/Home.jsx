import React, { useState, useEffect } from "react";
import { useFilters } from "../../hooks/useFilters"; 
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import MeetupsFiltered from "../../components/MeetupsFiltered/MeetupsFiltered"; 
import "./home.scss";

export default function Home() {
  const { filters, updateFilters } = useFilters();  
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredMeetups, setFilteredMeetups] = useState([]); 
  const [showFiltered, setShowFiltered] = useState(false); 
  const [meetups, setMeetups] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const fetchMeetups = async () => {
    setLoading(true);
    const url = "https://2wwh49b9bf.execute-api.eu-north-1.amazonaws.com/meetups"; 

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setMeetups(data.meetups);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  const handleSearch = (newFilters) => {
    updateFilters(newFilters);

    const filtered = meetups.filter(meetup => {
      const matchesCategory = newFilters.category ? meetup.category === newFilters.category : true;
      const matchesLocation = newFilters.location ? meetup.location.toLowerCase().includes(newFilters.location.toLowerCase().trim()) : true;
      const matchesDate = newFilters.date ? new Date(meetup.time).toISOString().split("T")[0] === newFilters.date : true;

      return matchesCategory && matchesLocation && matchesDate;
    });

    setFilteredMeetups(filtered);
    setShowFiltered(filtered.length > 0);
    setFilterVisible(false);

    if (filtered.length === 0) {
      alert("No results found");
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <SearchBar />
        {loading ? (
          <div className="loading-message">Loading meetups...</div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            <MeetupBoard meetups={meetups} setFilterVisible={setFilterVisible} />
            <FilterSearch
              open={filterVisible}
              onClose={() => setFilterVisible(false)}
              onSearch={handleSearch}
            />
            {showFiltered && filteredMeetups.length > 0 && (
              <MeetupsFiltered
                meetups={filteredMeetups} 
                onClose={() => {
                  setShowFiltered(false); 
                  setFilteredMeetups([]); 
                }} 
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
