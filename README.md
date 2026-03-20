# Temiloluwa Adebayo — Portfolio

> **Personal portfolio website for Temiloluwa Adebayo, AI Software Engineer. Built with React, TypeScript, Vite, and Framer Motion.**

[![Stack](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Animation](https://img.shields.io/badge/Animation-Framer%20Motion-pink?style=flat-square)](https://motion.dev)
[![Build](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

**Live site:** [temiloluwa-adebayo.vercel.app](https://my-portfolio-bice-delta-10.vercel.app/)

## Screenshots

![Dashboard](assets/Screenshot%202026-03-19%20215907.png)
![Leads Table](assets/Screenshot%202026-03-19%20221158.png)

---

## Table of Contents

- [Overview](#overview)
- [Sections](#sections)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Customisation](#customisation)
- [Deployment](#deployment)

---

## Overview

A production-grade personal portfolio showcasing 7 fully shipped software products across web applications, mobile apps, automation systems, and AI-powered platforms. Designed to communicate professional credibility, technical depth, and real-world delivery capability to hiring managers, technical recruiters, and collaborators.

**Design direction:** Dark theme with an emerald green accent system. Outfit (display) + DM Sans (body) + JetBrains Mono (code). Framer Motion scroll animations, animated terminal card, glassmorphism project cards, and a fully responsive layout.

---

## Sections

### Hero
- Animated availability badge with pulsing indicator
- Large display headline with staggered entrance animation
- Animated terminal card showing skills and status (typing effect with live cursor)
- Stats strip: shipped products, education, specialisation, availability

### Work
- All 7 projects displayed as glassmorphism cards
- Per-project accent colours (not generic — each project has its own colour identity)
- Filter tabs: All / Web App / Mobile / Desktop / AI-Powered
- Live project count updates on filter
- `whileInView` scroll entrance animations with staggered delays

### Skills
- 5 skill categories: AI & ML, Frontend, Backend, Automation, Integrations
- Card grid with per-category accent colours
- Hover lift effect with accent glow

### About
- Split layout: photo (left) + text (right)
- Photo with grayscale-to-colour hover effect
- Floating stat card overlapping the image
- Stat grid: education, specialisation, location, status
- Social link row: GitHub, LinkedIn, Email

### Contact
- Split layout: contact links (left) + message form (right)
- Animated contact links with slide-on-hover
- Form with focus states and success animation
- Dark glass form container

### Footer
- Logo mark + full name
- Build credit

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 6 |
| Animation | Framer Motion (`motion/react`) |
| Fonts | Outfit + DM Sans + JetBrains Mono (Google Fonts) |
| Styling | Inline styles + scoped CSS |
| Hosting | Vercel |

---

## Project Structure

```
portfolio/
├── index.html              # Entry HTML — includes Google Fonts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.js       # PostCSS (prevents global config conflicts)
├── package.json
└── src/
    ├── main.tsx            # React root mount
    ├── index.css           # Global base styles
    └── App.tsx             # Complete application (all components)
```

All components live in `src/App.tsx` as named functions. The data arrays (`PROJECTS`, `SKILLS`, `TERMINAL_LINES`) are defined at the top of the file for easy editing.

---

## Getting Started

### Prerequisites
- Node.js 18 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/temiloluwa-adebayo/My_Portfolio.git
cd My_Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Customisation

All content is defined in the `DATA` section at the top of `src/App.tsx`.

### Update Projects

```typescript
const PROJECTS = [
  {
    id: "your-project-id",
    title: "Project Name",
    subtitle: "One-line description",
    description: "Full description paragraph.",
    tags: ["Tech 1", "Tech 2"],
    metrics: ["Key metric 1", "Key metric 2"],
    icon: "🔧",           // Emoji icon
    accent: "#6EE7B7",    // Hex colour for card accent
  },
  // ...
];
```

### Update Skills

```typescript
const SKILLS = [
  {
    cat: "Category Name",
    color: "#6EE7B7",
    items: ["Skill 1", "Skill 2", "Skill 3"],
  },
  // ...
];
```

### Update Personal Info

Search `src/App.tsx` for the following placeholders and replace with your real information:

| Placeholder | Location |
|---|---|
| `temiloluwa@email.com` | Hero actions, Contact section |
| `https://linkedin.com/in/temiloluwa-adebayo` | About section, Contact section |
| `https://github.com/temiloluwa-adebayo` | About section, Contact section |
| Unsplash photo URL | About section `<img>` tag |
| Project live links | Project cards (currently `#`) |

---

## Deployment

### Deploy to Vercel (Recommended)

**Option 1 — Via Vercel Website (no CLI):**
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
3. Click "Add New Project" → Import this repository
4. Vercel auto-detects Vite — click Deploy
5. Done. Live URL generated in ~30 seconds

**Option 2 — Via Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Auto-Deploy on Push
Once connected to Vercel, every `git push` to the `main` branch triggers an automatic redeployment. No manual steps required.

---

## License

MIT — free to use as a template. If you do, a credit or a star is appreciated.

---

## Author

**Temiloluwa Adebayo** — AI Software Engineer  
[Live Site](https://my-portfolio-bice-delta-10.vercel.app/) · [GitHub](https://github.com/temiloluwa-adebayo) · [LinkedIn](www.linkedin.com/in/temiloluwa-adebayo-4843ba377)
