import React, { useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import MeetupsFiltered from "../../components/MeetupsFiltered/MeetupsFiltered";
import "./home.scss";

export default function Home() {
  const { filters, updateFilters, meetups, loading, error: fetchError } = useFilters();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredMeetups, setFilteredMeetups] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [searchError, setSearchError] = useState(""); 
  const handleSearch = (newFilters) => {
    updateFilters(newFilters);
    setSearchError(""); 

    if (!newFilters.date && !newFilters.category && !newFilters.location) {
      setFilteredMeetups(meetups);
      setShowFiltered(true);
      return;
    }

    const filtered = meetups.filter(meetup => {
      const matchesCategory = newFilters.category ? meetup.category === newFilters.category : false;
      const matchesLocation = newFilters.location ? meetup.location.toLowerCase().includes(newFilters.location.toLowerCase().trim()) : false;
      const matchesDate = newFilters.date ? new Date(meetup.time).toISOString().split("T")[0] === newFilters.date : false;

      return matchesCategory || matchesLocation || matchesDate;
    });

    setFilteredMeetups(filtered);
    setShowFiltered(filtered.length > 0);
    setFilterVisible(false);

    if (filtered.length === 0) {
      setSearchError("No results found for your search."); 
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <SearchBar />
        {loading ? (
          <div className="loading-message">Loading meetups...</div>
        ) : fetchError ? (
          <div className="error-message">
            {fetchError}
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            <MeetupBoard meetups={meetups} setFilterVisible={setFilterVisible} />
            {searchError && (
              <div className="error-message">
                {searchError}
                <button onClick={() => setSearchError("")}>Clear Error</button>
              </div>
            )}
          </>
        )}
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
              setSearchError(""); 
            }}
          />
        )}
      </div>
    </>
  );
}
