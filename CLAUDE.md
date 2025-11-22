# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Superblessed** is a Next.js 15 application for generating AI-powered blessing cards with Bible verses. It deploys to Cloudflare Workers using the OpenNext.js adapter.

## Tech Stack

- **Next.js 15** with App Router and React 19
- **TypeScript** with strict mode
- **Tailwind CSS v4** with oklch() color system
- **shadcn/ui** (New York style) - ready for component installation
- **Cloudflare Workers** via @opennextjs/cloudflare
- **pnpm** as package manager

## Commands

```bash
pnpm dev          # Local dev server with Turbopack (port 3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm type-check   # TypeScript type checking
pnpm preview      # Build and preview on Cloudflare Workers locally
pnpm deploy       # Build and deploy to Cloudflare Workers
```

## Development Workflow

- **Local development**: `pnpm dev` uses Next.js with Turbopack
- **Cloudflare preview**: `pnpm preview` builds the app, runs OpenNext adapter, then starts wrangler dev
- **Production**: `pnpm deploy` does the same but deploys to Cloudflare

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── uptime/        # Health check endpoint (GET /api/uptime)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Tailwind + theme CSS variables
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities
│   └── utils.ts          # cn() classname helper
└── hooks/                 # Custom React hooks
```

## Key Patterns

- Use `cn()` from `@/lib/utils` for merging Tailwind classes
- Path alias: `@/*` maps to `./src/*`
- Server Components are default (RSC enabled)
- Theme colors defined as CSS custom properties in globals.css
- Icons from `lucide-react`

## Cloudflare Configuration

- Worker config in `wrangler.jsonc`
- OpenNext adapter config in `open-next.config.ts`
- Uses R2 incremental cache for ISR (requires R2 bucket if using ISR features)
- Node.js compatibility enabled via `nodejs_compat` flag

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add [component-name]
```
