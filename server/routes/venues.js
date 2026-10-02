import express from "express";
import pool from "../data/config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM venues`);
    res.send(result.rows);
  } catch (error) {
    console.log("error fetching venues", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM venues WHERE id = $1`, [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).send("Venue not found");
    res.send(result.rows[0]);
  } catch (error) {
    console.log("error fetching venue", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
