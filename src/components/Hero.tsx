import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react';
import { Download } from 'lucide-react';
import { HERO_SLIDES, PROFILE } from '../data';
import { Action, ArrowIcon, Container, EASE, Tilt } from './ui';

const SLIDE_MS = 6500;

const words: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -70, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 20, stiffness: 110 } },
};

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, ease: EASE, delay },
});

const PROOF = ['14 production systems', 'Apps on 3 stores', 'EC-Council CEH'];

export const Hero = () => {
  const reduce = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      if (!document.hidden) setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [reduce, slide]);

  const [first, second] = PROFILE.headline.split(' that ');

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-24">
      {/* Background slideshow: decorative, generated atmosphere */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_98%)]" style={reduce ? undefined : { y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={HERO_SLIDES[slide]}
            src={`/hero/${HERO_SLIDES[slide]}.webp`}
            srcSet={`/hero/${HERO_SLIDES[slide]}-sm.webp 960w, /hero/${HERO_SLIDES[slide]}.webp 1920w`}
            sizes="100vw"
            alt=""
            fetchPriority={slide === 0 ? 'high' : 'auto'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="kenburns absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--color-page)_6%,rgba(18,18,18,0.78)_42%,rgba(18,18,18,0.12)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(to_top,var(--color-page),transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,rgba(18,18,18,0.8),transparent)]" />

      <Container>
        <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div className="min-w-0">
            <motion.div {...rise(0.15)} className="mb-5 inline-flex items-center md:mb-7 gap-2.5 rounded-full border border-line-strong bg-page/60 py-1.5 pr-4 pl-3 text-sm text-fg backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-live/60 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-live" />
              </span>
              {PROFILE.availability}
              <span className="hidden text-muted sm:inline">· {PROFILE.availabilityDetail}</span>
            </motion.div>

            <motion.h1
              variants={words}
              initial="hidden"
              animate="show"
              style={{ perspective: 800 }}
              className="font-display text-[2.9rem] leading-[0.95] font-semibold tracking-[-0.03em] sm:text-7xl lg:text-[5.75rem]"
            >
              {[first, `that ${second}`].map((line, li) => (
                <span key={li} className={`block ${li === 1 ? 'text-fg/70' : ''}`}>
                  {line.split(' ').map((w, i) => (
                    <motion.span key={i} variants={word} className="mr-[0.22em] inline-block origin-bottom last:mr-0">
                      {w}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            <motion.p {...rise(0.9)} className="mt-6 max-w-[36rem] text-[1.05rem] leading-relaxed text-muted md:mt-7 md:text-lg">
              <span className="text-fg">{PROFILE.name}, full-stack software engineer building AI-integrated systems.</span> {PROFILE.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 140, delay: 1.05 }}
              className="mt-7 flex flex-wrap items-center gap-3 md:mt-9"
            >
              <Action href="#contact">
                Start a project <ArrowIcon />
              </Action>
              <Action href="#work" variant="secondary">
                See my work
              </Action>
              <Action href={PROFILE.cv} variant="tertiary" download className="ml-2 text-sm">
                <Download size={15} aria-hidden="true" /> Download CV
              </Action>
            </motion.div>

            <motion.ul {...rise(1.2)} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted md:mt-10" aria-label="Highlights">
              {PROOF.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-fg/50" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: -14, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, rotateY: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.4 }}
            style={{ transformPerspective: 1200 }}
            className="mx-auto w-full max-w-[26rem] lg:max-w-none"
          >
            <Tilt className="rounded-[2rem]">
              <figure className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-panel shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                <img
                  src="/profile.webp"
                  alt="Portrait of Temiloluwa Adebayo"
                  width={800}
                  height={1336}
                  className="aspect-[4/5] w-full object-cover object-[50%_28%]"
                />
                <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-page/70 px-4 py-3 backdrop-blur-md">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-fg">{PROFILE.name}</span>
                    <span className="block truncate text-[0.8rem] text-muted">{PROFILE.location}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-[0.78rem] text-live">
                    <span className="size-1.5 rounded-full bg-live" aria-hidden="true" />
                    Open to work
                  </span>
                </figcaption>
              </figure>
            </Tilt>
          </motion.div>
        </motion.div>
      </Container>

      {/* Slide progress */}
      {!reduce && (
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 gap-2 md:flex" role="group" aria-label="Background images">
          {HERO_SLIDES.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Show background ${i + 1} of ${HERO_SLIDES.length}`}
              aria-pressed={i === slide}
              className="group relative h-6 w-10"
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                {i === slide && (
                  <motion.span
                    key={slide}
                    className="absolute inset-y-0 left-0 rounded-full bg-fg"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
