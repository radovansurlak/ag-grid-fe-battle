# FE Battle: React vs Vue vs Svelte + AG Grid

This repo compares rendering performance across the latest React, Vue 3, and Svelte using the same AG Grid configuration and the same mock data.

## Setup

```bash
npm install
```

## Run

```bash
npm run start
```

Each app renders 100 tables with 30 columns and 500 rows per table.

## Adjust the load

Update constants in `packages/mock-data/src/index.js`:

- `TABLE_COUNT`
- `ROW_COUNT`

Column definitions are already expanded to 30 columns to mirror the heavier target scenario.
# ag-grid-fe-battle
