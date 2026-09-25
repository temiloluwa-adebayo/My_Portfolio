import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { SimpleIcon } from 'simple-icons';
import { ArrowRight } from 'lucide-react';

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: 'spring', stiffness: 260, damping: 24, mass: 0.9 } as const;

// --- Layout ---

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1180px] px-5 md:px-8 ${className}`}>{children}</div>
);

/** Rises into place with a slight 3D tilt that flattens as it arrives. */
export const Reveal = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateX: 10, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 1, ease: EASE, delay }}
    style={{ transformPerspective: 1200, transformOrigin: '50% 100%' }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ title, lede, align = 'center' }: { title: string; lede: string; align?: 'center' | 'left' }) => (
  <Reveal className={`mb-12 md:mb-16 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
    <h2 className="font-display text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.02em] md:text-[3.5rem]">{title}</h2>
    <p className="mt-5 text-[1.05rem] leading-relaxed text-muted md:text-lg">{lede}</p>
  </Reveal>
);

// --- Actions: primary is amber and only amber; secondary is outlined; tertiary is a link ---

type ActionProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'md' | 'sm';
  external?: boolean;
  download?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
};

export const Action = ({ href, onClick, children, variant = 'primary', size = 'md', external, download, className = '', type = 'button', disabled, ariaLabel }: ActionProps) => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.96] disabled:pointer-events-none disabled:opacity-60';
  const sizes = size === 'md' ? 'h-12 px-6 text-[0.95rem]' : 'h-10 px-4 text-sm';
  const variants = {
    primary:
      'bg-accent text-on-accent shadow-[0_8px_24px_-8px_rgba(255,178,36,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-accent-hover hover:shadow-[0_12px_32px_-8px_rgba(255,178,36,0.7),inset_0_1px_0_rgba(255,255,255,0.35)]',
    secondary: 'border border-line-strong bg-page/40 text-fg backdrop-blur-sm hover:border-fg/50 hover:bg-raised',
    tertiary: 'h-auto! px-0! text-fg underline decoration-line-strong decoration-1 hover:decoration-fg',
  };
  const cls = `${base} ${sizes} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

export const ArrowIcon = () => (
  <ArrowRight size={17} strokeWidth={2.2} className="transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5" />
);

// --- Brand marks ---

/** Brand mark from simple-icons; marks too dark to read on a panel render light. */
export const BrandIcon = ({ icon, size = 18 }: { icon: SimpleIcon; size?: number }) => {
  const hex = icon.hex;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const PANEL_LUMINANCE = 0.0116; // #1b1b1b
  const contrast = (luminance + 0.05) / (PANEL_LUMINANCE + 0.05);
  const fill = contrast < 4.5 ? '#efede8' : `#${hex}`;
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill={fill} className="shrink-0">
      <path d={icon.path} />
    </svg>
  );
};

// --- 3D tilt with a light sheen, pointer devices only ---

export const Tilt = ({ children, className = '', max = 6 }: { children: ReactNode; className?: string; max?: number }) => {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const sheenX = useTransform(px, [0, 1], ['0%', '100%']);
  const sheenY = useTransform(py, [0, 1], ['0%', '100%']);
  const sheen = useTransform([sheenX, sheenY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.07), transparent 60%)`);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const active = fine && !reduce;
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={active ? move : undefined}
      onPointerLeave={active ? leave : undefined}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      className={`relative ${className}`}
    >
      {children}
      {active && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: sheen }} />}
    </motion.div>
  );
};

// --- Rolling digits: each digit column scrolls to its value when in view ---

const DigitColumn = ({ digit, run }: { digit: number; run: boolean }) => (
  <span className="relative inline-block h-[1.15em] w-[0.62em] overflow-hidden align-bottom">
    <motion.span
      className="absolute inset-x-0 top-0 flex flex-col items-center"
      initial={false}
      animate={{ y: run ? `${-digit * 1.15}em` : '0em' }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.9 }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="block h-[1.15em] leading-[1.15em]">
          {i}
        </span>
      ))}
    </motion.span>
  </span>
);

export const RollingNumber = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const text = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (reduce) return <span>{text}</span>;
  return (
    <span ref={ref} className="inline-flex tabular-nums" aria-label={text}>
      <span aria-hidden="true" className="inline-flex items-end leading-[1.15em]">
        {text.split('').map((ch, i) =>
          /\d/.test(ch) ? <DigitColumn key={i} digit={Number(ch)} run={inView} /> : <span key={i}>{ch}</span>,
        )}
      </span>
    </span>
  );
};
