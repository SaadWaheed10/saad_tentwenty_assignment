# Plan: Screen 01 — Upcoming movie list

Date: 2026-10-01
Status: done

## Goal

Watch tab list of upcoming movies from `GET /3/movie/upcoming`, offline-first,
with loading / empty / error / stale-cache states and navigation to detail + search.

## Out of scope

- Search UI (Screen 03), detail content (Screen 02), seat map (Screen 04).
- FlashList (FlatList is enough for v1).
- Bundling Poppins font files.

## Approach

- Data: RTK Query `getUpcomingMovies` infinite query; pages appended on scroll;
  cache persisted via redux-persist.
- UI: full-width backdrop cards (`MovieListItem`), pull-to-refresh, stale banner
  when refetch fails but cache exists.
- Navigation: nested under bottom-tabs `Watch`; stack siblings for Detail / Search.
- Offline: show last cached pages immediately; refetch on focus/reconnect.

## Risks / open questions

- Header title "Watch" and search icon sized against Figma; search asset has baked-in padding.
- Grey list background was tightened to white to remove a visual gap under the header.

## Done when

- [x] Upcoming list loads and paginates.
- [x] Cache survives restart; stale indicator when refresh fails.
- [x] Loading / empty / error states.
- [x] Tap → MovieDetail; header search → MovieSearch.

---

## Revision history (leave unedited)

### v1 — initial

As above.
