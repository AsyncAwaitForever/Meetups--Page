import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import "./filterSearch.scss";

const FilterSearch = ({ open, onClose, onSearch }) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (category.length >= 2 || location.length >= 2 || date) {
      const filters = { date, category, location };
      console.log('Searching with filters:', filters); // Logga i filtri
      onSearch(filters);
      onClose();
      setError("");
    } else {
      setError("Enter at least 2 characters per category or locality.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filter Search</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        {error && <p className="error-message">{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSearch} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterSearch;
