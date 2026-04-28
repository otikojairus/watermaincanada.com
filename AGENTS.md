# Water Main Canada Working Guide

## Purpose
This repository is a programmatic SEO Next.js site for Water Main Canada. It generates city-and-service landing pages for sewer backups, sewage cleanup, drain cleaning, sewer line repair, water main repair, water line repair, water main replacement, and leak detection.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Shared global styling in `app/globals.css`

## Routing Model
- Home page: `app/page.tsx`
- Service index: `app/services/page.tsx`
- Dynamic pSEO pages: `app/[slug]/page.tsx`

## Source Of Truth
- Spreadsheet-derived page data lives in `lib/watermain-data.ts`.
- Core SEO helpers live in `lib/seo.ts`.

## SEO Content Rules
- Use one primary keyword target per landing page.
- Write to the visitor first: symptoms, safety, inspection, repair path, and next steps.
- Do not stuff secondary keywords into repeated lists or paragraphs.
- Keep claims practical and credible.
- Preserve local context from each spreadsheet row.

## UI Rules
- Use the `wmc-*` design language in `app/globals.css`.
- Keep sections clean, direct, and service-oriented.
- Keep new pages on the `wmc-*` design system.
