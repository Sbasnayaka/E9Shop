# E9 Shop Front-end

Mobile-first HTML/CSS/JS for the E9 Shop Figma screens (Home, All Services, Join form, Thank You). Uses semantic HTML, a small CSS token system, and light JS for menu + form.

## Run locally

Prerequisite: Node 18+.

```bash
npm run dev
```

This serves the site at `http://localhost:4173`. Open `index.html` in your browser.

## What’s inside

- `index.html` — Home with header, hero banner, services grid, related topics, bottom nav, and slide-in join form.
- `all-services.html` — Vertical list of service cards with “read more” links.
- `user-info.html` — Standalone join form (Name, Mobile, Country).
- `thank-you.html` — Brief confirmation screen that redirects home.
- `styles.css` — All styling, tokens, layout, drawer, and forms.
- `script.js` — Drawer toggle and form submission redirect.
- `assets/` — Logo, service images, hero art, icon, QR placeholder.
- `package.json` — Dev server script.

## Notes

- Mobile-first layout with capped app width for consistency.
- Drawer opens the join form directly; Escape or outside click closes it.
- Tap targets meet 44px guidance; focus states are visible.
- Colors and radii follow the provided design tokens.


