# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Freelance portfolio site for a backend consultant (nataliesimon.fr). Built with Nuxt 4 (SSG mode), TailwindCSS, and Nuxt Content. Dark theme with teal accent colors.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Build for production (SSG)
pnpm generate     # Generate static site
pnpm preview      # Preview production build
```

## Nuxt 4 Directory Structure

**Critical:** This project uses Nuxt 4 conventions. All application code lives in `app/`:

```
app/
├── components/    # Vue components (layout/, sections/, ui/, content/)
├── pages/         # Route pages
├── layouts/       # Layout templates
├── composables/   # Composable functions
├── assets/css/    # Tailwind CSS entry point
└── app.vue        # Root component

server/            # Nitro server (API routes)
content/           # Markdown content (case studies)
public/            # Static assets
```

The `~` alias points to `app/`, not the project root.

## Design System

### Color Tokens (tailwind.config.ts)

- **Backgrounds:** `base-950` (page), `base-900` (sections), `base-800` (cards)
- **Text:** `content-primary` (headings), `content-secondary` (body), `content-muted` (labels)
- **Accent:** `accent` (teal #2DD4BF), `accent-light`, `accent-dark`
- **Borders:** `border`, `border-hover`, `border-accent`

### Typography

- **Sans:** Inter (titles, body)
- **Mono:** JetBrains Mono (code snippets, technical tags)

### Component Conventions

- UI components in `app/components/ui/` prefixed with `Ui` (UiButton, UiCard, UiBadge)
- Section components in `app/components/sections/`
- Layout components in `app/components/layout/` prefixed with `The` (TheHeader, TheFooter)
- Icons via `@nuxt/icon`: `<Icon name="lucide:code" />`

## Server API

Contact form endpoint at `server/api/contact.post.ts` uses Resend for email delivery. Requires `RESEND_API_KEY` env var.

## Key Modules

- `@nuxtjs/tailwindcss` - Styling
- `@nuxt/content` - Markdown case studies in `content/cases/`
- `@nuxt/image` - Image optimization (WebP, lazy loading)
- `@nuxtjs/seo` - Meta tags, sitemap, OG images
- `@nuxt/icon` - Lucide icons
- `@vueuse/nuxt` - Composables (useIntersectionObserver for scroll animations)

## Animation Guidelines

- Use `animate-fade-up` keyframe for scroll-triggered animations
- Respect `prefers-reduced-motion` - disable animations when enabled
- Transitions: `transition-colors duration-200` for hovers
- No parallax, no 3D effects, keep it subtle and professional
