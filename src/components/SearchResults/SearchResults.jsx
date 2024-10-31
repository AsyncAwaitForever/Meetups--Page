import React from 'react';

const SearchResults = ({ results }) => {
  return (
      <ul className='results-list'>
          {results.map(item => (
              <li key={item.meetupId}>
                  <h3>{item.title}</h3>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Host:</strong> {item.host}</p>
                  <p><strong>Category:</strong> {item.category}</p>
                  <p><strong>Date:</strong> {new Date(item.time).toLocaleString()}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Available Capacity:</strong> {item.availableCapacity} / {item.maxCapacity}</p>
              </li>
          ))}
      </ul>
  );
};


export default SearchResults;
