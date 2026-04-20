# NWS Tanker Admin Web

Web portal for NWS Tanker System administrators (Cluster Contractor, Nama Operations, Nama Leadership) — inspection review, permit issuance, tanker management, and fleet analytics.

## Prerequisites

- Node.js 22 LTS (see `.nvmrc`)
- pnpm 9.x

## Getting started

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env` and adjust `VITE_API_BASE_URL` to point at your local backend.

## Scripts

- `pnpm dev` — start Vite dev server
- `pnpm build` — typecheck and build for production
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build
- `pnpm test` — run Vitest

## Structure

Source lives under `src/` and is organized by concern: `components/` for UI, `hooks/` for reusable React hooks, `lib/` for utilities and framework-agnostic helpers, `pages/` for route-level screens, `types/` for shared TypeScript types, and `assets/` for static imports. Path alias `@/*` resolves to `./src/*`. Tailwind 3.4 and shadcn/ui (neutral base, CSS variables) are pre-wired; no components have been generated yet. The app also serves the public permit verification page at `verify.nws.om/permit/:number`.
