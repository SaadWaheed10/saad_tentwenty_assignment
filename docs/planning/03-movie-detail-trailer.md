# Plan: Screen 02 — Movie detail + trailer

Date: 2026-10-01
Status: done

## Goal

Movie detail from `GET /3/movie/{id}`, videos from `/videos`, images from `/images`,
plus full-screen trailer playback that auto-returns to detail on end.

## Out of scope

- Real ticketing / payment.
- Dedicated gallery UI for every image (images used for hero backdrop selection).
- Guaranteeing silent-free autoplay on all YouTube trailers (platform limit).

## Approach

- Data: `getMovieDetail`, `getMovieVideos`, `getMovieImages` via RTK Query; cached per id.
- Trailer: `pickBestTrailer` → navigate to `TrailerPlayer` fullScreenModal with
  `react-native-youtube-iframe`; `onChangeState === 'ended'` → `goBack()`.
- UI: Figma detail frame (transparent header, backdrop scrim, gold title, genre chips,
  Get Tickets → SeatMapping, Watch Trailer).
- Offline: cached detail/videos/images serve on revisit; pull-to-refresh when online.

## Risks / open questions

- YouTube ad-monetized embeds often need one user tap before play (documented in TrailerPlayer).
- Backdrop preference: highest-voted `/images` backdrop, else `movie.backdrop_path`.

## Done when

- [x] Detail + videos + images wired.
- [x] Trailer full-screen; end / early exit return to detail.
- [x] Loading / error / missing-trailer states.
- [x] Get Tickets → seat map (UI only).

---

## Revision history (leave unedited)

### v1 — initial

As above.
