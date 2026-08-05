# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint over the project

There is no test suite configured in this repo.

## What this is

RL FIT Discovery Quiz — a single-page lead-gen quiz for an Amway/Nutrilite reseller (Catonsville, MD). Visitors pick a priority, answer at most one branching question, and land on a recommended product "box" with a lead-capture form. It's a static React/Vite site intended for deployment on Netlify (the form uses Netlify Forms, see below).

## Architecture

Nearly the entire app lives in `src/App.jsx` as one component with local `useState`. There is no router, no component library, and no backend — all state (`path`, `step`, `scores`, `submitted`, `name`, `contact`) is in-memory for the current session.

Flow through `App.jsx`:
1. **Path selection** — user picks one of the four entries in the `paths` array (`fitness`, `health`, `routine`, `moms`).
2. **Branching questions** — `fitness` and `health` skip straight to a result; `routine` and `moms` each have one question (defined in the `questions` object) whose answer increments a `weight` key in `scores`.
3. **Winning box resolution** — a plain if/else chain right in the component body maps `path` (+ `scores` for the two branching paths) to a `winningBoxKey`, which indexes into `boxDetails` to get the box's name/image/description/features shown on the results screen.
4. **Lead capture** — the results screen renders a form (`name="discovery-leads"`) that POSTs URL-encoded form data to `/`, matching the Netlify Forms convention. `index.html` contains a matching hidden static `<form name="discovery-leads">` with a honeypot field (`bot-field`) — Netlify's build-time form detection requires this hidden twin to exist in the static HTML, so **any change to the visible form's fields (name/type of inputs) must be mirrored in the hidden form in `index.html`**, or Netlify won't register the field.

To add a new quiz path or box: add an entry to `paths`, optionally add branching `questions` for it, add its result(s) to `boxDetails`, and extend the `winningBoxKey` if/else chain. Box images referenced by `boxDetails[...].image` must exist under `public/images/`.

## Styling

Tailwind CSS v4 via the `@tailwindcss/postcss` plugin (see `postcss.config.js`); `tailwind.config.js` has an empty `content` array since v4 auto-detects content. All styling in `App.jsx` is Tailwind utility classes; `src/App.css` and the `.hero`/`#next-steps`/etc. rules are unused leftovers from the original Vite template and are not imported anywhere.
