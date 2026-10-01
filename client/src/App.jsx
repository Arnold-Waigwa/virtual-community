import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/venues");
        const data = await response.text();
        setMessage(data);
      } catch (error) {}
    })();
  }, []);
  return <h1>{message}</h1>;
};

export default App;
