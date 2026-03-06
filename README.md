# Player API (`@draftkit/player-api`)

Player API for Fantasy Baseball Draft Kit

Seed behavior:

- Player seed data is loaded from:
  - `data/nl/2025-player-NL-stats.csv`
  - `data/nl/3Year-average-NL-stats.csv`
  - `data/nl/projections-NL.csv`
- `AUTO_SEED` is required (`true` or `false`).

## Public Endpoints

- `GET /v1/health` (public)
- `GET /v1/docs/openapi` (public)

## Licensed Endpoints (`x-api-key` required)

- `GET /v1/license/status`
- `GET /v1/players?limit=&leagueType=AL|NL|MIXED`
- `GET /v1/players/search?q=&includeDrafted=&limit=&leagueType=AL|NL|MIXED`
- `GET /v1/players/:playerId`
- `GET /v1/players/:playerId/transactions`
- `GET /v1/stats/league-averages`
- `GET /v1/stream/transactions` (SSE)

## Admin Endpoints (`x-admin-secret` required)

- `POST /v1/admin/data-refresh`
- `POST /v1/admin/mock-transaction`
