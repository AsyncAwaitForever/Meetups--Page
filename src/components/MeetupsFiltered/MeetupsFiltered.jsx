import React from "react";
import "./meetupsFiltered.scss";

const MeetupsFiltered = ({ meetups, onClose }) => {
  return (
    <div className="home-overlay">
      <div className="meetups-filtered-content">
        <button className="close-filtersResults" onClick={onClose}>X</button>
        {meetups.length > 0 ? (
          meetups.map(meetup => (
            meetup.error ? (
              <p key="error-message" className="error-message">{meetup.error}</p>
            ) : (
              <div className="meetup-item" key={meetup.meetupId}>
                <h2 className="meetup-title">
                  <a href={`/meetups/${meetup.meetupId}`}>{meetup.title}</a>
                </h2>
                <p className="meetup-details">{meetup.description}</p>
                <p className="meetup-details">Location: {meetup.location}</p>
                <p className="meetup-details">Category: {meetup.category}</p>
                <p className="meetup-details">Time: {new Date(meetup.time).toLocaleString()}</p>
              </div>
            )
          ))
        ) : (
          <p>No meetups found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default MeetupsFiltered;
