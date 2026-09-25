import type { SimpleIcon } from 'simple-icons';
import {
  siAppstore,
  siDart,
  siDocker,
  siElectron,
  siExpress,
  siFastapi,
  siFlutter,
  siFramer,
  siGit,
  siGoogleplay,
  siJavascript,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRailway,
  siReact,
  siSqlite,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
} from 'simple-icons';

// --- Identity ---

export const PROFILE = {
  name: 'Temiloluwa Adebayo',
  role: 'Full-Stack Engineer.',
  intro:
    "Hi, I'm Temiloluwa, a software engineer in Nigeria building AI-integrated systems for web, mobile and desktop. I take products from database architecture and automation through to store-published apps, working solo or leading a small team.",
  email: 'temidaniel124@gmail.com',
  github: 'https://github.com/temiloluwa-adebayo',
  linkedin: 'https://www.linkedin.com/in/temiloluwa-adebayo-4843ba377',
  cv: '/Temiloluwa_Adebayo_CV.pdf',
  availability: 'Available for work',
  availabilityDetail: 'Remote, contract or full-time',
};

export const NAV = [
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Proof', href: '#proof' },
];

// --- Stack ---

export type Tool = { name: string; icon: SimpleIcon };

export const STACK: Tool[] = [
  { name: 'TypeScript', icon: siTypescript },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Python', icon: siPython },
  { name: 'Dart', icon: siDart },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'React Native', icon: siReact },
  { name: 'Flutter', icon: siFlutter },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Framer Motion', icon: siFramer },
  { name: 'Electron', icon: siElectron },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Express', icon: siExpress },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Supabase', icon: siSupabase },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'SQLite', icon: siSqlite },
  { name: 'n8n', icon: siN8n },
  { name: 'Stripe', icon: siStripe },
  { name: 'Google Play', icon: siGoogleplay },
  { name: 'App Store', icon: siAppstore },
  { name: 'Vercel', icon: siVercel },
  { name: 'Railway', icon: siRailway },
  { name: 'Docker', icon: siDocker },
  { name: 'Git', icon: siGit },
];

/** The hero's drifting tile row: the tools most of the shipped work runs on. */
export const HERO_TOOLS: SimpleIcon[] = [
  siNextdotjs,
  siSupabase,
  siN8n,
  siReact,
  siElectron,
  siFlutter,
  siPostgresql,
  siStripe,
  siTypescript,
  siTailwindcss,
];

// --- Work ---

export type Project = {
  id: string;
  title: string;
  kind: string;
  description: string;
  facts: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  /** Text in the image frame's top bar; defaults to the live site's host. */
  frameLabel?: string;
  /** Attribution for stock photography. */
  credit?: { name: string; url: string };
  note?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'clarix',
    title: 'Clarix',
    kind: 'Cross-cooperative loan coordination',
    description:
      'Hospital staff often belong to several cooperatives, and each one approves loans without seeing what the member already owes elsewhere. Clarix checks a member’s combined deductions across every cooperative against the one-third-of-salary cap, in real time, before a loan is approved. In use across five staff cooperatives at a federal hospital.',
    facts: ['5 cooperatives', 'One-third salary cap check', 'RLS on every table'],
    tags: ['Next.js 16', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'pgTAP'],
    liveUrl: 'https://clarix-3w5i.vercel.app/',
    image: '/work/clarix.webp',
  },
  {
    id: 'leadforge',
    title: 'LeadForge',
    kind: 'Automated outbound sales engine',
    description:
      'A nine-phase pipeline that runs without human input. It finds businesses on Google, scores their digital presence, writes a personalised PDF proposal in Google Docs and sends the cold email through Gmail, all from one button.',
    facts: ['Up to 4,000 leads a day', '9 phases', 'Zero manual steps'],
    tags: ['Next.js 14', 'n8n', 'Supabase', 'ScrapingBee', 'Gmail API'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/LeadForge',
    image: '/work/leadforge.webp',
    frameLabel: 'Illustrative photo',
    credit: { name: 'Justin Morgan', url: 'https://unsplash.com/photos/D2TZ-ashGzc' },
  },
  {
    id: 'vooltflow',
    title: 'VooltFlow',
    kind: 'AI affiliate automation',
    description:
      'Searches Amazon, Jumia and Konga in parallel, filters on rating, reviews and price, builds the affiliate links, finds trending short videos as social proof and publishes a GPT-4o-written listing to WooCommerce.',
    facts: ['Under 60 s end to end', '3 marketplaces in parallel', 'GPT-4o copy'],
    tags: ['Next.js 15', 'GPT-4o', 'n8n', 'WooCommerce API', 'Supabase'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/vooltflow',
    liveUrl: 'https://vooltflow-fmql.vercel.app/',
    image: '/work/vooltflow.webp',
  },
  {
    id: 'voolttrip',
    title: 'VooltTrip',
    kind: 'AI visa assistance platform',
    description:
      'A visa service built around trust: a 24/7 AI assistant trained on the service’s own knowledge, and client funds held by a verified third-party lawyer, released only on approval and refunded in full on rejection.',
    facts: ['24/7 AI consultation', 'Lawyer-held escrow', 'Full refund on rejection'],
    tags: ['AI assistant', 'Escrow model', 'React'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/VooltTrip',
    liveUrl: 'https://voolt-trip.vercel.app/',
    image: '/work/voolttrip.webp',
  },
  {
    id: 'voolt-academy',
    title: 'VOOLT Academy',
    kind: 'Invitation-only learning platform',
    description:
      'A closed LMS students enter only after payment is verified. n8n generates credentials and provisions accounts instantly, and weekly quizzes act as gates: nobody advances without passing them.',
    facts: ['Automated provisioning', 'Weekly quiz gates', 'No public access'],
    tags: ['React 19', 'Supabase', 'n8n', 'Tailwind CSS', 'RLS'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/Voolt_Academy',
    liveUrl: 'https://voolt-academy-8f72.vercel.app/',
    image: '/work/voolt-academy.webp',
  },
  {
    id: 'examforge',
    title: 'ExamForge CBT',
    kind: 'Offline-first desktop exam system',
    description:
      'Two isolated desktop apps, a student exam client and an admin console, with no shared interface or data access. Exams run fully offline; submissions save locally and sync to Supabase when the connection returns.',
    facts: ['Runs fully offline', 'Isolated student & admin apps', 'Auto-sync on reconnect'],
    tags: ['Electron', 'React', 'SQLite', 'Supabase'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/examforge-cbt',
    image: '/work/examforge.webp',
    frameLabel: 'Windows desktop app · welcome screen',
  },
  {
    id: 'eyebalance',
    title: 'EyeBalance',
    kind: 'Visual therapy app, desktop & mobile',
    description:
      'A Stripe-monetised Windows visual therapy application, published on the Microsoft Store, with a companion Flutter app on Google Play. Built solo from architecture to store submission for Flix Technologies.',
    facts: ['Microsoft Store', 'Google Play companion', 'Stripe subscriptions'],
    tags: ['Electron', 'Express', 'SQLite', 'Stripe', 'Flutter'],
    image: '/work/eyebalance.webp',
    frameLabel: 'Illustrative photo',
    credit: { name: 'Ion Fet', url: 'https://unsplash.com/photos/QRawWgV6gmo' },
    note: 'Client product under NDA · details on request',
  },
  {
    id: 'campuspress',
    title: 'CampusPress AI',
    kind: 'University journalism platform',
    description:
      'A structured newsroom for universities. Every article passes an AI analysis layer that flags bias, scores credibility and reads sentiment before an editor reviews it, and nothing publishes without editorial approval.',
    facts: ['AI bias detection', 'Credibility scoring', 'Enforced editorial gate'],
    tags: ['React Native', 'AI analysis', 'Supabase'],
    githubUrl: 'https://github.com/temiloluwa-adebayo/campuspress-ai',
    liveUrl: 'https://campuspress-ai.vercel.app/',
    image: '/work/campuspress.webp',
  },
];

// --- Experience ---

export type Role = {
  title: string;
  company: string;
  period: string;
  meta: string;
  points: string[];
};

export const EXPERIENCE: Role[] = [
  {
    title: 'Founding Engineer & Project Lead',
    company: 'VooltGroup Limited',
    period: 'Dec 2025 — Present',
    meta: 'Remote, United Kingdom · Part-time',
    points: [
      'Sole engineer and project lead, directing a small team of graphic designers and automation specialists.',
      'Architected and shipped six production systems end to end: LeadForge, VooltFlow, VOOLT Academy, VooltTrip, NEXA and Voolt.',
      'Stack: Next.js 14/15, React 19, TypeScript, Supabase, PostgreSQL, n8n, OpenAI GPT-4o, Vercel.',
    ],
  },
  {
    title: 'ML Software Engineer & Application Developer',
    company: 'Dot’s Institute of Technology',
    period: 'Oct 2025 — Present',
    meta: 'Remote · Freelance, retained after internship',
    points: [
      'Built a payslip automation tool for a government hospital, verified at a peak of 8,370 employees: weeks of manual distribution became same-day dispatch.',
      'Built Clarix (formerly PayHub Central), now in use across five hospital staff cooperatives.',
      'Built ExamForge CBT, an offline-first desktop exam system with automatic cloud sync.',
    ],
  },
  {
    title: 'Solo Software Engineer, Mobile & Desktop',
    company: 'Flix Technologies',
    period: 'Sep 2025 — Feb 2026',
    meta: 'Remote, Canada · Full-time',
    points: [
      'Owned the full lifecycle of commercial desktop and mobile apps, from architecture to store submission.',
      'Shipped EyeBalance (Windows, Stripe) and EyeBalance Mobile (Flutter, Google Play), plus Faithloom, Playback and CalcPro on the Microsoft Store and Google Play.',
      'Worked with Stripe Checkout and webhooks, Microsoft Store APIs (WinRT, MSIX), Google Play Billing and RevenueCat.',
    ],
  },
  {
    title: 'AI/ML Engineer, Data Analysis — Internship',
    company: 'Dot’s Institute of Technology',
    period: 'May 2025 — Oct 2025',
    meta: 'Abeokuta, Nigeria · On-site',
    points: [
      'Structured internship in AI/ML and data analysis; performance led directly to the retained freelance engagement.',
    ],
  },
  {
    title: 'Full-Stack Developer & Project Manager',
    company: 'Orayn Digital Agency',
    period: 'Apr 2023 — Jul 2025',
    meta: 'Remote · Full-time',
    points: [
      'Built and managed delivery of 7 automation systems and 2 mobile apps published on the Apple App Store. Details under NDA.',
    ],
  },
];

// --- Proof: production facts, each traceable to the CV ---

export type Fact = { lead: string; rest: string; source: string };

export const FACTS: Fact[] = [
  { lead: '8,370 hospital staff', rest: 'received their payslips the same day, instead of after weeks of manual distribution.', source: 'Payslip automation · Government hospital' },
  { lead: '5 hospital cooperatives', rest: 'check a member’s combined deductions on Clarix before approving a loan.', source: 'Clarix' },
  { lead: '4,000 leads a day', rest: 'is what the LeadForge pipeline was designed to handle, with no manual steps.', source: 'LeadForge' },
  { lead: 'Under 60 seconds', rest: 'from marketplace search to a published, AI-written WooCommerce listing.', source: 'VooltFlow' },
  { lead: '14 production systems', rest: 'designed and shipped across web, mobile and desktop since 2023.', source: 'Career to date' },
  { lead: 'Three app stores:', rest: 'apps published on the Microsoft Store, Google Play and the Apple App Store.', source: 'Flix Technologies · Orayn Digital' },
  { lead: 'Certified Ethical Hacker,', rest: 'EC-Council. Security is designed in, not bolted on.', source: 'Certified August 2026' },
  { lead: 'CGPA 4.47 / 5.0', rest: 'in Computer Software Engineering, specialising in AI and machine learning.', source: 'Chrisland University · graduating Oct 2026' },
];
