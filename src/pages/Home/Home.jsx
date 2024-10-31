import { useMeetups } from "../../hooks/useMeetups";
import Header from "../../components/Header/Header";
import MeetupBoard from "../../components/MeetupBoard/MeetupBoard";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./home.scss";
import { useState } from "react";

export default function Home() {
  const { meetups, loading, error } = useMeetups();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = (filters) => {
    // logic here!
    const results = meetups.filter(meetup => {
      const matchesDate = filters.date ? meetup.date === filters.date : true;
      const matchesCategory = filters.category ? meetup.category === filters.category : true;
      const matchesLocation = filters.location ? meetup.location === filters.location : true;
      return matchesDate && matchesCategory && matchesLocation;
    });
    setFilteredResults(results);
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
          <MeetupBoard
            meetups={filteredResults.length > 0 ? filteredResults : meetups}
            setFilterVisible={setFilterVisible}
          />
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
