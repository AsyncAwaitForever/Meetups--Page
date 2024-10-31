import React from "react";
import useSearch from "../../hooks/useSearch";
import SearchResults from "../SearchResults/SearchResults";
import "./searchBar.scss";

const SearchBar = () => {
  const { results, loading, error, search } = useSearch();
  console.log("resultsfrom SearchBar", results);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    search(query);
  };

  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSearch}>
        <input type="text" name="query" className="searchBarInput" placeholder="Search..." />
        <button className="searchBarButton" type="submit">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && results.length === 0 && <p>No results found.</p>}
      {results.length > 0 && (
    <>
        {console.log(results)}
        <SearchResults results={results} />
    </>
)}

    </div>
  );
};

export default SearchBar;
