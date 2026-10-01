import pool from "./config.js";

const initializeDatabase = async () => {
  const query = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS venues;

    CREATE TABLE venues (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        image VARCHAR(512) NOT NULL
    );

    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        venue_id INT REFERENCES venues(id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        date TIMESTAMPTZ NOT NULL,
        image VARCHAR(512) NOT NULL
    );
  `;

  try {
    await pool.query(query);
    console.log("Database tables initialized successfully!");
  } catch (error) {
    console.error("Error creating database tables:", error);
    throw error;
  }
};
