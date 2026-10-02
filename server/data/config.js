import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import pg from "pg";

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
};

export default new pg.Pool(config);
