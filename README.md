# Temiloluwa Adebayo — Portfolio

Personal portfolio of Temiloluwa Adebayo, full-stack software engineer building AI-integrated systems for web, mobile and desktop.

**Live site:** [my-portfolio-bice-delta-10.vercel.app](https://my-portfolio-bice-delta-10.vercel.app/)

![Portfolio hero](public/og.png)

## Sections

| Section | What it shows |
|---|---|
| Hero | Headline revealed word by word in 3D over a crossfading, slowly zooming background slideshow; tilting portrait; primary "Start a project" |
| Selected work | Three featured projects as cards that stack on scroll, with real screenshot carousels and a runnable LeadForge pipeline demo; five more in a grid |
| Tools I build with | The stack grouped by layer, with brand icons |
| Services | Three engagements (quote on request); "Request a quote" pre-fills the contact form |
| On the record | CV figures that roll up when they come into view |
| Where I've worked | Timeline whose line draws itself as you scroll, plus a CV download |
| FAQ | Tabbed questions on availability, working together and tech |
| Contact | Form that sends through Resend, copy-email, QR code, LinkedIn and GitHub |

Also: a ⌘K / Ctrl K command palette (or press `/`), and a bottom tab bar on mobile.

## Design system

- **Colour:** graphite `#121212` ground with a light film grain. Signal amber `#FFB224` is used **only** for primary actions; secondary actions are outlined pills and tertiary actions are underlined links. Green marks live and success states only.
- **Type:** Clash Display (self-hosted, `public/fonts/`) for headlines, Geist for everything else, Geist Mono for dates, hostnames and the email address.
- **Motion:** one easing curve (ease-out-expo) for reveals, springs for interactions, 3D pointer tilt on desktop cards. Everything falls back to simple fades when the visitor prefers reduced motion.

Full details are in `DESIGN.md`.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (tokens in `src/index.css`) |
| Motion | `motion` (Framer Motion) |
| Type | Clash Display, Geist and Geist Mono, all self-hosted |
| Icons | `lucide-react`, `simple-icons` for brand marks |
| Contact | Vercel Function (`api/contact.ts`) + Resend |
| Hosting | Vercel, with Vercel Web Analytics |

## Project structure

```
├── api/contact.ts        # Vercel Function: sends the contact form via Resend
├── index.html            # Entry HTML, meta, Open Graph, preloads
├── public/
│   ├── Temiloluwa_Adebayo_CV.pdf
│   ├── fonts/            # Clash Display (self-hosted)
│   ├── hero/             # Hero slideshow images (Canva AI, decorative)
│   ├── work/             # Project images; work/slides/ holds carousel screens
│   ├── profile.webp, avatar.webp, og.png, favicon.svg
└── src/
    ├── data.ts           # All content: profile, stack, projects, roles, facts, services, FAQ
    ├── App.tsx           # Section order
    ├── components/       # Nav, Hero, Work, Sections, Services, Contact, ui (shared pieces)
    ├── index.css         # Design tokens and global styles
    └── main.tsx          # React root, fonts, analytics
```

## Contact form setup

The form posts to `/api/contact`, which sends the message with [Resend](https://resend.com). Until it's configured, the form shows a "send it by email instead" fallback with the message pre-filled.

1. Create a free Resend account using **temidaniel124@gmail.com** and create an API key.
2. In Vercel: **Project → Settings → Environment Variables**, add `RESEND_API_KEY` for Production (and Preview if you like), then redeploy.
3. Optional: `CONTACT_TO` (defaults to temidaniel124@gmail.com) and `CONTACT_FROM`. Without a verified domain, Resend's test sender `onboarding@resend.dev` only delivers to the email that owns the Resend account, so step 1 matters.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint      # type-check
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

## Editing content

Everything on the page lives in `src/data.ts`:

- `PROFILE`: name, role, intro, email, links, CV path, availability.
- `STACK`: tool groups; each tool can carry a `simple-icons` mark.
- `PROJECTS`: each project has `facts`, `tags`, optional `githubUrl` / `liveUrl`, and an `image` in `public/work/`. Set `frameLabel` for anything that isn't a live site, and `credit` for stock photos. `featured: true` puts a project in the stacked cards; `slides` adds carousel screens; `pipeline` adds the run-the-pipeline demo.
- `SERVICES` and `FAQ`: the Services cards and FAQ tabs.
- `HERO_SLIDES`: image names in `public/hero/` for the hero slideshow.
- `EXPERIENCE`: roles, dates and bullet points.
- `FACTS`: the figures in "On the record" (`value` rolls up). Keep every one traceable to the CV.

To update the CV, replace `public/Temiloluwa_Adebayo_CV.pdf`.

## Deployment

The repository is connected to Vercel; every push to `main` redeploys automatically. Vercel detects Vite with no extra configuration.

## Author

**Temiloluwa Adebayo** · [GitHub](https://github.com/temiloluwa-adebayo) · [LinkedIn](https://www.linkedin.com/in/temiloluwa-adebayo-4843ba377) · [temidaniel124@gmail.com](mailto:temidaniel124@gmail.com)
