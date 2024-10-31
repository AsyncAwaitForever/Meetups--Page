import React, { useState } from "react";
import "./searchResults.scss";

const SearchResults = ({ results, loading, error, hasSearched, onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="searchResults-container">
      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && hasSearched && results.length === 0 && <p className="no-results">No results found</p>}

      {results.length > 0 && (
        <ul className="results-list">
          {results.map((item) => (
            <li key={item.meetupId}>
              <h3>
                <a href={`/meetups/${item.meetupId}`}>{item.title}</a>
              </h3>
              <div>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Host:</strong> {item.host}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(item.time).toLocaleString()}
                </p>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Available Capacity:</strong> {item.availableCapacity} / {item.maxCapacity}
                </p>
                <button className="closeSearch-button" onClick={handleClose}>
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
