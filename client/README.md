# City Events

A simple React app for browsing local events. The home page lists cities and lets you search by location. Clicking a city shows events from its venues.

## Run locally

Install dependencies with `npm install` in both `client` and `server`.

Start the API with `npm start` in `server`, then start the frontend with `npm run dev` in `client`. The API uses the PostgreSQL connection configured in `server/data/config.js`.

Vite forwards `/venues` and `/events` requests to the API on port 3000.

## Checks

From `client`, run:

- `npm run lint` to check the code.
- `npm run build` to create a production build.

Photo sources are listed in [public/images/README.md](public/images/README.md).
