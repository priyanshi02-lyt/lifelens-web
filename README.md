# 🌟 LifeLens — Every Click Tells a Story

> Transforming raw digital breadcrumbs—transactions, late-night Spotify sessions, cutting chai stops, and life milestones—into an interactive, interconnected biographical experience.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://lifelens-web.vercel.app)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features & Architecture

### 1. 📖 Editorial Visual Design
- **Editorial Typography**: Elegant serif headings (*Playfair Display*) paired with clean modern sans (*Plus Jakarta Sans*).
- **Curated Palette**: `#faf8fc` canvas, `#2d1f3f` text, `#172b65` deep navy CTA, and `#5269dd` lilac accent.
- **Pure CSS Animated Landscape**: Floating sun, layered geometric mountains, and winding river inside the *"Your life, visualised"* hero card.
- **Backdrop Blur Micro-Animations**: Floating note badges with smooth floating animations and frosted glass effect.

### 2. 📱 Flawless Phone View (Mobile-First)
- **Zero Horizontal Overflow**: Fully verified down to 320px viewport width (`scrollWidth <= clientWidth`).
- **Floating Mobile Bottom Dock**: Persistent frosted-glass bottom navigation pill (`fixed bottom-5 left-1/2 -translate-x-1/2 z-40`) with active indicators.
- **Mobile Safe Area**: Generous padding (`pb-24`) so interactive content is never covered by the bottom bar.
- **Touch Targets**: Minimum 44px tap targets on all buttons, filter chips, and interactive cards.

### 3. 📊 Preserved Real Dataset (2015–2018)
- **4 Life Chapters**:
  1. *Chapter 01: The Baroda–Mumbai Commute (2015–2016)*
  2. *Chapter 02: The Skill Sprint & Tool Upgrade (2017)*
  3. *Chapter 03: The Caretaker & The Clinic (Early 2018)*
  4. *Chapter 04: The Harvest & The Marathon (Mid–Late 2018)*
- **600+ Real Moments**: Integrated financial expenses, train bookings, cutting chai, Nokia 215 gift for mother, and marathon medals correlated with iconic Spotify tracks (*Kun Faya Kun*, *cold/mess*, *Harder Better Faster Stronger*, *Nuvole Bianche*, *On the Nature of Daylight*, *Adventure of a Lifetime*).

### 4. 🧾 Authentic Thermal Receipt Generator
- Monospace receipt typography with jagged sawtooth top and bottom edges.
- Itemized breakdown, payment method, emotional tax surcharge, and scannable barcode.
- Native browser print integration (`@media print`).

---

## 🛠️ Project Routes

- `/` — Editorial Landing Page (Hero, Value propositions, How it works, CTA).
- `/dashboard` — Personal Life Dashboard (Greeting, landscape art, daily reflection, recent moments).
- `/timeline` — Chronological Feed (Filterable by All, Music, Places, Movies, Purchases, Photos).
- `/explore` — Real-Time Explorer (Live fuzzy search, Grid vs List toggle, Save to Journal action).
- `/insights` — Mood Landscape & Intelligence (Bar charts, circadian activity clock, 3 discovered life patterns).
- `/story` — Narrative Chapter Reader (Hero photo gradient banner, connected moment chains, chapter pagination).
- `/journal` — Personal Reflection Board (Masonry grid of tilted sticky notes, photo memories, and new entry dialog).

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 📄 License
MIT © Priyanshi Srivastava
