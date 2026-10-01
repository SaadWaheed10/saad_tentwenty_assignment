# Plan: Screen 04 — Seat mapping (UI only)

Date: 2026-10-01
Status: done

## Goal

Seat selection UI matching Figma seat-map colours/legend/footer. **No** booking,
persistence, payment, or network.

## Out of scope

- Date / showtime picker screen (Figma step before seats).
- Real inventory or payment.
- Zoom controls (optional polish).

## Approach

- Data: static `seatData.ts` (VIP / Regular rows, fixed unavailable seats, fake prices).
- UI: screen indicator, responsive seat sizing via `useWindowDimensions`, legend,
  selection chip, Total Price + Proceed to pay (disabled with no selection; CTA is a dead end).
- Safe area: footer `paddingBottom` uses insets (+ 48dp floor) so it clears 3-button Android nav
  under edge-to-edge.
- Offline: N/A (no network).

## Risks / open questions

- Proceed to pay intentionally does nothing (assignment forbids booking).
- Selection is lost on navigate-away by design (no persistence).

## Done when

- [x] Grid with available / selected / unavailable / VIP / Regular.
- [x] Toggle selection; summary + total price.
- [x] Portrait + landscape width-based seat size.
- [x] Footer clears system navigation buttons.

---

## Revision history (leave unedited)

### v1 — initial

As above.
