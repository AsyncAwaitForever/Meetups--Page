import './meetupOverlay.scss'
import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import "./meetupOverlay.scss";

const MeetupOverlay = ({ meetups, open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle>Filtered Meetups</DialogTitle>
    <DialogContent>
      {meetups.length > 0 ? (
        meetups.map((meetup) => (
          <div key={meetup.id} className="meetup">
            <h2>{meetup.title}</h2>
            <p>{meetup.date}</p>
            <p>{meetup.category}</p>
            <p>{meetup.location}</p>
          </div>
        ))
      ) : (
        <p>No meetups found.</p>
      )}
    </DialogContent>
    <Button onClick={onClose} color="primary">
      Close
    </Button>
  </Dialog>
);

export default MeetupOverlay;