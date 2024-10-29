import "./searchBar.scss";

const SearchBar = () => {
  return (
    <div className="searchBarContainer">
      <input type="text" className="searchBarInput" placeholder="Search..." />
      <button className="searchBarButton">Search</button>
    </div>
  );
};

export default SearchBar;
