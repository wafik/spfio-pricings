# Spf.io Interactive Pricing Workspace

Interactive pricing simulator for [spf.io](https://www.spf.io) — an AI-powered translation and accessibility platform. Lets prospective clients configure workloads, compare tiers, see real-time cost estimates, and get auto-recommendations.

## Tech Stack

- **React 19** + **TypeScript 6** + **Vite 8**
- **Tailwind CSS v4** with custom `@theme` design tokens
- **shadcn/ui** (Radix UI primitives) — Button, Card, Slider, Dialog, Badge, Checkbox, Tooltip, Separator, Label
- **Zod** — input schema validation
- **Bun** — runtime & package manager
- **oxfmt** / **oxlint** — formatter & linter

## Live Demo

[spfio-pricings.ulinmedia.workers.dev](https://spfio-pricings.ulinmedia.workers.dev/)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Format code
bun run format

# Lint code
bun run lint
```

## Project Structure

```
src/
  features/pricing/
    components/          # Feature components (PricingWorkspace, PricingCard, etc.)
    hooks/               # usePricingEngine (calculations + recommendations)
    services/            # Pricing calculation functions
    schemas/             # Zod validation schemas
    types/               # TypeScript interfaces
    constants/           # Tier registry, mock scenarios
  shared/
    components/
      ui/                # shadcn/ui primitives (9 components)
      layout/            # Reusable layout (Navbar, Hero, Footer, Container, Section)
    hooks/               # useMediaQuery, useDebounce
    utils/               # formatters (currency, number)
  lib/                   # cn() utility
  styles/                # globals.css with Tailwind v4 @theme tokens
```

## Features

- **3 Pricing Tiers:** Growth Pack ($79/mo), Scale Enterprise ($299/mo), Contact Sales ($1,200/mo)
- **Real-time Calculator:** Sliders for live minutes, documents, languages with instant cost updates
- **Auto-Recommendation:** Engine recommends the best tier based on workload inputs
- **Annual Discount:** 20% off base price when switching to annual billing
- **Overage Calculation:** Per-minute overage costs when tier limits are exceeded
- **6 Scenario Presets:** One-click workload presets (Church, Conference, SaaS, etc.)
- **Checkout Dialog:** Simulated cart preview with line items
- **Logo Carousel:** CSS-only infinite scroll with 25 real spf.io customer logos
- **Responsive Layout:** Mobile-first, adapts from single-column to side-by-side panels
- **Accessible:** Radix UI primitives, keyboard navigation, ARIA labels

## Design System

| Token | Value |
|---|---|
| Primary | `#14A7E0` |
| Accent (CTA) | `#F4C84A` |
| Background | `#F7F8FA` |
| Text | `#2F3A4A` |
| Heading Font | Roboto |
| Body Font | Source Sans 3 |

## Agent Skills

This project was built using modular agent skills for planning and implementation:

**[github.com/wafik/my-dev-skills](https://github.com/wafik/my-dev-skills)**

| Skill | Used For |
|---|---|
| `planning-frontend` | Overall frontend architecture, folder structure, reusable components |
| `frontend-reusable-components` | Shared layout components (Navbar, Hero, Footer), shadcn/ui patterns |
| `frontend-crud-dialogs` | Checkout dialog, confirmation patterns |
| `frontend-formatting-inputs` | Currency formatting, number display |

## License

Proprietary — TheoTech LLC
