import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/venues");
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      <ul>
        {venues.map((venue) => (
          <li key={venue.id}>
            <div>
              <h3>{venue.name}</h3>
              <Link to={`/_venues/${venue.id}`}>more...</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
