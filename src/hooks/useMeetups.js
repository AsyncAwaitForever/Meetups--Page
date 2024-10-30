import { useState, useEffect } from "react";

const mockMeetups = [
  {
    meetupId: "1",
    title: "Yoga in the Park",
    category: "sport",
    location: "Central Park",
    time: "2024-11-01T10:00:00Z",
    host: "Jane Doe",
    description: "some text",
    availableCapacity: 50,
    maxCapacity: 50,
    ratings: [
      {
        ratingId: "r1",
        userId: "u1",
        meetupId: "1",
        stars: 5,
        comment: "Great session!",
      },
    ],
    registrations: [
      {
        meetupId: "1",
        userId: "u1",
      },
    ],
  },
  {
    meetupId: "2",
    title: "Tech Talks: AI Innovations",
    category: "Tech",
    location: "Downtown Conference Center",
    time: "2024-11-02T14:00:00Z",
    host: "John Smith",
    description: "some text",
    availableCapacity: 50,
    maxCapacity: 50,
    ratings: [],
    registrations: [],
  },
  {
    meetupId: "3",
    title: "Cooking Class: Italian Cuisine",
    category: "Food",
    location: "Downtown Conference Center",
    time: "2024-11-03T18:00:00Z",
    host: "Chef Mario",
    description: "some text",
    availableCapacity: 50,
    maxCapacity: 50,
    ratings: [],
    registrations: [],
  },
  {
    meetupId: "4",
    title: "Photography Walk",
    category: "Art",
    location: "City Art Gallery",
    time: "2024-11-04T09:30:00Z",
    host: "Emily Brown",
    description: "some text",
    availableCapacity: 50,
    maxCapacity: 50,
    ratings: [],
    registrations: [],
  },
  {
    meetupId: "5",
    title: "Book Club: Fantasy Novels",
    category: "Books",
    location: "Local Library",
    time: "2024-11-05T16:00:00Z",
    host: "Sarah Johnson",
    description: "some text",
    availableCapacity: 50,
    maxCapacity: 50,
    ratings: [],
    registrations: [],
  },
];

export const useMeetups = () => {
  const [meetups, setMeetups] = useState(mockMeetups);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMeetups = async () => {
    try {
      setLoading(true);
      setMeetups(mockMeetups);
      setError(null);
    } catch (err) {
      console.error("Error fetching meetups:", err);
      setError("Failed to load meetups");
    } finally {
      setLoading(false);
    }
  };

  const getMeetupById = async (id) => {
    try {
      //   const response = await fetch("https://example.com/api/meetups");
      setLoading(true);
      const meetup = mockMeetups.find((m) => m.meetupId === id);
      if (!meetup) {
        throw new Error("Meetup not found");
      }
      return meetup;
    } catch (err) {
      console.error("Error fetching meetup:", err);
      throw new Error("Failed to load meetup details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetups();
  }, []);

  return {
    meetups,
    loading,
    error,
    refetchMeetups: fetchMeetups,
    getMeetupById,
  };
};
