import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./components/Header.jsx";

export default function App() {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getVenues() {
      try {
        const response = await fetch("/venues");
        if (!response.ok) throw new Error("Could not load cities.");
        const data = await response.json();
        setVenues(data);
      } catch {
        setError("Could not load cities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getVenues();
  }, []);

  const cities = [...new Set(venues.map((venue) => venue.location))];
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <Header />
      <main className="container">
        <section className="intro">
          <h1>Find events in your city</h1>
          <p>Choose a city to see what's happening nearby.</p>
        </section>

        <label className="search-label" htmlFor="city-search">
          Search locations
        </label>
        <input
          id="city-search"
          className="search-input"
          type="search"
          placeholder="Try Detroit or Chicago"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <h2>All cities</h2>
        {loading && <p role="status">Loading cities...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && filteredCities.length === 0 && (
          <p>
            {cities.length === 0
              ? "No cities available yet."
              : "No cities found. Try a different location."}
          </p>
        )}

        <div className="city-grid">
          {filteredCities.map((city) => (
            <Link
              className="city-card"
              to={`/cities/${encodeURIComponent(city)}`}
              key={city}
            >
              <img
                className="city-image"
                src={`/images/${city.split(",")[0].toLowerCase().replaceAll(" ", "-")}.jpg`}
                alt={`${city.split(",")[0]} city view`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/city-night.jpg";
                  event.currentTarget.alt = "City lights at night";
                }}
              />
              <div className="city-card-content">
                <h3>{city.split(",")[0]}</h3>
                <p>{city}</p>
                <span>View events →</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
