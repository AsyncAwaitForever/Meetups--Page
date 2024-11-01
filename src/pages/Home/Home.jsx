import React, { useState } from "react";
import { useMeetups } from "../../hooks/useMeetups";
import { useFilters } from "../../hooks/useFilters"; 
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.scss";

export default function Home() {
  const { filters, updateFilters } = useFilters();  
  const { meetups, loading, error } = useMeetups(filters);
  const [filterVisible, setFilterVisible] = useState(false);

  const handleSearch = (newFilters) => {
    console.log('New filters from FilterSearch:', newFilters); // Logga i nuovi filtri
    updateFilters(newFilters); 
    setFilterVisible(false);
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
          <MeetupBoard meetups={meetups} setFilterVisible={setFilterVisible} />
        )}
        <FilterSearch
          open={filterVisible}
          onClose={() => setFilterVisible(false)}
          onSearch={handleSearch}
        />
      </div>
    </>
  );
}
