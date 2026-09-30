# TenTwenty — Agent Brief

React Native + TypeScript app: upcoming movies from TMDb → detail (with trailer) → search → seat map (UI only).

## Design reference

Figma: https://www.figma.com/design/4e1pQ2l0VkLNgnaV7xNlFW/Tentwenty---App-Test?node-id=21-234&p=f

No Figma MCP/integration is connected yet, so specs (spacing, colors, exact layout) must be read directly from
the Figma file by a human, or via a Figma MCP server once connected. Until then, treat "pixel-precise" as
best-effort against this reference and flag anything inferred rather than measured.

## Screens

1. **Movie list** — `GET /3/movie/upcoming`. Fast, scalable list. Offline-capable.
2. **Movie detail** — `GET /3/movie/{id}`, `/videos`, `/images`. Full-screen autoplay trailer; ends or exits → back to detail.
3. **Movie search** — `GET /3/search/movie`. Immediate; results always match the **current** query (no stale results).
4. **Seat mapping** — UI only. No booking, persistence, or payment.

## Stack constraints

- React Native current release, **TypeScript mandatory**
- **New Architecture** only
- Android API 36, iOS 15+, portrait + landscape
- Functional components + hooks, typed, clean architecture of choice
- Offline-first; designed loading / empty / error states; meaningful tests

## Process

- Build **feature by feature**. Commit each slice.
- Keep `.cursor/rules/` and planning notes in the repo.
- API key via env/config only — never commit secrets.
- TMDb base: `https://api.themoviedb.org/3` · images: `https://image.tmdb.org/t/p/{size}/{file_path}`

## Steering

The human leads. Agents implement one agreed slice at a time and stop for review.
