import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Venue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const venueResult = await fetch(`/venues/${id}`);
        const venue = await venueResult.json();

        const eventsResult = await fetch(`/events/?venue=${venue.id}`);
        const events = await eventsResult.json();

        setVenue(venue);
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  return (
    <div>
      <h1>{venue.name}</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Venue;
