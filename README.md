# Node.js Mandatory 2 — Auth

A full-stack authentication application. The Svelte client is built and served statically by the Express server, so only one process runs in production.

## Structure

```
/
├── client/   # Svelte 5 frontend (Vite)
└── server/   # Express 5 backend (SQLite, sessions)
```

## Quick Start

```bash
# First time — installs dependencies, builds client, starts server
npm run setup
```

The app runs on [http://localhost:8080](http://localhost:8080).

## Scripts

| Command | Description |
|---|---|
| `npm run setup` | Install dependencies and build client (first time) |
| `npm run install:all` | Install dependencies for client, server, and root |
| `npm run build:client` | Build the Svelte client into `client/dist/` |
| `npm run start:dev` | Start the Express server on port 8080 |
| `npm run start:prod` | Start the Express server on port 80 |
| `npm run lint` | Run ESLint on both client and server |
| `npm run format` | Run Prettier on both client and server |

## Environment Variables

Create `server/.env` — see [server/README.md](server/README.md) for details.
