# Hubert de Tournay — Portfolio

Source code of [de-tournay.fr](https://de-tournay.fr), my portfolio

## Stack

- React 19 with React Router, built with Vite
- Every page is prerendered to static HTML at build time, then hydrated in the browser
- D3 for the interactive skills and certifications graphs
- Contact form through EmailJS (no back end of my own)
- Hosted on GitHub Pages, deployed by GitHub Actions

## Run locally

Requires Node 22.12 or later (see `.nvmrc`).

```bash
npm ci
npm run dev
```

The contact form needs a `.env` file with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` and `VITE_EMAILJS_PUBLIC_KEY`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run lint` | ESLint |
| `npm test` | Vitest, including a hydration check of every prerendered page |
| `npm run build` | Production build into `build/` |
| `npm run preview` | Serves the production build locally |
| `npm run check` | Lint, test and build, as CI does |

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`: install, lint, test, build, then deploy to GitHub Pages. Pull requests are built and tested but not deployed. The EmailJS values come from repository secrets.