# Avalora Sales Desk

Internal mobile-friendly sales execution app for Avalora outreach, live call handling, search, and scratchpad notes.

## Stack

- Framework: React + TypeScript + Vite
- Package manager: npm

## Commands

- Install: `npm ci`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: not configured as a standalone script
- Test: not configured
- Build: `npm run build`
- Preview: `npm run preview`

## Vercel note

This is a client-side Vite SPA. [vercel.json](./vercel.json) adds the rewrite needed for direct-route refreshes to return `index.html`.

## Persistence behavior

- Frameworks, search data, and live flows are static in-repo content.
- Notes are local browser scratchpad data only.
- Notes can be copied into the Google Sheet tracker, but the app does not write to Google Sheets directly.
