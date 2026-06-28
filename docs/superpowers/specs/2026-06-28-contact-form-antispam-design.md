# Contact Form Anti-Spam Design

## Problem

The contact form at `/contact` receives automated bot spam. Currently the only protection is Zod schema validation (field types/lengths). No honeypot, no timing check, no rate limiting.

## Solution: Invisible Multi-Layer Defense

Three invisible server-validated checks layered before the existing logic. Zero friction for real users.

### Layer 1: Honeypot Field

A hidden input named `website` rendered in the DOM but invisible to users via `sr-only` + `aria-hidden` + `tabIndex={-1}` + `autoComplete="off"`. Bots fill every field they find — if `website` has a value, silently reject by returning `{ success: true }`.

### Layer 2: Time-Based Check

Record `Date.now()` when the form component mounts. Pass it as a hidden field `_t`. On the server, if `Date.now() - _t < 3000ms`, silently reject. No human completes a 4-field contact form in under 3 seconds.

### Layer 3: Server-Side Rate Limiting

In-memory `Map<string, { count: number; resetAt: number }>` keyed by IP (`headers().get('x-forwarded-for')` or `headers().get('x-real-ip')`). Max 3 submissions per IP per rolling 1-hour window. Stale entries cleaned up on each request. Returns a visible error ("Too many submissions. Please try again later.") since a real user hitting this limit should know to wait.

## Files Changed

### `src/app/contact/page.tsx`

- Add `mountTime` ref set to `Date.now()` on mount
- Add hidden honeypot input: `<input name="website" ... />`
- Add hidden timestamp input: `<input name="_t" ... />`
- Pass `website` and `_t` fields in the submitted data

### `src/actions/contact.ts`

- Extend Zod schema with optional `website` (string) and `_t` (number)
- Add rate-limit Map + cleanup at module scope
- Check order before existing logic:
  1. Honeypot filled → `{ success: true }` (silent)
  2. Timing < 3s → `{ success: true }` (silent)
  3. Rate limit exceeded → `{ success: false, error: "Too many submissions..." }`
  4. Existing validation + DB insert + email notification

## Design Decisions

- **Silent success for honeypot/timing**: Returning success prevents bots from adapting their strategy.
- **Visible error for rate limit**: A real user hitting 3/hour should know what happened.
- **In-memory rate limit**: Resets on cold start, which is acceptable — bots hit warm instances rapidly. No external dependency needed.
- **No CAPTCHA**: Automated bots are the target. These three layers handle 95%+ of bot traffic without user friction. CAPTCHA can be added later if needed.
- **Contact form only**: Newsletter and assessment forms are not currently receiving spam. Protection can be extended to them later using the same pattern.
