import express from "express";
import pool from "../data/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = `
      SELECT events.*, venues.name AS venue_name, venues.location
      FROM events
      JOIN venues ON events.venue_id = venues.id
    `;
    const values = [];

    if (req.query.venue) {
      query += " WHERE events.venue_id = $1";
      values.push(req.query.venue);
    }

    query += " ORDER BY events.date";
    const result = await pool.query(query, values);
    res.send(result.rows);
  } catch (error) {
    console.log("error fetching event");
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
