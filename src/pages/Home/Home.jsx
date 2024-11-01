import React, { useState } from "react";
import { useMeetups } from "../../hooks/useMeetups";
import { useFilters } from "../../hooks/useFilters"; 
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import MeetupsFiltered from "../../components/MeetupsFiltered/MeetupsFiltered"; 
import "./home.scss";

export default function Home() {
  const { filters, updateFilters } = useFilters();  
  const { meetups, loading, error } = useMeetups();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredMeetups, setFilteredMeetups] = useState([]); 
  const [showFiltered, setShowFiltered] = useState(false); 

  const handleSearch = (newFilters) => {
    console.log('New filters from FilterSearch:', newFilters); 
    updateFilters(newFilters); 

    const filtered = meetups.filter(meetup => {
      const matchesCategory = newFilters.category ? meetup.category === newFilters.category : true;
      const matchesLocation = newFilters.location ? meetup.location.toLowerCase().includes(newFilters.location.toLowerCase().trim()) : true;

      return matchesCategory || matchesLocation; 
    });

    setFilteredMeetups(filtered);
    
 
    setShowFiltered(filtered.length > 0); 
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
        {showFiltered && (
          <MeetupsFiltered
            meetups={filteredMeetups} 
            onClose={() => setShowFiltered(false)} 
          />
        )}
      </div>
    </>
  );
}
