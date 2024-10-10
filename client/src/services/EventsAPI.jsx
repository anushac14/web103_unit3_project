// src/services/EventsAPI.jsx
const API_BASE_URL = '/api/events';

// Function to get all events
export const getAllEvents = async () => {
  try {
    const response = await fetch(API_BASE_URL); // This will call GET /api/events
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to get a specific event by ID
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${eventId}`); // This will call GET /api/events/:eventId
    if (!response.ok) {
      throw new Error('Failed to fetch the event');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
