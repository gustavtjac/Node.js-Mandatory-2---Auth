# Client

Svelte 5 frontend built with Vite. Handles user registration, login, and a protected dashboard.

## Pages & Routes

| Path | Component | Access |
|---|---|---|
| `/` | `Landing` | Public |
| `/login` | `Auth` (login view) | Guests only |
| `/register` | `Auth` (register view) | Guests only |
| `/dashboard` | `Home` | Authenticated only |

Route access is enforced by `RouteGuard`, which redirects based on session state from the `user` store.

## State

`userStore.js` holds two writable stores:

- `user` — the current session user, or `null`
- `authReady` — `true` once the initial `/auth/me` check has resolved

`checkAuth()` is called on app mount and populates these stores.

## Tech Stack

- [Svelte 5](https://svelte.dev)
- [Vite](https://vitejs.dev)
- [svelte-routing](https://github.com/EmilTholin/svelte-routing) — client-side routing
- [svelte-sonner](https://github.com/wobsoriano/svelte-sonner) — toast notifications

## Scripts

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production → dist/
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Environment Variables

Create a `.env` file in this directory if you need to override the API base URL or similar. See `.env.example` for reference.
