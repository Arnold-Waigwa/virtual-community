import "dotenv/config";
import express from "express";
import cors from "cors";
import venuesRouter from "./routes/venues.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/venues", venuesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
