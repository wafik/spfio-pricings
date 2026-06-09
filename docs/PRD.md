# Product Requirement Document (PRD)

## Project: High-Fidelity Frontend Tier Matrix & Interactive Billing Simulator

---

## Document Control

* **Product Name:** Spf.io Interactive Pricing Workspace
* **Status:** Implemented
* **Target Release:** Q3 2026
* **Target Frontend Stack:** React 19 (Vite 8), Bun (runtime & package manager), Tailwind CSS v4, shadcn/ui (Radix UI primitives), Lucide Icons, Zod (schema validation), oxfmt (formatter), oxlint (linter)

---

## 1. Project Vision & Context

This document specifies the client-side implementation details for the Spf.io interactive pricing display and billing simulator. The goal is to maximize self-service conversion rates by letting prospective clients visualize pricing options, overage inflection points, and tier features dynamically.

This implementation relies entirely on **client-side reactive state** and high-fidelity mock datasets. It operates independently of any active backend streaming architectures or live database instances.

### 1.1. SPF.io Product Context

SPF.io is an all-in-one AI translation and accessibility platform. The pricing workspace must reflect the three core product pillars:

**Events** — Scale and run multilingual events with confidence
* Automatic Captions & Translation: Real-time captions and translations of live and pre-recorded speech in 100+ languages to big screens, mobile devices, or embedded on websites.
* Audio Live Streaming: Stream translated audio channels to audience devices.
* Multilingual Polls: Run interactive polls across multiple languages during live events.

**Content** — Accelerate translation management and delivery
* Audio Video Captions & Subtitles: Caption and translate pre-recorded audio/video files.
* Document Translation Portal: Translate documents (PDF, DOCX, etc.) with AI assistance.
* Slides Translation: Translate presentation slides in real-time or batch mode.

**Conversations** — Facilitate seamless multilingual conversations
* Multilingual Conversations: Real-time captions and translations for meetings, workshops, Bible studies, and collaborative sessions (online and in-person).

**Platform Capabilities**
* Integrations: Works with Zoom, YouTube, Vimeo, OBS, and other streaming platforms.
* Custom AI: Build custom language models (glossaries, vocabulary profiles) for higher-quality output tailored to specific domains.
* Supported Languages: 100+ languages for speech-to-text and translation.

### 1.2. Target Industry Verticals

The pricing simulator must speak to these key verticals (used in scenario presets and marketing copy):

| Vertical | Typical Use Case | Key Pain Point |
|---|---|---|
| Churches & Religious | Sunday services, Bible studies, multilingual congregations | Language barriers in growing multicultural communities |
| Conferences & Summits | Multi-track events, hybrid attendance, keynote translation | Scaling to 10+ languages across multiple sessions |
| Corporate Events | Town halls, training, global team meetings | Compliance, security, SSO requirements |
| Education | Lectures, student orientation, parent communications | Accessibility mandates, diverse student bodies |
| Government | Public hearings, civic meetings, multilingual services | Regulatory compliance, data sovereignty |
| Theater & Performing Arts | Live performances, rehearsals, audience accessibility | Real-time captioning for live audiences |

### 1.3. Enterprise Customer Logos (Social Proof)

The pricing workspace displays a CSS-animated infinite-scroll carousel of 25+ real customer logos loaded from spf.io's media CDN. Logos render in grayscale with a hover-to-color transition:

Smartsheet, Pacific Presbytery, Christianity Today, Netherlands National Football Team, Databricks, Westminister Chapel, Upskill Universe, FAC Calgary, TN, Presbytery of San Diego, International Enneagram Association, North Central California Presbytery, One Voice Fellowship, Sub-Ti, Overlake Park Presbyterian Church, Union, Theology of Work, Taichung International Fellowship, Sunstar Global, Accenture, CES, Delta Airlines, Panasonic, Volvo, X Corp.

---

## 2. Global State Matrix & Reactive Variables

The core interface operates as a unified state-machine. State is managed via React `useState` in the `PricingWorkspace` component and distributed through the `usePricingEngine` hook.

### 2.1. Input Parameters (Writable States)

* `liveMinutes` *(number)*: Total expected real-time translation/subtitling pipeline runtime per month. Range: `0` to `12,000`. Default: `300`.
* `documentCount` *(number)*: Number of offline documents processed per month. Range: `0` to `1,500`. Default: `10`.
* `targetLanguages` *(number)*: Number of concurrent output language profiles needed during a single live event session. Range: `1` to `50`. Default: `2`.
* `requiresHumanInTheLoop` *(boolean)*: Toggle configuration flag indicating whether the user requires access to the manual override translation edit canvas. Default: `false`.
* `billingCycle` *('monthly' | 'annual')*: Billing frequency choice. Default: `'monthly'`.

### 2.2. Calculated Parameters (Read-Only Derived States)

* `overages` *(Record<TierId, TierCalculation>)*: Per-tier overage minutes, overage cost, total monthly cost, and exceeded status.
* `recommendedTierId` *('growth' | 'scale' | 'enterprise')*: The machine-determined target recommendation matching the input configuration.
* `discountFactor` *(number)*: Annual discount multiplier (0.80 or 1.00).

---

## 3. Folder Structure

```
spifio/
  bun.lockb
  package.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
  index.html
  docs/
    PRD.md
  src/
    main.tsx
    App.tsx
    lib/
      utils.ts                         # clsx + tailwind-merge (cn)
    styles/
      globals.css                      # Tailwind v4 @theme tokens + animations
    features/
      pricing/
        components/
          PricingWorkspace.tsx         # Main page composition
          BillingCycleToggle.tsx       # Monthly/Annual segmented pill control
          WorkloadSliders.tsx          # Panel A: input controls with SliderField
          PricingCardGrid.tsx          # Panel B: 3-column tier cards layout
          PricingCard.tsx              # Individual tier card
          OverageBreakdown.tsx         # Overage cost detail view
          UsageGaugePanel.tsx          # Capacity bars + upgrade notices
          ScenarioPresets.tsx          # Quick-load simulation buttons
          CheckoutDialog.tsx           # Client-side checkout modal
          SocialProof.tsx              # Logo carousel + testimonials + CTA
        hooks/
          usePricingEngine.ts          # Calculation + recommendation hook
        schemas/
          pricing.schema.ts            # Zod schemas for inputs
        services/
          pricing.service.ts           # Calculation functions + recommendation logic
        types/
          pricing.types.ts             # TypeScript interfaces
        constants/
          tier-registry.ts             # SPF_TIER_REGISTRY (3 tiers)
          mock-scenarios.ts            # MOCK_USER_SCENARIOS (6 scenarios)
    shared/
      components/
        ui/                            # shadcn/ui primitives
          button.tsx
          card.tsx
          dialog.tsx
          slider.tsx
          checkbox.tsx
          badge.tsx
          tooltip.tsx
          separator.tsx
          label.tsx
        layout/                        # Reusable layout components
          Container.tsx                # Responsive max-width wrapper
          Section.tsx                  # Vertical spacing sections
          Navbar.tsx                   # Sticky top nav with logo + links
          Hero.tsx                     # Hero title + subtitle
          Footer.tsx                   # 5-column footer with real spf.io links
          index.ts                     # Barrel export
      hooks/
        useMediaQuery.ts
        useDebounce.ts
      utils/
        formatters.ts                  # formatCurrency, formatNumber, formatPercent
```

---

## 4. Component Architecture & shadcn/ui Integration

### 4.1. shadcn/ui Component Mapping

| PRD Requirement | shadcn/ui Component | Notes |
|---|---|---|
| Billing Cycle Toggle | Custom `Button` group | Segmented pill control in Calculator section |
| Workload Sliders | `Slider` (Radix) | With `Label` and `aria-label` |
| Feature Toggle Checkbox | `Checkbox` + custom card | Clickable card boundary with border accent |
| Pricing Tier Cards | `Card` + `Badge` | Recommended badge, popular badge |
| CTA Buttons | `Button` | Yellow primary for all CTAs |
| Checkout Modal | `Dialog` | Line items summary |
| Tooltips | `Tooltip` | Contextual help info |
| Capacity Bars | Custom div-based | Percentage gauges with color states |

### 4.2. Component Composition Pattern

Follows thin-page architecture with reusable layout primitives:

```
App
  └─ PricingWorkspace (page)
       ├─ Navbar (shared/layout) — sticky header with logo, nav links, "Request a Quote"
       ├─ Hero (shared/layout) — title + subtitle
       ├─ ScenarioPresets — 6 quick-load buttons
       ├─ BillingCycleToggle — centered Monthly/Annual pill
       ├─ WorkloadSliders (Panel A)
       │    ├─ SliderField (liveMinutes) with presets
       │    ├─ SliderField (documentCount)
       │    ├─ SliderField (targetLanguages)
       │    └─ CheckboxCard (requiresHumanInTheLoop)
       ├─ PricingCardGrid (Panel B)
       │    ├─ PricingCard (growth)
       │    ├─ PricingCard (scale) — recommended badge
       │    └─ PricingCard (enterprise → "Contact Sales")
       ├─ UsageGaugePanel (Panel C)
       │    ├─ CapacityBar (liveMinutes)
       │    ├─ CapacityBar (documents)
       │    └─ CapacityBar (languages)
       ├─ SocialProof
       │    ├─ Logo Carousel (CSS infinite scroll, 25 real logos)
       │    ├─ Testimonials (2 cards)
       │    └─ CTA ("Request a Quote" + "Get a Demo")
       ├─ Footer (shared/layout) — 5-column with real spf.io links
       └─ CheckoutDialog — modal with line items
```

### 4.3. State Management Pattern

Uses React `useState` + custom hook for derived calculations:

- `usePricingEngine(inputs, setInputs)` → returns `{ overages, recommendedTierId, discountFactor, set*, loadScenario }`
- Input validation via Zod schema in `features/pricing/schemas/pricing.schema.ts`
- Calculation functions in `features/pricing/services/pricing.service.ts`

---

## 5. Design System & Tokens

Faithful to the live SPF.io brand: trust-first, enterprise-first, conversion-first. Blue dominant, yellow only for CTAs, generous white space, minimal effects.

### 5.1. Color Palette

```css
:root {
  --primary: #14A7E0;
  --primary-dark: #0E6FBF;
  --accent: #F4C84A;
  --white: #FFFFFF;
  --background: #F7F8FA;
  --text-primary: #2F3A4A;
  --text-secondary: #5E6B7A;
  --border: #E5E7EB;
}
```

### 5.2. Typography

```css
:root {
  --font-heading: "Roboto", system-ui, sans-serif;
  --font-body: "Source Sans 3", system-ui, sans-serif;
}
```

Uses `clamp()` for fluid responsive typography:
```css
h1 { font-size: clamp(1.75rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 3.5vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }
```

### 5.3. Tailwind CSS v4 Tokens

```css
@theme {
  --color-primary: #14A7E0;
  --color-primary-dark: #0E6FBF;
  --color-accent: #F4C84A;
  --color-background: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-text: #2F3A4A;
  --color-text-muted: #5E6B7A;
  --color-border: #E5E7EB;
  --radius-button: 999px;
  --radius-card: 12px;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
  --shadow-card-hover: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
}
```

### 5.4. Buttons

All CTA buttons use yellow accent with pill shape:
```css
.btn-primary {
  background: #F4C84A;
  color: #111827;
  border-radius: 999px;
}
```

### 5.5. Design Principles

1. Blue as the dominant brand color.
2. Yellow only for CTAs (all pricing card buttons are yellow).
3. Generous white space with consistent vertical rhythm.
4. Customer logos with CSS infinite-scroll carousel.
5. Simple forms above the fold.
6. Minimal visual effects — subtle shadows, no gradients.

---

## 6. High-Fidelity Mock Data Layer

### 6.1. Tier Registry (3 tiers)

```typescript
export interface PricingTier {
  id: 'growth' | 'scale' | 'enterprise';
  name: string;
  tagline: string;
  baseMonthlyPrice: number;
  overageRatePerMinute: number;
  isPopular: boolean;
  limits: TierLimits;
  includedFeatures: string[];
  supportTier: string;
}

export const SPF_TIER_REGISTRY: PricingTier[] = [
  {
    id: 'growth',
    name: 'Growth Pack',
    tagline: 'Ideal for local organizers, regional live streams, and expanding creators.',
    baseMonthlyPrice: 79,
    overageRatePerMinute: 0.15,
    isPopular: false,
    limits: { liveMinutesIncluded: 500, maxLanguages: 5, maxDocsPerMonth: 50, ... },
    includedFeatures: ['Automatic Captions & Translation', 'Audio Live Streaming', ...],
    supportTier: 'Standard Developer Business Hours Email Service (24h SLA)',
  },
  {
    id: 'scale',
    name: 'Scale Enterprise',
    tagline: 'Built for corporate deployments, international events, and high-volume usage.',
    baseMonthlyPrice: 299,
    overageRatePerMinute: 0.10,
    isPopular: true,
    limits: { liveMinutesIncluded: 2500, maxLanguages: 100, maxDocsPerMonth: 500, ... },
    includedFeatures: ['Multilingual Conversations', 'Human-in-the-Loop Canvas', ...],
    supportTier: 'Priority Executive Support Channels (4h SLA Escalation)',
  },
  {
    id: 'enterprise',
    name: 'Contact Sales',
    tagline: 'Tailored architecture with dedicated environments for high compliance.',
    baseMonthlyPrice: 1200,
    overageRatePerMinute: 0.05,
    isPopular: false,
    limits: { liveMinutesIncluded: 10000, maxLanguages: 100, maxDocsPerMonth: 9999, ... },
    includedFeatures: ['Isolated Computing Environments', 'Custom LLM Micro-Tuning', 'SSO (SAML/OIDC)', ...],
    supportTier: 'Dedicated Solutions Engineer Engagement (99.99% Uptime Guarantee)',
  },
];
```

---

## 7. Client-Side Mathematical Engine

### 7.1. Annual Discount Multiplier

When `billingCycle === 'annual'`, a 20% discount is applied to the baseline tier cost. Overage rates remain constant.

$$DiscountFactor (D) = \begin{cases} 0.80 & \text{if } billingCycle = \text{'annual'} \\ 1.00 & \text{if } billingCycle = \text{'monthly'} \end{cases}$$

### 7.2. Per-Tier Calculations

$$\text{Overage Minutes} = \max(0, M_{input} - T.limits.liveMinutesIncluded)$$

$$\text{Overage Cost} = M_{overage} \times T.overageRatePerMinute$$

$$\text{Total Monthly Cost} = (T.baseMonthlyPrice \times D) + C_{overage}$$

---

## 8. Pricing Engine Auto-Recommendation Rules

```typescript
export function determineRecommendedTier(inputs): TierId {
  // 1. Enterprise: minutes > 500, docs > 500, or languages > 25
  if (inputs.liveMinutes > 500 || inputs.documentCount > 500 || inputs.targetLanguages > 25)
    return 'enterprise';

  // 2. Scale: HITL enabled, languages > 5, or docs > 50
  if (inputs.requiresHumanInTheLoop || inputs.targetLanguages > 5 || inputs.documentCount > 50)
    return 'scale';

  // 3. Default: Growth
  return 'growth';
}
```

---

## 9. Layout & Wireframe Requirements

```
+-----------------------------------------------------------------------------------+
|  [ Logo ]  Products  Solutions  Pricing  Resources  Contact  [ Request a Quote ] |
+-----------------------------------------------------------------------------------+
|                           Find the right plan for your team                        |
|     Configure your workload below. Our engine recommends the best tier.            |
+-----------------------------------------------------------------------------------+
|  ⛪ Local House of Worship  🎤 Global Summit  💻 Enterprise Platform  ...          |
+-----------------------------------------------------------------------------------+
|          [ Monthly ]  [ Annual  -20% ]                                            |
+-----------------------------------------------------------------------------------+
| PANEL A: CONTROLS            | PANEL B: PRICING CARDS                            |
|                              |                                                    |
| Live Stream Volume           |  +----------------+  +------------------+           |
| [------o-----------] 300 min |  |  GROWTH PACK   |  | SCALE ENTERPRISE |           |
| Single Event (4h)            |  |  $79 /mo       |  |  $299 /mo        |           |
|                              |  |                |  |  [BEST MATCH]    |           |
| Documents per Month          |  |  [Get Started] |  |  [Get Started]   |           |
| [------o-----------] 10      |  +----------------+  +------------------+           |
|                              |  +----------------+                                |
| Concurrent Languages         |  | CONTACT SALES  |                                |
| [------o-----------] 2       |  | $1,200 /mo     |                                |
|                              |  | [Get Started]  |                                |
| [ ] Human Translation        |  +----------------+                                |
|                              |                                                    |
| CAPACITY STATUS              |                                                    |
| Live Min: [████░░] 60%       |                                                    |
| Docs:     [█░░░░░] 20%       |                                                    |
+-----------------------------------------------------------------------------------+
|  [ Volvo ] [ Accenture ] [ CES ] [ Delta ] [ Panasonic ] ... (auto-scrolling)     |
|  "I can't think of a better partner..." — Vikas Pota                              |
|  [ Request a Quote ]  [ Get a Demo ]                                              |
+-----------------------------------------------------------------------------------+
|  Product  | Solutions  | Company  | Support     |                                  |
|  ...      | ...        | ...      | ...         |  (c) TheoTech LLC                |
+-----------------------------------------------------------------------------------+
```

### 9.1. Panel A: Configuration & Workload Inputs

* **Billing Frequency Switch:** Centered segmented pill control between the hero and workspace grid. Green "-20%" badge on Annual option.
* **Live Translation Volume Rail:** Slider (`0` to `12000` step `10`) with quick presets below.
* **Document Count Rail:** Slider (`0` to `1500` step `1`).
* **Language Profile Matrix:** Slider (`1` to `50` step `1`).
* **Feature Flag Checkbox Card:** Clickable card boundary with active border accent.

### 9.2. Panel B: Comparative Pricing Display Grid

3-column grid (responsive: 1-col mobile, 3-col desktop).

* **Recommended Card:** Scales up +3%, emerald border, "BEST MATCH" crown badge.
* **All CTA Buttons:** Yellow accent (`bg-accent`) pill shape.
* **Contact Sales:** Enterprise-tier card with "Contact Sales" name, CTA opens checkout dialog.
* **Overage Breakdown:** Displayed below price when overage minutes > 0.

### 9.3. Panel C: Usage Gauge Panel

* **Capacity Bars:** Live Minutes, Documents, Languages — color-coded (blue/amber/red).
* **Upgrade Notices:** Advisory notice when tier is auto-upgraded due to input constraints.

### 9.4. Social Proof & Trust Section

* **Logo Carousel:** CSS-only infinite-scroll animation with 25 real spf.io customer logos. Grayscale → color on hover. Pauses on hover.
* **Testimonial Block:** 2 cards with quotes from Vikas Pota (T4 Education) and Maria Fennita (Christianity Today).
* **CTA Section:** "Request a Quote" (primary) + "Get a Demo" (secondary) buttons.

### 9.5. Navbar

* Sticky top with backdrop blur.
* Logo + 5 nav links (Products, Solutions, Pricing, Resources, Contact).
* "Request a Quote" button (blue background, white text).
* Responsive mobile hamburger menu.

### 9.6. Footer

Real spf.io footer structure with 5 columns:
* **Product:** What is spf.io?, Demo, Integrations, Request a Quote, Blog
* **Solutions:** Case Studies, Church/Classroom/Conference/Government/Theater/Corporate Translation
* **Company:** About, Remote Gigs, Vision, Press, Terms, Privacy
* **Support:** FAQ, Help, Contact Us
* Social icons: Facebook, X, Instagram

---

## 10. Interactive Features

### 10.1. Simulation Control Presets

6 scenario buttons with emoji icons:

| Scenario | Minutes | Docs | Languages | HITL |
|---|---|---|---|---|
| Local House of Worship | 180 | 3 | 2 | No |
| Global Multi-Track Summit | 2,400 | 45 | 12 | Yes |
| Enterprise Platform Localization | 8,500 | 450 | 6 | No |
| Corporate Town Hall | 120 | 15 | 8 | Yes |
| University Lecture Series | 600 | 30 | 4 | No |
| Public Civic Hearing | 300 | 100 | 5 | Yes |

### 10.2. Client Checkout Modal

Clicking "Get Started" on any card opens a dialog showing:
* Selected plan name
* Base monthly fee
* Annual discount (if applicable)
* Monthly overage estimate
* Total estimated due
* "Proceed with Selected Setup" + "Return to Simulator Workspace" buttons
* "Request a Quote" link for enterprise leads

---

## 11. Non-Functional Requirements

### 11.1. Performance

* Instant calculation updates via `useMemo` — no API calls.
* CSS transitions (`duration-150` to `duration-200`) for all interactive states.
* CSS-only logo carousel animation (no JS library).

### 11.2. Accessibility

* Radix UI primitives for sliders, checkboxes, dialogs, tooltips.
* `aria-label` on all slider inputs with current values.
* Keyboard navigation via Tab, Shift+Tab, Arrow keys.
* WCAG 2.1 AA contrast compliance.

### 11.3. Responsive Design

* **Mobile (sm):** Single-column layout, stacked cards, full-width controls.
* **Tablet (md):** 2-column pricing grid.
* **Desktop (lg+):** Side-by-side Panel A + Panel B, 3-column pricing grid.
* **Wide (xl):** Sticky sidebar controls.

---

## 12. Tooling

| Tool | Purpose |
|---|---|
| Bun | Runtime + package manager |
| Vite 8 | Build tool + dev server |
| TypeScript 6 | Type checking |
| Tailwind CSS v4 | Utility-first CSS |
| shadcn/ui + Radix | UI primitives |
| Zod | Schema validation |
| oxfmt | Code formatter |
| oxlint | Linter (replaces ESLint) |
