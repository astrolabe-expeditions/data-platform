# Copilot Instructions for Data Platform

## Project Overview
- This is a React + TypeScript web application for managing and centralizing data from citizen science expeditions (Astrolabe Expeditions).
- Uses Vite for development/build, MUI for UI, Refine for app framework, Supabase for backend/auth, and i18next for localization.

## Key Architecture & Patterns
- **Entry point:** `src/app.tsx` wraps the app in `AppProvider` and `AppRouter`.
- **Providers:** `src/core/components/app-provider.tsx` sets up Refine, MUI theme, Supabase, i18n, and notification providers.
- **Routing:** `src/core/components/app-router.tsx` defines routes using Refine's `Authenticated` wrapper and React Router. Auth pages and main app routes are separated.
- **Resource pattern:** Refine `resources` are declared in `AppProvider` (e.g., `stations`). Each resource has list/show/edit/create routes and pages under `src/[resource]/pages/`.
- **Supabase integration:** Configured in `src/core/utils/supabase-client.ts`. Auth logic in `src/auth/providers/auth-provider.ts`.
- **i18n:** Configured in `src/core/utils/i18n.ts`, with translation files in `public/locales/`.
- **Path aliases:** `@/` maps to `src/` (see `vite.config.ts` and `tsconfig.json`).

## Developer Workflows
- **Start dev server:** `yarn dev`
- **Build:** `yarn build`
- **Format code:** `yarn format` (uses Biome)
- **Lint:** `yarn lint` (uses Biome)
- **Supabase local dev:** `yarn supabase start` (see `supabase/` for config/migrations)
- **Preview build:** `yarn preview`

## Conventions & Tips
- Use functional React components and hooks.
- Use Refine's resource and provider patterns for new features.
- Place new resource pages in `src/[resource]/pages/`.
- Use i18n for all user-facing text. Add translations to `public/locales/en.json` and `fr.json`.
- Use path aliases (`@/`) for imports from `src/`.
- Use Biome for formatting and linting (see `biome.json`).
- Supabase schema and migrations are in `supabase/`.

## Key Files & Directories
- `src/app.tsx`, `src/core/components/app-provider.tsx`, `src/core/components/app-router.tsx`
- `src/core/utils/supabase-client.ts`, `src/core/utils/i18n.ts`
- `src/auth/providers/auth-provider.ts`
- `public/locales/`
- `supabase/`

---
For questions about project structure or patterns, check the files above for examples. Follow existing conventions for new features. If unsure, ask for clarification or review similar code in the codebase.
