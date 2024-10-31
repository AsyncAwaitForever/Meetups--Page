import React from 'react';
import useSearch from '../../hooks/useSearch';
import SearchResults from '../SearchResults/SearchResults';
import "./searchBar.scss"

const SearchBar = () => {
  const { results, loading, error, search } = useSearch();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    search(query);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSearch}>
        <input type="text" name="query" className="searchBarInput" placeholder="Search..." />
        <button className="searchBarButton" type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
};

export default SearchBar;
