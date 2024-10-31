import React from 'react';

const SearchResults = ({ results, loading, error }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      {results.length > 0 && (
        <ul className='results-list'>
          {results.map(item => (
            <li key={item.meetupId}>
              <h3><a href={`/meetup/${item.meetupId}`}>{item.title}</a></h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Host:</strong> {item.host}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Date:</strong> {new Date(item.time).toLocaleString()}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Available Capacity:</strong> {item.availableCapacity} / {item.maxCapacity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
