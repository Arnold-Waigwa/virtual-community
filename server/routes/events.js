import express from "express";
import pool from "../data/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM events where venue_id = $1`,
      [req.query.venue],
    );
    res.send(result.rows);
  } catch (error) {
    console.log("error fetching event");
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
