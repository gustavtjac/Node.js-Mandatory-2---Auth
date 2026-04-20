# Server

Express 5 backend. Handles authentication, sessions, and serves the built Svelte client in production.

## Tech Stack

- [Express 5](https://expressjs.com)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — fast, synchronous SQLite driver
- [express-session](https://github.com/expressjs/session) — server-side sessions
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — password hashing
- [Helmet](https://helmetjs.github.io) — security headers
- [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) — rate limiting
- [Pino](https://getpino.io) — structured logging (console + `logs/app.log`)
- [Resend](https://resend.com) — transactional email on registration

## API Endpoints

| Method | Path             | Auth required | Description                 |
| ------ | ---------------- | ------------- | --------------------------- |
| `POST` | `/auth/register` | No            | Register a new user         |
| `POST` | `/auth/login`    | No            | Log in, starts a session    |
| `POST` | `/auth/logout`   | Yes           | Destroy the current session |
| `GET`  | `/auth/me`       | Yes           | Return the session user     |

Auth-required endpoints use the `isLoggedIn` middleware (`middleware/authMiddleWare.js`), which returns `401` if no session exists.

## Rate Limiting

- `/auth/*` — 10 requests per 15 minutes per IP
- All other routes — 50 requests per 15 minutes per IP

## Database

SQLite file at `mandatory.db`. Schema is managed in `database/database.js`.

```bash
npm run database:update   # Create tables (non-destructive)
npm run database:create   # Drop and recreate tables, seed admin user
```

The admin user is seeded with the username `admin` and the password from `ADMIN_PASSWORD` env var.

## Environment Variables

Create a `.env` file in this directory:

```
SESSION_SECRET=your_secret_here
RESEND_API_KEY=your_resend_api_key
ADMIN_PASSWORD=your_admin_password
PORT=8080
```

| Variable         | Required | Default | Description                             |
| ---------------- | -------- | ------- | --------------------------------------- |
| `SESSION_SECRET` | Yes      | —       | Secret used to sign session cookies     |
| `RESEND_API_KEY` | Yes      | —       | API key for sending registration emails |
| `ADMIN_PASSWORD` | No       | `admin` | Password for the seeded admin user      |
| `PORT`           | No       | `8080`  | Port the server listens on              |

## Scripts

```bash
npm run start-dev        # Start server in dev mode (port 8080)
npm run start-prod       # Start server in prod mode (port 80)
npm run database:update  # Run migrations (create tables if not exist)
npm run database:create  # Reset and seed database
npm run lint             # Run ESLint
```

> Run `npm run format` from the project root to format all files with Prettier.
