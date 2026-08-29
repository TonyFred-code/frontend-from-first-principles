# Frontend, From First Principles

A field-manual-style deep dive into how the frontend actually works — from the browser's render pipeline up through modern rendering strategies, state management, and security. Built as the frontend companion to [backend-from-first-principle](https://backend-from-first-principle.vercel.app/), a friend's backend equivalent.

**Live site:** [frontend-from-first-principles.vercel.app](https://frontend-from-first-principles.vercel.app/)

## What's covered

Twenty chapters, in order:

1. HTML, CSS & the Render Pipeline
2. The DOM & Events
3. HTTP from the Client Side
4. State Management
5. Component Architecture & Composition
6. Client-Side Routing
7. Forms & Validation
8. Data Fetching Patterns
9. Styling Systems
10. Accessibility Fundamentals
11. Performance
12. Rendering Strategies (CSR, SSR, SSG, ISR & Islands)
13. Build Tools & Bundlers
14. Testing
15. Browser Storage
16. Security: XSS & CSRF
17. Animations & the Rendering Pipeline
18. PWA & Offline Patterns
19. Real-Time on the Client
20. Deployment & CDNs

## Features

- **Dark / light / system theme**, persisted and synced via `next-themes`
- **Reading progress tracking** per chapter, stored in `localStorage`, with a "continue reading" prompt on the homepage
- **Command palette** (`⌘K` / `Ctrl+K`) to jump directly to any chapter
- **Keyboard shortcuts** — arrow keys for prev/next chapter, `?` for a shortcuts overlay
- **Syntax-highlighted code blocks** (Shiki, dual light/dark themes) with a copy button
- **Table of contents** — sticky scroll-spy on desktop, collapsible on mobile
- Auto-computed **reading time**, and a **last updated** date per chapter
- Full **SEO metadata**, sitemap, RSS feed, and OG/Twitter cards
- Styled 404 and runtime error pages
- **CI** via GitHub Actions — lint, format check, tests, and build on every push and PR

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- Content authored in MDX, rendered via `next-mdx-remote/rsc` + `gray-matter`
- [Shiki](https://shiki.style/) (via `rehype-pretty-code`) for syntax highlighting
- [`cmdk`](https://cmdk.paco.me/) for the command palette
- [Vitest](https://vitest.dev/) for unit tests, [Prettier](https://prettier.io/) + ESLint for linting/formatting

## Running locally

```bash
git clone https://github.com/TonyFred-code/frontend-from-first-principles.git
cd frontend-from-first-principles
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Project structure

- content/ # chapter .mdx files, one per chapter (01-, 02-... prefixed)
- lib/ # content.ts (chapter data), useProgress, useScrollProgress, # content.test.ts (Vitest)
- app/ # homepage, [slug] chapter pages, sitemap.ts, robots.ts, # rss.xml, icon.tsx/apple-icon.tsx, error.tsx, not-found.tsx
- components/ # UI components (nav, TOC, command palette, theme toggle, etc.)

Each chapter is a single `.mdx` file with frontmatter (`title`, `slug`, `description`, `published`, `date`, optional `updated`) — reading time is computed automatically from word count.

## Scripts

```bash
 npm run dev      # start the dev server
 npm run build    # production build
 npm run start    # run the production build
 npm run lint     # next lint (ESLint)
 npm run format   # Prettier — write formatting fixes
 npm run format:check  # Prettier — check only, no writes
 npm run test     # Vitest (single run)
```
