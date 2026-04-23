# ER CareView — Staff Directory

A full stack staff directory search feature built for the CareView technical assessment, extended with a real PostgreSQL database, dynamic filtering, and a saved staff (on-call list) feature.

## Prerequisites

- Node.js
- Docker Desktop

## Environment Variables

Copy `.env.example` to `.env` before running:

```bash
cp .env.example .env
```

The default values match the Docker setup and work out of the box.

## Getting Started

**1. Start the database:**
```bash
docker compose up -d
```

**2. Install dependencies:**
```bash
npm install
```

**3. Generate Prisma client:**
```bash
npx prisma generate
```

**4. Run migrations:**
```bash
npx prisma migrate dev
```

**5. Seed the database:**
```bash
npx prisma db seed
```

**6. Start the dev server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects automatically to the Staff Directory.

## Running Tests

```bash
npm run test:run
```

## Features

### Staff Directory Search
Search for staff by name, role, or department with a debounced search input and real-time results from a PostgreSQL database.

### Department and Availability Filters
Filter staff by department or availability status independently or combined with the search input. Filters are applied dynamically at the database level using Prisma's query builder.

### On-Call List
Save staff members to a personal on-call list for quick access. The list persists in the database and is accessible from any device. Staff can be added or removed with a single click.

## API Endpoints
- GET    /api/staff?search=&department=&availability=   Search staff with optional filters
- GET    /api/saved-staff                               Get saved on-call list
- POST   /api/saved-staff                               Save a staff member { staffId }
- DELETE /api/saved-staff/:id                           Remove from saved list

## Technical Decisions

### PostgreSQL with Docker and Prisma
Replaced mock data with a real PostgreSQL database running in Docker. Prisma is used as the ORM — it generates TypeScript types directly from the schema, gives us type safe database queries, and keeps a full migration history. Docker ensures the database environment is reproducible with a single command.

### Zod as single source of truth
Zod schemas in `lib/schemas/staff.ts` define the data shape once. TypeScript types are derived with `z.infer` so the API and frontend share the same definitions and cannot drift apart silently.

### Debouncing the query key
The search input updates on every keystroke for responsiveness, but the TanStack Query key only changes after 300ms of inactivity. Fetches only fire when the user stops typing — not on every keypress.

### Dynamic query building with Prisma
The search endpoint accepts three optional filter parameters — search term, department, and availability. The Prisma query is built dynamically — filters are only applied when parameters are present, avoiding unnecessary constraints on the query.

### useMutation with cache invalidation
The save and remove operations use TanStack Query's `useMutation`. On success the saved staff cache is invalidated automatically — the UI stays in sync with the database without manual state management.

### Prisma client singleton
A single PrismaClient instance is shared across the application via `globalThis`. This prevents connection pool exhaustion during Next.js hot module reloads in development.

## Database Schema
### Staff
- id           UUID (primary key)
- firstName    String
- lastName     String
- role         String
- department   String
- email        String (unique)
- phone        String
- availability Enum (available, busy, off_duty)
- createdAt    DateTime

### SavedStaff
- id        UUID (primary key)
- staffId   UUID (foreign key → Staff, cascade delete)
- createdAt DateTime
- Unique constraint on staffId — prevents duplicate saves

## What I'd Add With More Time
- Dynamic department list fetched from the database rather than hardcoded on the frontend
- URL-based search state for shareable filtered results
- Authentication — JWT tokens with Next.js middleware protecting routes
- Pagination for large staff lists