import type { SimpleIcon } from 'simple-icons';
import {
  siAppstore,
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
  role: 'Full-stack software engineer · AI-integrated systems',
  headline: 'I build systems that run themselves.',
  intro:
    'Web platforms, automation pipelines and store-published apps, taken from database design to deployment. Fourteen production systems shipped since 2023, most of them solo.',
  location: 'Ogun State, Nigeria · working remotely',
  site: 'https://my-portfolio-bice-delta-10.vercel.app',
  email: 'temidaniel124@gmail.com',
  github: 'https://github.com/temiloluwa-adebayo',
  linkedin: 'https://www.linkedin.com/in/temiloluwa-adebayo-4843ba377',
  cv: '/Temiloluwa_Adebayo_CV.pdf',
  availability: 'Available for work',
  availabilityDetail: 'Remote, contract or full-time',
};

export const NAV = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'FAQ', href: '#faq' },
];

/** Generated atmosphere images behind the hero (Canva AI); decorative only. */
export const HERO_SLIDES = ['desk', 'devices', 'architecture', 'servers'];

// --- Stack ---

export type Tool = { name: string; icon?: SimpleIcon };
export type ToolGroup = { label: string; tools: Tool[] };

export const STACK: ToolGroup[] = [
  {
    label: 'Frontend & mobile',
    tools: [
      { name: 'TypeScript', icon: siTypescript },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'React Native', icon: siReact },
      { name: 'Flutter', icon: siFlutter },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'Framer Motion', icon: siFramer },
    ],
  },
  {
    label: 'Backend & data',
    tools: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'Express', icon: siExpress },
      { name: 'Python', icon: siPython },
      { name: 'FastAPI', icon: siFastapi },
      { name: 'Supabase', icon: siSupabase },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'SQLite', icon: siSqlite },
    ],
  },
  {
    label: 'Automation & AI',
    tools: [
      { name: 'n8n', icon: siN8n },
      { name: 'OpenAI GPT-4o' },
      { name: 'Webhook workflows' },
      { name: 'Prompt engineering' },
    ],
  },
  {
    label: 'Desktop, stores & payments',
    tools: [
      { name: 'Electron', icon: siElectron },
      { name: 'Microsoft Store · MSIX' },
      { name: 'Google Play', icon: siGoogleplay },
      { name: 'App Store', icon: siAppstore },
      { name: 'Stripe', icon: siStripe },
      { name: 'RevenueCat' },
    ],
  },
  {
    label: 'Security & delivery',
    tools: [
      { name: 'Row-Level Security' },
      { name: 'RBAC' },
      { name: 'Supabase Auth', icon: siSupabase },
      { name: 'Git', icon: siGit },
      { name: 'Docker', icon: siDocker },
      { name: 'Vercel', icon: siVercel },
      { name: 'Railway', icon: siRailway },
    ],
  },
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
  /** Featured projects lead the Work section as large stacked cards. */
  featured?: boolean;
  /** Extra real screens for the featured slideshow. */
  slides?: string[];
  /** Steps for the animated pipeline demo. */
  pipeline?: string[];
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
    featured: true,
    slides: ['/work/slides/clarix-1.webp', '/work/slides/clarix-2.webp', '/work/slides/clarix-3.webp'],
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
    featured: true,
    pipeline: ['Discover businesses', 'Score their presence', 'Write the PDF proposal', 'Send through Gmail'],
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
    featured: true,
    slides: ['/work/slides/vooltflow-1.webp', '/work/slides/vooltflow-2.webp', '/work/slides/vooltflow-3.webp'],
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

/** `value` rolls up when the card enters view; the rest of the sentence is static. */
export type Fact = {
  value?: number;
  decimals?: number;
  before?: string;
  lead: string;
  rest: string;
  source: string;
  wide?: boolean;
};

export const FACTS: Fact[] = [
  { value: 8370, lead: 'hospital staff', rest: 'received their payslips the same day, instead of after weeks of manual distribution.', source: 'Payslip automation · Government hospital', wide: true },
  { value: 5, lead: 'hospital cooperatives', rest: 'check a member’s combined deductions on Clarix before approving a loan.', source: 'Clarix' },
  { value: 4000, lead: 'leads a day', rest: 'is what the LeadForge pipeline was designed to handle, with no manual steps.', source: 'LeadForge' },
  { before: 'Under', value: 60, lead: 'seconds', rest: 'from marketplace search to a published, AI-written WooCommerce listing.', source: 'VooltFlow' },
  { value: 14, lead: 'production systems', rest: 'designed and shipped across web, mobile and desktop since 2023.', source: 'Career to date', wide: true },
  { value: 3, lead: 'app stores', rest: 'Microsoft Store, Google Play and the Apple App Store, with billing and subscriptions.', source: 'Flix Technologies · Orayn Digital' },
  { lead: 'Certified Ethical Hacker', rest: '(EC-Council). Security is designed in, not bolted on.', source: 'Certified August 2026' },
  { before: 'CGPA', value: 4.47, decimals: 2, lead: '/ 5.0', rest: 'in Computer Software Engineering, specialising in AI and machine learning.', source: 'Chrisland University · graduating Oct 2026' },
];

// --- Services: scope from the CV, quoted per project ---

export type Service = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  stack: string;
};

export const SERVICES: Service[] = [
  {
    id: 'platform',
    title: 'Full-stack product build',
    summary: 'A production web platform, not a prototype: data model, auth, roles, dashboards and deployment.',
    includes: [
      'Architecture and PostgreSQL schema design',
      'Auth, roles and Row-Level Security on every table',
      'Admin and customer dashboards',
      'Deployment on Vercel, handed over documented',
    ],
    stack: 'Next.js · React · TypeScript · Supabase',
  },
  {
    id: 'automation',
    title: 'Workflow automation & AI',
    summary: 'Pipelines that do the repetitive work: finding, scoring, writing and sending, end to end.',
    includes: [
      'n8n workflows and webhook integrations',
      'GPT-4o writing, scoring and classification steps',
      'Document generation and email delivery',
      'Dashboards to watch the pipeline run',
    ],
    stack: 'n8n · OpenAI GPT-4o · Supabase · Gmail API',
  },
  {
    id: 'apps',
    title: 'Desktop & mobile apps',
    summary: 'Apps built for real conditions, including offline, and shipped through the stores.',
    includes: [
      'Offline-first Electron apps with cloud sync',
      'Flutter and React Native mobile apps',
      'Stripe, Google Play Billing and RevenueCat payments',
      'Microsoft Store (MSIX), Google Play and App Store submission',
    ],
    stack: 'Electron · Flutter · React Native · Stripe',
  },
];

// --- FAQ: answers drawn from the CV ---

export type FaqGroup = { id: string; label: string; items: { q: string; a: string }[] };

export const FAQ: FaqGroup[] = [
  {
    id: 'availability',
    label: 'Availability',
    items: [
      {
        q: 'Are you available right now?',
        a: 'Yes. I can start immediately on remote, contract or full-time work, and I’m open to discussing relocation.',
      },
      {
        q: 'Where are you based, and what languages do you work in?',
        a: 'Ogun State, Nigeria. I already work remotely with teams in the United Kingdom and Canada. I’m fluent in English and speak intermediate French.',
      },
      {
        q: 'Do you take full-time roles or only projects?',
        a: 'Both. I’m open to full-time engineering roles as well as contract builds and technical collaborations.',
      },
    ],
  },
  {
    id: 'working',
    label: 'Working together',
    items: [
      {
        q: 'Can you build a whole product on your own?',
        a: 'Yes. Most of the systems on this page were built solo, from the database schema to the store listing. At VooltGroup I also lead a small team of designers and automation specialists.',
      },
      {
        q: 'How do we start?',
        a: 'Send a message with what you’re building and where it stands. I’ll come back with questions, a proposed scope and a quote for that scope.',
      },
      {
        q: 'Can I see work that isn’t listed here?',
        a: 'Several apps I built for Flix Technologies and Orayn Digital Agency are under NDA. I can share more detail on request, within those agreements.',
      },
    ],
  },
  {
    id: 'technical',
    label: 'Technical',
    items: [
      {
        q: 'What’s your main stack?',
        a: 'Next.js, React and TypeScript on the front end; Supabase and PostgreSQL for data; n8n for automation; Electron and Flutter for desktop and mobile. Python and FastAPI when a project needs them.',
      },
      {
        q: 'How do you handle security?',
        a: 'By design: Row-Level Security, role-based access and strict multi-tenant data isolation, tested rather than assumed. I’m also an EC-Council Certified Ethical Hacker.',
      },
      {
        q: 'Can you publish to the app stores?',
        a: 'Yes. I’ve shipped apps to the Microsoft Store (MSIX), Google Play and the Apple App Store, including subscriptions and in-app billing.',
      },
    ],
  },
];
