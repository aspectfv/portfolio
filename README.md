# Portfolio

Personal portfolio site for Joshua Tating; a single-page overview of projects, stack, and
experience, with a low-poly 3D scene as its visual signature.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- Three.js via React Three Fiber
- Vitest + Testing Library

## Development

Requires Node 22+ and pnpm.

```bash
pnpm install
pnpm dev          # dev server on http://localhost:5173
```

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start the dev server               |
| `pnpm build`     | Type-check and build to `dist/`    |
| `pnpm preview`   | Serve the production build locally |
| `pnpm typecheck` | Type-check without emitting        |
| `pnpm lint`      | Lint with ESLint                   |
| `pnpm format`    | Format with Prettier               |
| `pnpm test`      | Run the test suite                 |

## Structure

```
src/
├── content/     site content as typed data
├── sections/    one component per page section
├── components/  shared UI
├── scene/       all Three.js / R3F code
├── hooks/
└── styles/
```

Three.js is imported only inside `src/scene/`, enforced by an ESLint rule, so the 3D bundle
stays a separate lazily-loaded chunk and the page works without it.

## License

MIT; see [LICENSE](LICENSE).
