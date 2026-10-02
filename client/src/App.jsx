import React, { useEffect, useState } from "react";

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
          <li id={venue.id}>{venue.name}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
