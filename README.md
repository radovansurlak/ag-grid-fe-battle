# FE Battle: React vs Vue vs Svelte + AG Grid

This repo compares rendering performance across the latest React, Vue 3, and Svelte using the same AG Grid configuration and the same mock data.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev:react
npm run dev:vue
npm run dev:svelte
```

Each app renders 100 tables with 30 columns and 500 rows per table.

Note: `ag-grid-svelte` currently supports Svelte 3 and AG Grid 30.x. The React and Vue apps are pinned to AG Grid 30.2.1 to keep the comparison consistent across frameworks.

## Adjust the load

Update constants in `packages/mock-data/src/index.js`:

- `TABLE_COUNT`
- `ROW_COUNT`

Column definitions are already expanded to 30 columns to mirror the heavier target scenario.
# ag-grid-fe-battle
