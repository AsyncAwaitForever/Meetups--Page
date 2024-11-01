import React, { useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { useMeetups } from "../../hooks/useMeetups"; // Importa l'hook qui
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import MeetupsFiltered from "../../components/MeetupsFiltered/MeetupsFiltered";
import "./home.scss";

export default function Home() {
  const { filters, updateFilters } = useFilters();
  const { meetups, loading, error } = useMeetups(); // Utilizza l'hook per ottenere meetups, loading ed error
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredMeetups, setFilteredMeetups] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  const handleSearch = (newFilters) => {
    updateFilters(newFilters);

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
          <MeetupBoard meetups={meetups} setFilterVisible={setFilterVisible} />
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
            }}
          />
        )}
      </div>
    </>
  );
}
