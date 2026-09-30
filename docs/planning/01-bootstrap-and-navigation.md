# Plan: Bootstrap — theme, providers, navigation shell

Date: 2026-09-30
Status: draft

## Goal

Replace the generic placeholder app (Home/Details, Context-only store) with the real
project skeleton for the TenTwenty assignment:

- Theme tokens (color, type, spacing) seeded from the actual Figma file
  (`Tentwenty : App Test`, node 21:234).
- Offline-first data layer wiring — see v2 below for the actual mechanism.
- Navigation shell with the 4 real screens as stubs: Movie List, Movie Detail,
  Movie Search, Seat Mapping.
- Shared UI state components (`LoadingView`, `EmptyState`, `ErrorView`) that every
  future screen slice will reuse.
- TMDb API key read from env via `react-native-dotenv` (babel-only, no native
  linking needed) — never committed.

**Superseded by v2** for the state-management/caching mechanism — see revision
history at the bottom. Kept here unedited per process rules.

## Out of scope

- Any real TMDb network calls (upcoming list, detail, videos, images, search).
- Real screen UI/content beyond a stub proving navigation + providers work.
- Seat map grid UI (that's its own slice, UI-only, no data).
- Pixel-perfect layout matching for any single screen (each screen slice will
  re-fetch its specific Figma node and match it then).

## Approach

- Data:
  - `src/api/tmdbClient.ts` — base fetch wrapper only (base URL, api key injection,
    error mapping). No endpoint functions yet (added per-screen slice).
  - `src/storage/mmkv.ts` — single MMKV instance for cache + query persistence.
  - `src/api/queryClient.ts` — `QueryClient` + `createSyncStoragePersister` backed
    by MMKV, wired via `PersistQueryClientProvider`.
  - `.env.example` documents `TMDB_API_KEY`; real `.env` is gitignored.
- UI states:
  - `src/components/common/LoadingView.tsx`, `EmptyState.tsx`, `ErrorView.tsx` —
    generic, reusable, theme-driven. Screens compose these; no per-screen
    reinvention.
- Navigation:
  - Stack: `MovieList` (initial) → `MovieDetail` → `SeatMapping`.
  - `MovieList` → `MovieSearch` → `MovieDetail` (search result taps into the same
    detail screen).
  - Old `HomeScreen` / `DetailsScreen` removed.
- Offline:
  - Query cache persisted to MMKV via `@tanstack/query-sync-storage-persister`.
  - Per-resource `staleTime` / `gcTime` tuning happens in the slice that adds that
    resource's query (list/detail/search), not here — this slice only wires the
    plumbing.

## Risks / open questions

- Poppins is the Figma type family but isn't bundled yet (no `.ttf` files sourced
  from Figma/Google Fonts in this slice). Typography tokens reference
  `Poppins-Regular` / `-Medium` / `-SemiBold` / `-Bold` by name now; falls back to
  system font until the font files are added in a follow-up slice.
- `react-native-mmkv` is a native module — needs a Pod install on iOS before the
  app builds/runs there. Not run in this slice (no Mac build step requested yet);
  flagged in README/next steps.

## Done when

- [x] Theme reflects real Figma colors/type/radii.
- [x] TanStack Query + MMKV persister wired at app root.
- [x] 4 real screens exist and are reachable via navigation.
- [x] Shared Loading/Empty/Error components exist and compile.
- [x] `tsc`, `eslint`, `jest` all pass.
- [x] TMDb key documented as env-only, `.env` gitignored.

---

## Revision history (leave unedited)

### v1 — initial

As above (TanStack Query + MMKV persister as the offline/caching mechanism).

### v2 — changed because human chose Redux Toolkit for state management

While confirming the caching approach in chat, the human asked why TanStack
Query was being installed at all — it turned out to be this rules-folder's
*default*, not an actual assignment requirement. The human then directed:
**use Redux Toolkit for state management**, and on follow-up, confirmed **RTK
Query should also own server data + offline caching** (one state system
instead of two).

Revised approach:

- Data:
  - `src/store/api/tmdbApi.ts` — RTK Query base `createApi` slice for TMDb.
    `baseUrl` + api-key injection via `prepareHeaders`/params. **No endpoints
    yet** — each future screen slice injects its own endpoints via
    `tmdbApi.injectEndpoints()` (list slice adds `getUpcoming`, detail slice
    adds `getMovie`/`getVideos`/`getImages`, search slice adds
    `searchMovies`). Keeps this slice's diff small and future slices additive.
  - `src/storage/mmkv.ts` — MMKV instance, used as the `redux-persist` storage
    engine (wrapped to satisfy its async-shaped storage interface).
  - `src/store/store.ts` — `configureStore` combining `tmdbApi.reducer` +
    `uiSlice`, wrapped in `persistReducer` (MMKV engine), with
    `setupListeners(store.dispatch)` for RTK Query's `refetchOnFocus` /
    `refetchOnReconnect`.
  - `src/store/slices/uiSlice.ts` — replaces the old Context-based
    `AppProvider` for client UI state.
  - `src/store/StoreProvider.tsx` — `<Provider>` + `<PersistGate>` wrapper,
    used once in `App.tsx`.
- Everything else (UI states, navigation, out-of-scope items, risks) is
  unchanged from v1.

### Revised "done when"

- [x] Theme reflects real Figma colors/type/radii.
- [x] Redux Toolkit store + RTK Query base slice + redux-persist(MMKV) wired at
      app root.
- [x] 4 real screens exist and are reachable via navigation.
- [x] Shared Loading/Empty/Error components exist and compile.
- [x] `tsc`, `eslint`, `jest` all pass.
- [x] TMDb key documented as env-only, `.env` gitignored.
