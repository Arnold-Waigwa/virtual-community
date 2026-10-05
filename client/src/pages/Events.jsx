import { useEffect, useState } from "react";
import { Header } from "../components/Header.jsx";
import EventCard from "../components/EventCard.jsx";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await fetch("/events");
        if (!response.ok) throw new Error("Could not load events.");
        const data = await response.json();
        setEvents(data);
      } catch {
        setError("Could not load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.location.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <Header />
      <main className="container">
        <section className="intro">
          <h1>All Events</h1>
          <p>Browse events across all cities or search for a location.</p>
        </section>

        <label className="search-label" htmlFor="event-location">Search by location</label>
        <input
          id="event-location"
          className="search-input"
          type="search"
          placeholder="Try Detroit, Chicago, or MI"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {loading && <p role="status">Loading events...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && (
          <>
            <p role="status">{filteredEvents.length} events found</p>
            {filteredEvents.length === 0 && (
              <p>{events.length ? "No events match that location. Try a different search." : "No events listed yet."}</p>
            )}
            <div className="event-list">
              {filteredEvents.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
