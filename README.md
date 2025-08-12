<p align="center">
  <a href="https://react-gsap-cookbook.netlify.app/">
    <img width="1312" height="945" alt="image" src="https://github.com/user-attachments/assets/3bb7a727-ea34-481e-97fb-09869e01912c" />

  </a>
</p>

<h1 align="center">React GSAP Cookbook</h1>

<p align="center">
  A professional, well-documented set of <strong>React + GSAP</strong> demos covering
  <em>to/from/fromTo</em>, <em>timelines</em>, <em>stagger</em>, <em>ScrollTrigger</em>, and <em>text</em> animations.
</p>

<p align="center">
  <a href="https://react-gsap-cookbook.netlify.app/">
    <img alt="Live Demo" src="https://img.shields.io/badge/live-demo-00C7B7?logo=netlify&labelColor=0A0A0A&color=00C7B7">
  </a>
  <img alt="Built with Vite" src="https://img.shields.io/badge/bundler-vite-646CFF?logo=vite&logoColor=white&labelColor=0A0A0A">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-3DA639?labelColor=0A0A0A">
</p>

---

## Overview

This repository is a concise learning/playground resource for building motion-rich interfaces with **GSAP v3** in **React**.  
Each page demonstrates a focused pattern with:

- Modern UI (Tailwind)
- Inline play/pause, restart, and **speed control**
- In-component **code snippet** with comments
- Clean `useGSAP` usage with scoping and automatic cleanup

---

## Live Demo

**Netlify:** https://react-gsap-cookbook.netlify.app/

**Routes**
- `/` — Home (list of demos)
- `/gsapto` — `gsap.to()`
- `/gsapfrom` — `gsap.from()`
- `/gsapfromto` — `gsap.fromTo()`
- `/gsaptimeline` — `gsap.timeline()`
- `/gsapstagger` — Staggered sequences
- `/gsapscrolltrigger` — Scroll-driven motion
- `/gsaptext` — Text animations

> Tip: Refresh on any route to verify SPA fallback works (handled via `netlify.toml`).

---

## Tech Stack

- **React 18** + **React Router**
- **Vite** (fast dev/build)
- **GSAP v3** + **@gsap/react** (+ ScrollTrigger)
- **Tailwind CSS**

---

## Getting Started

### Prerequisites
- **Node.js 18+** (recommended **20**)

### Installation
```bash
git clone <repo-url>
cd react-gsap-cookbook
npm install
```

### Development
```bash
npm run dev
# Vite dev server → http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview  # local preview of dist/
```

---

## Project Structure

```
src/
  components/
    BackButton.jsx
  pages/
    GsapTo.jsx
    GsapFrom.jsx
    GsapFromTo.jsx
    GsapTimeline.jsx
    GsapStagger.jsx
    GsapScrollTrigger.jsx
    GsapText.jsx
  App.jsx
  main.jsx
public/
netlify.toml
tailwind.config.js
vite.config.js
```

---

## Key Implementation Notes

- **@gsap/react / useGSAP**
  - Always pass a **scope** `ref` (`{ scope }`) so selectors resolve inside the component only and teardown is automatic.
- **ScrollTrigger**
  - Use `markers: true` in development to visualize `start/end` boundaries; disable in production.
  - If scrolling a custom container, set `scrollTrigger.scroller`.
- **Performance**
  - Animated elements use `will-change: transform` (via Tailwind utility) and transform-based motion.
- **Accessibility**
  - Motion is short and reversible; consider respecting reduced motion if you extend this (e.g., media query).

---

## Deploy (Netlify)

**netlify.toml (repo root)**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

> This ensures SPA routing works on deep links and refresh.

**Optional caching headers**
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache"
```

**Netlify UI**
- Build command: `npm run build`
- Publish directory: `dist`
- (Optional) Environment variable: `NODE_VERSION=20`

---

## Roadmap

- TextPlugin / SplitText examples
- ScrollTrigger pinning & scrubbed timelines
- Copy-to-clipboard for code blocks
- Theme toggle (light/dark)

---

## Contributing

Contributions are welcome!  
Please open an issue to discuss your idea before filing a PR. Keep demos **small, focused, and well-commented**.

---

## Credits

- [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- [@gsap/react](https://gsap.com/docs/v3/Plugins/GSAP/React/)
- [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Vite](https://vitejs.dev/) · [React](https://react.dev/) · [Tailwind](https://tailwindcss.com/)
