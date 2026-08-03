# Waste-Watch Backend

## Setup

1. Copy `.env.example` to `.env` and fill in real values (especially `JWT_SECRET`).
2. Make sure MongoDB is running locally, or set `MONGO_URI` to an Atlas connection string.
3. Install dependencies:
   ```
   npm install
   ```
4. Seed the database with an admin and collector account + sample bins:
   ```
   npm run seed
   ```
5. Start the server:
   ```
   npm run dev
   ```

## Default seeded accounts
- Admin: `admin@wastewatch.co.ke` / `admin1234`
- Collector: `collector@wastewatch.co.ke` / `collector1234`

Citizens don't need accounts — bin reports are submitted anonymously via `POST /api/reports`.

## API overview
- `POST /api/auth/login`
- `POST /api/auth/register` (admin only)
- `GET /api/auth/me`
- `GET/POST/PUT/DELETE /api/bins`
- `PATCH /api/bins/:id/fill-level`
- `POST /api/reports` (public)
- `GET /api/reports`, `PATCH /api/reports/:id`, `PATCH /api/reports/:id/collect`
- `GET/POST /api/alerts`, `PATCH /api/alerts/:id/resolve`
- `GET/PATCH/DELETE /api/users` (admin only)
