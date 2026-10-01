# Plan: Screen 03 — Movie search (freshness)

Date: 2026-10-01
Status: done

## Goal

Search via `GET /3/search/movie` that feels immediate and **never** shows results
for a query the user has already moved past.

## Out of scope

- Figma “submit → N Results Found” second page (conflicts with live-as-you-type).
- Tappable genre filters that hit `/discover` per tile.
- Behaviour automated tests (deferred by human direction 2026-10-01).

## Approach

- Data: `searchMovies` RTK Query endpoint keyed by **committed (debounced) query string**;
  `getGenres` for row subtitles; upcoming cache reused for idle genre tile images.
- Freshness: changing the hook arg switches the cache entry RTK Query reads —
  late responses for older queries cannot overwrite the current UI.
- UI: headerless search (Figma); idle = 2-column genre grid; typing = Top Results row list.
- Offline: prior searches remain in persisted cache by query key; empty query shows genres.

## Risks / open questions

- Genre tiles are decorative (title search ≠ genre filter).
- Debounce 400ms balances snappiness vs API spam.

## Done when

- [x] Debounced search with idle / loading / empty / error / results.
- [x] Freshness via per-query cache key.
- [x] Tap result → MovieDetail.
- [x] Layout matches Figma search frames (no stack header; genre idle grid).

---

## Revision history (leave unedited)

### v1 — initial

As above.
