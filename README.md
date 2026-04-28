# Water Main Canada

Programmatic SEO site for `watermaincanada.com`.

## Route Model
- Home: `/`
- Services: `/services`
- Landing pages: `/{service-slug}-{city}`

The 240 generated landing pages come from `lib/watermain-data.ts`, which was generated from `pseo_watermaincanada (1).xlsx`.

## Content Rules
- One primary keyword target per landing page.
- Copy should speak to the visitor's symptoms and next steps.
- Metadata, FAQ schema, Service schema, LocalBusiness schema, and breadcrumbs are generated for each landing page.

## Commands
```bash
npm run lint
npm run build
npm run dev
```
