# TenTwenty — Movie App (Take-home)

React Native + TypeScript app for the TenTwenty assignment: upcoming movies from TMDb → detail (with trailer) → search → seat map (UI only).

Built feature-by-feature with Cursor agents. Rules live in [`.cursor/rules/`](.cursor/rules/); planning notes in [`docs/planning/`](docs/planning/). See [`AGENTS.md`](AGENTS.md) for the agent brief.

## Screens

| # | Screen | API | Notes |
|---|--------|-----|--------|
| 01 | Movie list (Watch tab) | `GET /3/movie/upcoming` | Infinite scroll, pull-to-refresh, offline cache |
| 02 | Movie detail | `GET /3/movie/{id}`, `/videos`, `/images` | Full-screen trailer; Get Tickets → seat map |
| 03 | Movie search | `GET /3/search/movie` (+ genres list) | Debounced; results always match current query |
| 04 | Seat mapping | none | **UI only** — no booking, persistence, or payment |

## Stack

| Concern | Choice |
|---------|--------|
| React Native | 0.87, **New Architecture only** |
| Language | TypeScript (strict) |
| Navigation | React Navigation — bottom tabs + native stack |
| Client + server state | **Redux Toolkit + RTK Query** |
| Offline cache | `redux-persist` + `@react-native-async-storage/async-storage` |
| HTTP | Axios (custom RTK Query `baseQuery`) |
| Trailer | `react-native-youtube-iframe` (wraps `react-native-webview`) |
| Lists | `FlatList` (virtualized) |
| Images | RN `Image` + TMDb CDN URLs |

Final stack overrides (Redux over TanStack Query; AsyncStorage over MMKV) are documented in [`.cursor/rules/01-architecture.mdc`](.cursor/rules/01-architecture.mdc) and [`docs/planning/01-bootstrap-and-navigation.md`](docs/planning/01-bootstrap-and-navigation.md).

## Targets

- Android: `targetSdkVersion` / compile **36** (`minSdk` 24)
- iOS: **15.1+**
- Portrait **and** landscape (Flexbox layouts; seat grid resizes by width)

## Setup

### 1. Install

```sh
npm install
# iOS only (first time / after native dep changes):
bundle install && bundle exec pod install
```

### 2. TMDb API key (required)

Copy the example env and add your own key from [TMDb API settings](https://www.themoviedb.org/settings/api):

```sh
cp .env.example .env
```

`.env` (gitignored — **never commit**):

```env
TMDB_API_KEY=your_tmdb_v3_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

Keys are injected at build time via `react-native-dotenv` (`@env`). Do not put secrets in source or AsyncStorage.

### 3. Run

```sh
# Metro
npm start

# Android (device/emulator)
npm run android

# iOS
npm run ios
```

Physical Android USB device: `adb reverse tcp:8081 tcp:8081` if Metro is on the host.

## Offline-first

- RTK Query cache is **persisted** across restarts (`redux-persist` + AsyncStorage).
- `setupListeners` enables **refetchOnFocus** / **refetchOnReconnect**.
- Upcoming list / detail / videos / images: show cached data immediately when available; revalidate when online.
- Search is keyed by the **current query string** so stale responses for older queries never overwrite the UI (freshness > long-lived search cache).
- List shows a compact banner when showing saved results after a failed refresh.

Details: [`.cursor/rules/03-offline-data.mdc`](.cursor/rules/03-offline-data.mdc) and the per-screen planning notes under `docs/planning/`.

## Trailer behaviour

- Full-screen modal; attempts autoplay; closes on video `ended` or user close / system back.
- **Known platform limit:** ad-monetized YouTube trailers often require one real tap before play (Google autoplay/ad policy). Documented in `TrailerPlayerScreen`. Non-monetized videos can autoplay.

## Seat mapping

UI-only static grid (VIP / Regular / unavailable / selected). Selection is local React state — discarded on leave. **No** booking API, payment, or persistence.

## Project layout

```text
src/
  api/           # axios client, baseQuery, image URL helper
  components/    # shared UI + tab/header chrome
  hooks/
  navigation/    # AppNavigator, param lists
  screens/       # MovieList, MovieDetail, MovieSearch, SeatMapping, TrailerPlayer
  store/         # Redux store, RTK Query APIs, uiSlice
  theme/
  types/
  utils/
docs/planning/   # slice plans (leave prior versions unedited)
.cursor/rules/   # agent / assignment rules
```

Each screen keeps styles in a sibling `style.tsx`.

## Scripts

```sh
npm start          # Metro
npm run android
npm run ios
npm run lint
npx tsc --noEmit
npm test           # Jest (behaviour suite deferred; config allows empty)
```

## Known follow-ups / approximations

- **Poppins** is referenced in theme tokens but font files are not bundled yet (system fallback).
- Search idle genre tiles reuse cached upcoming backdrops (decorative, not tappable genre filters).
- Figma date/showtime step before seats is omitted; Get Tickets goes straight to the seat map.
- No dedicated image-cache native module (plain `Image`).

## Design reference

Figma: [Tentwenty — App Test](https://www.figma.com/design/4e1pQ2l0VkLNgnaV7xNlFW/Tentwenty---App-Test?node-id=21-234)

Exported reference frames: `docs/planning/figma-refs/`.
