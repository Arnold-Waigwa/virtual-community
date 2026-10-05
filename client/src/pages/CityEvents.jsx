import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/Header.jsx";

export default function CityEvents() {
  const { city } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function getEvents() {
      setLoading(true);
      setError("");
      setEvents([]);

      try {
        const response = await fetch("/venues");
        if (!response.ok) throw new Error("Could not load venues.");
        const venues = await response.json();
        const cityVenues = venues.filter((venue) => venue.location === city);
        const cityEvents = [];

        for (const venue of cityVenues) {
          const eventsResponse = await fetch(`/events/?venue=${venue.id}`);
          if (!eventsResponse.ok) throw new Error("Could not load events.");
          const venueEvents = await eventsResponse.json();

          for (const event of venueEvents) {
            cityEvents.push({ ...event, venueName: venue.name });
          }
        }

        cityEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        if (!cancelled) setEvents(cityEvents);
      } catch {
        if (!cancelled)
          setError("Could not load events. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getEvents();
    return () => {
      cancelled = true;
    };
  }, [city]);

  return (
    <>
      <Header />
      <main className="container">
        <Link className="back-link" to="/">
          ← All cities
        </Link>
        <h1>Events in {city}</h1>
        <p className="page-description">
          Browse local events and find something you'd like to attend.
        </p>

        {loading && <p role="status">Loading events...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p>No events listed for this city yet.</p>
        )}

        <div className="event-list">
          {events.map((event) => (
            <article className="event-card" key={event.id}>
              <img
                className="event-image"
                src={event.image || "/images/riverfront.jpg"}
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/riverfront.jpg";
                }}
              />
              <div className="event-details">
                <h2>{event.name}</h2>
                <p>{event.venueName}</p>
                <p className="event-date">
                  {new Date(event.date).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
