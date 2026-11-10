# Sainte Marie Pâtisserie Boulangerie

Responsive bakery website built from the supplied Sainte Marie catalog using the
React, TypeScript, Vite, React Router, and GitHub Pages scaffolding from
`../mercato-demo`.

## Run locally

```sh
npm ci
npm run dev
```

- `npm run build`: client production build.
- `npm run generate`: production build with nine pre-rendered pages.
- `npm run preview`: serve the production build.
- `npx tsc --noEmit`: TypeScript check.

## Design

Cookie headings and Lato body text are self-hosted through Fontsource. Lucide React
provides the food and navigation icons. The palette uses warm ivory, peach,
terracotta, and cocoa.

## Content

The homepage, About page, and six catalog categories use supplied product names,
photographs, business history, address, and telephone number. All 53 catalog
entries are in `src/data/catalog.ts`. Each category has a searchable product grid.
Calls and directions link to the supplied bakery phone number and address.
Special orders are enquiries by telephone; there is no checkout or order backend.

The catalog's missing chicken-with-cream-sauce photograph is intentionally
represented by a text panel. No prices, business hours, or social account URLs
were supplied, so those have not been invented. Product images are JPEG extracts
of the supplied catalog pages, in `public/images`. The original PNGs are unchanged.

## GitHub Pages

`.github/workflows/static.yml` preserves Mercato's pinned Actions, Node setup,
Pages base path, artifact upload, and deployment steps. It generates all pages
and adds an SPA fallback. Push this project to the intended GitHub repository's
`main` branch and select **GitHub Actions** as its Pages source.

`BASE_PATH` supports repository subdirectories and defaults to `/`. Test with:

```sh
BASE_PATH=/st-marie/ npm run generate
```

The site retains the source scaffold's `noindex, nofollow` metadata for this
unpublished concept. Remove it in `index.html` when ready for public indexing.
No GitHub repository or deployment has been created by this local implementation.
