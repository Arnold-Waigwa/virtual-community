import pool from "./config.js";
import { eventsData, venuesData } from "./seed.js";

const initializeDatabase = async () => {
  const query = `
    DROP TABLE IF EXISTS events;
    DROP TABLE IF EXISTS venues;

    CREATE TABLE venues (
        id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        location VARCHAR(50) NOT NULL,
        image VARCHAR(512) NOT NULL
    );

    CREATE TABLE events (
        id INT PRIMARY KEY,
        venue_id INT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
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

const seedVenues = async () => {
  const insertVenuesQuery = `
    INSERT INTO venues (id, name, location, image)
    VALUES ($1, $2, $3, $4)
  `;
  for (const value of venuesData) {
    const values = [value.id, value.name, value.location, value.image];

    try {
      await pool.query(insertVenuesQuery, values);
      console.log(`successfully inserted venue ${value.name}`);
    } catch (error) {
      console.error("venue insert failed", error);
      throw error;
    }
  }
};

const seedEvents = async () => {
  const insertEventsQuery = `
    INSERT INTO events (id, venue_id, name, date, image)
    VALUES ($1, $2, $3, $4, $5)
  `;

  for (const event of eventsData) {
    const values = [
      event.id,
      event.venue_id,
      event.name,
      event.date,
      event.image,
    ];

    try {
      await pool.query(insertEventsQuery, values);
      console.log(`successfully inserted event ${event.name}`);
    } catch (error) {
      console.error("event insert failed", error);
      throw error;
    }
  }
};

const seedDatabase = async () => {
  try {
    await initializeDatabase();
    console.log("successfully initialized database");
    await seedVenues();
    console.log("successfully seeded venues");
    await seedEvents();
    console.log("successfully seeded events");
  } catch (error) {
    console.error("Error occurred", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

await seedDatabase();
