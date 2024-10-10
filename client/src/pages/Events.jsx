import React, { useState, useEffect } from 'react';
import { getAllEvents } from '../services/EventsAPI';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all events when the component mounts
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents(); // Fetching all events from the API
        setEvents(eventsData); // Setting the fetched events in state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <div className="events-list">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-item">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default Events;
