import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, FileText, Github, Mail, Play, RotateCcw, Search, Sparkles } from 'lucide-react';
import { PROJECTS, type Project } from '../data';
import { Action, Container, EASE, Reveal, SectionHead, Tilt } from './ui';

const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setDesktop(mq.matches);
    const on = () => setDesktop(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return desktop;
};

const hostOf = (p: Project) => p.frameLabel ?? (p.liveUrl ? new URL(p.liveUrl).host : '');

// --- Character-by-character label swap ---

const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => (
  <span className={`inline-flex ${className}`} aria-live="polite">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span key={text} className="inline-flex">
        {text.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: 10, opacity: 0, filter: 'blur(3px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -10, opacity: 0, filter: 'blur(3px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.012 }}
            style={{ whiteSpace: ch === ' ' ? 'pre' : undefined }}
            className="inline-block"
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  </span>
);

// --- Frame bar shared by every project image ---

const FrameBar = ({ project, children }: { project: Project; children?: React.ReactNode }) => (
  <div className="flex h-9 items-center gap-2 border-b border-line bg-raised px-4">
    <span className="flex gap-1.5" aria-hidden="true">
      <span className="size-2 rounded-full bg-line-strong" />
      <span className="size-2 rounded-full bg-line-strong" />
    </span>
    <span className={`ml-1 truncate text-[0.72rem] text-faint ${project.frameLabel ? '' : 'font-mono'}`}>{hostOf(project)}</span>
    <span className="ml-auto flex shrink-0 items-center gap-3">
      {children}
      {project.credit && (
        <a href={project.credit.url} target="_blank" rel="noopener noreferrer" className="text-[0.72rem] text-faint underline-offset-2 hover:text-fg hover:underline">
          {project.credit.name} / Unsplash
        </a>
      )}
    </span>
  </div>
);

// --- Screenshot slideshow ---

const Slideshow = ({ project }: { project: Project }) => {
  const images = project.slides ?? [project.image];
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-20%' });
  const reduce = useReducedMotion();

  const go = (next: number) => {
    setDir(next > i || (i === images.length - 1 && next === 0) ? 1 : -1);
    setI((next + images.length) % images.length);
  };

  useEffect(() => {
    if (reduce || paused || !inView || images.length < 2) return;
    const t = setTimeout(() => go(i + 1), 4200);
    return () => clearTimeout(t);
  });

  return (
    <figure
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-raised"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={`${project.title} screenshots`}
    >
      <FrameBar project={project}>
        {images.length > 1 && <span className="font-mono text-[0.72rem] text-faint tabular-nums">{i + 1}/{images.length}</span>}
      </FrameBar>
      <div className="group/slides relative aspect-[16/10] overflow-hidden">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={`${project.title}, screen ${i + 1} of ${images.length}`}
            width={1200}
            height={750}
            loading="lazy"
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: `${d * 12}%`, opacity: 0, scale: 1.04 }),
              center: { x: '0%', opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: `${d * -12}%`, opacity: 0, scale: 0.98 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: EASE }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(i + 1);
              else if (info.offset.x > 60) go(i - 1);
            }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover object-top active:cursor-grabbing"
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label="Previous screen"
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-page/75 text-fg opacity-0 backdrop-blur transition-opacity group-hover/slides:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next screen"
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-page/75 text-fg opacity-0 backdrop-blur transition-opacity group-hover/slides:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-page/70 px-2.5 py-1.5 backdrop-blur">
              {images.map((src, k) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => go(k)}
                  aria-label={`Show screen ${k + 1}`}
                  aria-current={k === i ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-5 bg-fg' : 'w-1.5 bg-fg/35 hover:bg-fg/60'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </figure>
  );
};

// --- LeadForge: the pipeline, animated on demand ---

const STEP_ICONS = [Search, Sparkles, FileText, Mail];

const PipelineDemo = ({ project }: { project: Project }) => {
  const steps = project.pipeline ?? [];
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle');
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (status !== 'running') return;
    const t = setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else setStatus('done');
    }, 1300);
    return () => clearTimeout(t);
  }, [status, step, steps.length]);

  const start = () => {
    setStep(0);
    setStatus('running');
  };

  const Icon = STEP_ICONS[step] ?? Sparkles;

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-raised">
      <FrameBar project={project} />
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt="" width={1200} height={750} loading="lazy" className="absolute inset-0 h-full w-full object-cover brightness-[0.45]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-5">
          <ol className="flex w-full max-w-sm items-center gap-1.5" aria-label="Pipeline steps">
            {steps.map((s, k) => {
              const done = status === 'done' || (status === 'running' && k < step);
              const current = status === 'running' && k === step;
              return (
                <li key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/15" aria-label={`${s}${done ? ', done' : current ? ', running' : ''}`}>
                  <motion.span
                    className="block h-full rounded-full bg-fg"
                    initial={false}
                    animate={{ width: done ? '100%' : current ? '60%' : '0%' }}
                    transition={{ duration: current ? 1.2 : 0.4, ease: EASE }}
                  />
                </li>
              );
            })}
          </ol>

          <motion.div layout transition={{ type: 'spring', stiffness: 260, damping: 24 }} className="rounded-full border border-white/15 bg-page/80 p-1.5 backdrop-blur-md">
            <AnimatePresence mode="popLayout" initial={false}>
              {status === 'idle' && (
                <motion.button
                  key="idle"
                  type="button"
                  onClick={start}
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  className="flex h-11 items-center gap-2.5 rounded-full bg-fg px-5 text-[0.95rem] font-medium text-page transition-transform active:scale-95"
                >
                  <Play size={16} className="fill-current" aria-hidden="true" /> Run the pipeline
                </motion.button>
              )}
              {status === 'running' && (
                <motion.div
                  key="running"
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  className="flex h-11 items-center gap-3 px-4 text-fg"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span key={step} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                      <Icon size={18} aria-hidden="true" />
                    </motion.span>
                  </AnimatePresence>
                  <AnimatedText text={steps[step]} className="text-[0.95rem] font-medium whitespace-nowrap" />
                  <span className="font-mono text-[0.75rem] text-faint tabular-nums">
                    {step + 1}/{steps.length}
                  </span>
                </motion.div>
              )}
              {status === 'done' && (
                <motion.button
                  key="done"
                  type="button"
                  onClick={start}
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                  className="flex h-11 items-center gap-2.5 rounded-full px-4 text-[0.95rem] text-fg"
                >
                  <Check size={18} className="text-live" aria-hidden="true" />
                  <span className="font-medium">Sent. Zero manual steps.</span>
                  <RotateCcw size={15} className="text-faint" aria-label="Run again" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          <p className="text-center text-[0.75rem] text-white/60">Animation of LeadForge’s real steps · not a live run</p>
        </div>
      </div>
    </figure>
  );
};

// --- Featured: stacked cards that tuck behind each other on scroll ---

const Facts = ({ project, limit }: { project: Project; limit?: number }) => (
  <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg" aria-label="Key facts">
    {project.facts.slice(0, limit).map((f) => (
      <li key={f} className="flex items-center gap-1.5">
        <Check size={14} className="text-live" aria-hidden="true" />
        {f}
      </li>
    ))}
  </ul>
);

const Links = ({ project }: { project: Project }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
    {project.liveUrl && (
      <Action href={project.liveUrl} variant="secondary" size="sm" external>
        Live website <ArrowUpRight size={15} aria-hidden="true" />
      </Action>
    )}
    {project.githubUrl && (
      <Action href={project.githubUrl} variant="tertiary" size="sm" external>
        <Github size={15} aria-hidden="true" /> Source code
      </Action>
    )}
    {project.note && <p className="text-sm text-faint">{project.note}</p>}
  </div>
);

const FeaturedCard = ({ project, index, total, progress, desktop }: { project: Project; index: number; total: number; progress: MotionValue<number>; desktop: boolean }) => {
  const targetScale = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.18]);

  return (
    <div className={desktop ? 'sticky top-0 flex h-screen items-center' : ''}>
      <motion.article
        style={desktop ? { scale, top: `${index * 26}px` } : undefined}
        className="relative w-full origin-top rounded-[2rem] border border-line bg-panel p-3 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] md:p-4"
      >
        <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-10">
          <div className="order-2 flex flex-col gap-5 px-3 pb-4 md:order-1 md:py-6 md:pl-6">
            <div>
              <p className="text-sm text-faint">{project.kind}</p>
              <h3 className="mt-2 font-display text-[2.2rem] leading-none font-semibold tracking-[-0.02em] md:text-[2.8rem]">{project.title}</h3>
            </div>
            <p className="text-[0.98rem] leading-relaxed text-muted">{project.description}</p>
            <Facts project={project} />
            <p className="text-[0.82rem] text-faint">{project.tags.join(' · ')}</p>
            <Links project={project} />
          </div>
          <div className="order-1 md:order-2">{project.pipeline ? <PipelineDemo project={project} /> : <Slideshow project={project} />}</div>
        </div>
        {desktop && <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[2rem] bg-page" />}
      </motion.article>
    </div>
  );
};

// --- Compact grid for the rest ---

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <Reveal delay={(index % 3) * 0.08} className="h-full">
    <Tilt className="h-full rounded-[1.75rem]">
      <article className="group flex h-full flex-col rounded-[1.75rem] border border-line bg-panel p-2.5 transition-colors duration-500 hover:border-line-strong">
        <figure className="overflow-hidden rounded-2xl border border-line bg-raised">
          <FrameBar project={project} />
          <img
            src={project.image}
            alt={project.credit ? `Illustrative photo for ${project.title}` : `${project.title}, screenshot`}
            width={1200}
            height={750}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top brightness-[0.85] transition-[transform,filter] duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03] group-hover:brightness-100"
          />
        </figure>
        <div className="flex flex-1 flex-col gap-3 px-3 pt-5 pb-3">
          <div>
            <h3 className="font-display text-[1.6rem] leading-none font-semibold tracking-[-0.01em]">{project.title}</h3>
            <p className="mt-1.5 text-sm text-faint">{project.kind}</p>
          </div>
          <p className="line-clamp-3 text-[0.93rem] leading-relaxed text-muted">{project.description}</p>
          <Facts project={project} limit={2} />
          <div className="mt-auto pt-3">
            <Links project={project} />
          </div>
        </div>
      </article>
    </Tilt>
  </Reveal>
);

export const Work = () => {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const stackRef = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });
  const stacked = desktop && !reduce;

  return (
    <section id="work" className="relative py-24 md:py-32">
      <Container>
        <SectionHead title="Selected work" lede="Systems in production, built end to end. The first three in depth; the rest below." />
        <div ref={stackRef} className={stacked ? '' : 'flex flex-col gap-6'}>
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} total={featured.length} progress={scrollYProgress} desktop={stacked} />
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-[1.9rem] leading-none font-semibold tracking-[-0.01em] md:text-[2.4rem]">More shipped systems</h3>
            <p className="max-w-sm text-[0.95rem] text-muted">Desktop, mobile and web: offline exam software, store-published apps and AI platforms.</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
