import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import type { SimpleIcon } from 'simple-icons';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from 'lucide-react';
import { EXPERIENCE, FACTS, HERO_TOOLS, NAV, PROFILE, PROJECTS, STACK, type Fact, type Project } from './data';

const EASE = [0.16, 1, 0.3, 1] as const;

// --- Primitives ---

/** Brand mark from simple-icons; marks too dark to read on a panel render light on the dark ground. */
const BrandIcon = ({ icon, size = 18 }: { icon: SimpleIcon; size?: number }) => {
  const hex = icon.hex;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const PANEL_LUMINANCE = 0.0116; // #1b1b1b
  const contrast = (luminance + 0.05) / (PANEL_LUMINANCE + 0.05);
  const fill = contrast < 3.5 ? '#ededed' : `#${hex}`;
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill={fill} className="shrink-0">
      <path d={icon.path} />
    </svg>
  );
};

type PillProps = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  external?: boolean;
  download?: boolean;
  className?: string;
};

const Pill = ({ href, children, variant = 'solid', external, download, className = '' }: PillProps) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    {...(download ? { download: '' } : {})}
    className={`group inline-flex items-center gap-2 rounded-full text-sm font-medium transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.97] ${
      variant === 'solid'
        ? 'bg-fg px-5 py-2.5 text-page hover:bg-white'
        : 'border border-line-strong px-5 py-2.5 text-fg hover:border-fg/60 hover:bg-raised'
    } ${className}`}
  >
    {children}
  </a>
);

const PillArrow = () => (
  <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5" />
);

const Reveal = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHead = ({ title, lede }: { title: string; lede: string }) => (
  <Reveal className="mx-auto mb-14 max-w-xl text-center md:mb-16">
    <h2 className="text-[2rem] font-normal leading-tight tracking-[-0.03em] md:text-[2.75rem]">{title}</h2>
    <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{lede}</p>
  </Reveal>
);

const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1080px] px-5 md:px-8 ${className}`}>{children}</div>
);

// --- Nav ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-line bg-page/80 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <a href="#top" className="flex items-center gap-3 rounded-full" aria-label={`${PROFILE.name}, back to top`}>
          <img src="/avatar.webp" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
          <span className="text-[0.95rem] font-medium tracking-tight text-fg">{PROFILE.name}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
          <Pill href="#contact" className="py-2! pr-4! pl-4!">
            Contact me <PillArrow />
          </Pill>
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-full text-fg md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden md:hidden"
          >
            <Container className="flex flex-col gap-1 pb-6">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-3 text-2xl font-light tracking-tight text-fg">
                  {item.label}
                </a>
              ))}
              <Pill href="#contact" className="mt-4 w-fit">
                Contact me <PillArrow />
              </Pill>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero ---

const Hero = () => (
  <section id="top" className="pt-28 pb-20 md:pt-36 md:pb-28">
    <Container className="grid items-stretch gap-10 md:grid-cols-[1.05fr_1fr] md:gap-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
        className="flex min-w-0 flex-col justify-center md:py-6"
      >
        <div className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-panel py-1.5 pr-4 pl-3 text-sm text-muted">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-live/60 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-live" />
          </span>
          {PROFILE.availability}
          <span className="hidden text-faint sm:inline">· {PROFILE.availabilityDetail}</span>
        </div>

        <h1 className="text-[3.1rem] leading-[0.98] font-light tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]">{PROFILE.role}</h1>

        <p className="mt-6 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted md:text-lg">{PROFILE.intro}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Pill href="#work" variant="outline">
            See my work
          </Pill>
          <Pill href="#contact">
            Contact me <PillArrow />
          </Pill>
        </div>

        <div className="marquee marquee-mask mt-12 overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex w-max gap-3" style={{ '--marquee-duration': '40s' } as CSSProperties}>
            {[...HERO_TOOLS, ...HERO_TOOLS].map((icon, i) => (
              <div key={i} className="grid size-14 place-items-center rounded-2xl border border-line bg-panel">
                <BrandIcon icon={icon} size={24} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        className="relative overflow-hidden rounded-[1.75rem] border border-line bg-panel"
      >
        <img
          src="/profile.webp"
          alt="Portrait of Temiloluwa Adebayo"
          width={800}
          height={1336}
          fetchPriority="high"
          className="aspect-[4/5] h-full max-h-[26rem] w-full object-cover object-[50%_28%] sm:max-h-[34rem] md:max-h-none"
        />
      </motion.div>
    </Container>
  </section>
);

// --- Skills ---

const Skills = () => (
  <section id="skills" className="bg-band py-24 md:py-32">
    <Container>
      <SectionHead title="Tools I build with" lede="The stack behind fourteen production systems, from the database and automation layer to store-ready apps." />
      <Reveal className="mx-auto flex max-w-[52rem] flex-wrap justify-center gap-2.5">
        {STACK.map((tool) => (
          <span
            key={tool.name}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-panel py-2 pr-4 pl-3 text-[0.95rem] text-fg transition-colors duration-300 hover:border-line-strong hover:bg-raised"
          >
            <BrandIcon icon={tool.icon} size={16} />
            {tool.name}
          </span>
        ))}
      </Reveal>
    </Container>
  </section>
);

// --- Work ---

const ProjectMedia = ({ project }: { project: Project }) => {
  if (project.image) {
    const host = project.liveUrl ? new URL(project.liveUrl).host : '';
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-raised">
        <div className="flex h-8 items-center gap-2 border-b border-line px-3.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="truncate font-mono text-[0.7rem] text-faint">{host}</span>
        </div>
        <img
          src={project.image}
          alt={`${project.title} live site, landing screen`}
          width={1200}
          height={750}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top brightness-[0.82] transition-[transform,filter] duration-700 ease-(--ease-out-expo) group-hover:scale-[1.02] group-hover:brightness-100"
        />
      </div>
    );
  }

  const steps = project.flow ?? [];
  return (
    <div className="grid aspect-[16/10.6] grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-6 rounded-2xl border border-line bg-raised p-5 sm:p-7">
      <p className="self-end text-[1.4rem] leading-[1.05] font-light tracking-[-0.03em] text-fg sm:text-[2rem]">{project.facts[0]}</p>
      <ol className="flex flex-col justify-center" aria-label={`How ${project.title} runs`}>
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step} className="flex flex-col items-end">
              <span
                className={`rounded-full border px-3.5 py-1.5 text-[0.85rem] whitespace-nowrap ${
                  last ? 'border-fg bg-fg text-page' : 'border-line-strong bg-panel text-fg'
                }`}
              >
                {step}
              </span>
              {!last && <span className="mr-6 h-4 w-px bg-line-strong sm:h-5" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <Reveal delay={(index % 2) * 0.08}>
    <article className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-panel p-2.5 transition-colors duration-500 hover:border-line-strong">
      <ProjectMedia project={project} />
      <div className="flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-5">
        <h3 className="text-2xl font-normal tracking-[-0.02em]">{project.title}</h3>
        <p className="mt-1 text-[0.95rem] text-faint">{project.kind}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-fg" aria-label="Key facts">
          {(project.flow ? project.facts.slice(1) : project.facts).map((fact) => (
            <li key={fact} className="flex items-center gap-1.5">
              <Check size={14} className="text-live" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.82rem] leading-relaxed text-faint">{project.tags.join(' · ')}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
          {project.githubUrl && (
            <Pill href={project.githubUrl} variant="outline" external className="px-4! py-2!">
              <Github size={15} /> Source code
            </Pill>
          )}
          {project.liveUrl && (
            <Pill href={project.liveUrl} external className="px-4! py-2!">
              Live website <ArrowUpRight size={15} />
            </Pill>
          )}
          {project.note && <p className="text-sm text-faint">{project.note}</p>}
        </div>
      </div>
    </article>
  </Reveal>
);

const Work = () => (
  <section id="work" className="py-24 md:py-32">
    <Container>
      <SectionHead title="Projects I’ve shipped" lede="Complete systems, built end to end: architecture, security, automation and deployment." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Container>
  </section>
);

// --- Experience ---

const Experience = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="bg-band py-24 md:py-32">
      <Container className="max-w-[820px]!">
        <SectionHead title="Where I’ve worked" lede="Three years across founding-engineer, freelance and agency roles, most of it shipping alone." />
        <Reveal className="flex flex-col gap-3">
          {EXPERIENCE.map((role, i) => {
            const isOpen = open === i;
            const panelId = `role-${i}`;
            return (
              <div key={role.title + role.period} className={`rounded-3xl border bg-panel transition-colors duration-300 ${isOpen ? 'border-line-strong' : 'border-line hover:border-line-strong'}`}>
                <h3 className="text-base">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start gap-4 rounded-3xl px-5 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[1.1rem] font-normal tracking-[-0.01em] text-fg sm:text-xl">{role.title}</span>
                      <span className="mt-1 block text-[0.95rem] text-muted">{role.company}</span>
                      <span className="mt-1 block font-mono text-[0.78rem] text-faint tabular-nums sm:hidden">{role.period}</span>
                    </span>
                    <span className="hidden pt-1 font-mono text-[0.8rem] whitespace-nowrap text-faint tabular-nums sm:block">{role.period}</span>
                    <ChevronDown
                      size={20}
                      aria-hidden="true"
                      className={`mt-1 shrink-0 text-muted transition-transform duration-500 ease-(--ease-out-expo) ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                        <p className="text-[0.85rem] text-faint">{role.meta}</p>
                        <ul className="mt-4 space-y-2.5">
                          {role.points.map((point) => (
                            <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                              <span className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
        <Reveal className="mt-10 flex justify-center">
          <Pill href={PROFILE.cv} download>
            Download my CV <Download size={16} />
          </Pill>
        </Reveal>
      </Container>
    </section>
  );
};

// --- Proof ---

const FactCard = ({ fact }: { fact: Fact }) => (
  <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-panel p-6 sm:p-7">
    <p className="text-[1.15rem] leading-snug tracking-[-0.01em] text-muted">
      <span className="font-medium text-fg">{fact.lead}</span> {fact.rest}
    </p>
    <p className="text-[0.85rem] text-faint">{fact.source}</p>
  </div>
);

const Proof = () => {
  const reduceMotion = useReducedMotion();
  const rows = [FACTS.slice(0, 4), FACTS.slice(4)];
  return (
    <section id="proof" className="overflow-hidden py-24 md:py-32">
      <Container>
        <SectionHead title="On the record" lede="Figures from shipped systems, plus the credentials behind them. Every one is on my CV." />
      </Container>
      {reduceMotion ? (
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <li key={fact.lead}>
                <FactCard fact={fact} />
              </li>
            ))}
          </ul>
        </Container>
      ) : (
      <Reveal className="flex flex-col gap-4">
        {rows.map((row, r) => (
          <div key={r} className="marquee marquee-mask overflow-hidden">
            <ul className="marquee-track flex w-max gap-4" data-reverse={r === 1 ? '' : undefined} style={{ '--marquee-duration': '70s' } as CSSProperties}>
              {[...row, ...row].map((fact, i) => (
                <li key={i} aria-hidden={i >= row.length ? true : undefined} className="w-[19rem] shrink-0 sm:w-[22rem]">
                  <FactCard fact={fact} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
      )}
    </section>
  );
};

// --- Contact ---

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className="pb-16 md:pb-20">
      <Container>
        <Reveal>
          <div className="rounded-[2rem] border border-line bg-panel px-6 py-16 text-center sm:px-10 md:py-24">
            <img src="/avatar.webp" alt="" width={64} height={64} className="mx-auto mb-8 size-16 rounded-full object-cover ring-1 ring-line-strong ring-offset-4 ring-offset-panel" />
            <h2 className="mx-auto max-w-[14ch] text-[2.5rem] leading-[1.02] font-light tracking-[-0.04em] md:text-[4rem]">
              Let’s build something that lasts
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Open to remote, contract and full-time roles, and to commissioned systems.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex flex-wrap justify-center gap-3">
                <Pill href={`mailto:${PROFILE.email}`}>
                  Email me <PillArrow />
                </Pill>
                <Pill href={PROFILE.cv} variant="outline" download>
                  Download CV <Download size={16} />
                </Pill>
              </div>
              <button
                type="button"
                onClick={copy}
                className="group mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
              >
                {PROFILE.email}
                {copied ? <Check size={15} className="text-live" /> : <Copy size={15} className="opacity-60 group-hover:opacity-100" />}
                <span className="sr-only" aria-live="polite">
                  {copied ? 'Email address copied' : 'Copy email address'}
                </span>
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

// --- Footer ---

const Footer = () => (
  <footer className="pb-10">
    <Container>
      <div className="flex flex-col justify-between gap-10 pb-10 md:flex-row">
        <div className="max-w-xs">
          <div className="flex items-center gap-3">
            <img src="/avatar.webp" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
            <span className="font-medium tracking-tight text-fg">{PROFILE.name}</span>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">Complete, production-grade systems that run themselves.</p>
          <div className="mt-5 flex gap-2">
            {[
              { href: PROFILE.github, label: 'GitHub', icon: Github },
              { href: PROFILE.linkedin, label: 'LinkedIn', icon: Linkedin },
              { href: `mailto:${PROFILE.email}`, label: 'Email', icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid size-9 place-items-center rounded-full border border-line bg-panel text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 md:items-end">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-[0.95rem] text-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="border-t border-line pt-8 text-center text-sm text-faint">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React and Vite.
      </p>
    </Container>
  </footer>
);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-page">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Skills />
        <Work />
        <Experience />
        <Proof />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
