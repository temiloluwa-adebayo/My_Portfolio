import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Download } from 'lucide-react';
import { EXPERIENCE, FACTS, PROFILE, STACK } from '../data';
import { Action, BrandIcon, Container, Reveal, RollingNumber, SectionHead } from './ui';

// --- Stack: grouped by layer; hovering a group brings it forward ---

export const Stack = () => {
  const [hot, setHot] = useState<string | null>(null);
  return (
    <section id="skills" className="bg-band py-24 md:py-32">
      <Container>
        <SectionHead align="left" title="Tools I build with" lede="Grouped by the layer they serve, from the interface down to security and delivery." />
        <div className="flex flex-col divide-y divide-line border-y border-line" onPointerLeave={() => setHot(null)}>
          {STACK.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.05}>
              <div
                onPointerEnter={() => setHot(group.label)}
                className={`grid gap-4 py-6 transition-opacity duration-500 md:grid-cols-[14rem_1fr] md:items-center md:gap-8 ${hot && hot !== group.label ? 'md:opacity-40' : ''}`}
              >
                <h3 className="font-display text-[1.2rem] font-medium tracking-[-0.01em]">{group.label}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <li
                      key={tool.name}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-panel py-1.5 pr-3.5 pl-2.5 text-[0.9rem] text-fg transition-colors duration-300 hover:border-line-strong hover:bg-raised"
                    >
                      {tool.icon ? <BrandIcon icon={tool.icon} size={15} /> : <span className="mx-[3px] size-[9px] rounded-full border border-fg/60" aria-hidden="true" />}
                      {tool.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- Experience: a timeline whose line draws as you scroll ---

export const Experience = () => {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <SectionHead align="left" title="Where I’ve worked" lede="Three years across founding-engineer, freelance and agency roles, most of it shipping alone." />
        <ol ref={ref} className="relative ml-2 max-w-[900px] pl-8 md:ml-0 md:pl-0">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-[-1px] w-px md:left-[11.5rem]">
            <span className="absolute inset-0 bg-line" />
            <motion.span className="absolute inset-0 origin-top bg-fg" style={{ scaleY: reduce ? 1 : draw }} />
          </span>
          {EXPERIENCE.map((role, i) => (
            <li key={role.title + role.period} className="relative pb-12 last:pb-0 md:grid md:grid-cols-[11.5rem_1fr] md:gap-10">
              <span aria-hidden="true" className="absolute top-2 left-[-2.3rem] size-2.5 rounded-full border-2 border-page bg-fg md:left-[calc(11.5rem-5px)]" />
              <Reveal delay={0.05} className="mb-2 md:mb-0 md:pt-1 md:pr-6 md:text-right">
                <p className="font-mono text-[0.8rem] text-faint tabular-nums">{role.period}</p>
              </Reveal>
              <Reveal delay={0.1} className="md:pl-10">
                <h3 className="text-[1.25rem] font-medium tracking-[-0.01em]">{role.title}</h3>
                <p className="mt-1 text-[0.95rem] text-fg/80">
                  {role.company} <span className="text-faint">· {role.meta}</span>
                </p>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <span className="mt-[0.62rem] size-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                {i === 0 && <span className="sr-only">Current role</span>}
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal className="mt-14 flex max-w-[900px] justify-center">
          <Action href={PROFILE.cv} variant="secondary" download>
            Download my CV <Download size={16} aria-hidden="true" />
          </Action>
        </Reveal>
      </Container>
    </section>
  );
};

// --- On the record: figures from the CV, numbers roll up on arrival ---

export const Proof = () => (
  <section id="proof" className="bg-band py-24 md:py-32">
    <Container>
      <SectionHead title="On the record" lede="Figures from shipped systems, plus the credentials behind them. Every one is on my CV." />
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact, i) => (
          <li key={fact.lead} className={fact.wide ? 'lg:col-span-2' : ''}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-line bg-panel p-6 transition-colors duration-500 hover:border-line-strong md:p-7">
                <div>
                  {fact.value !== undefined ? (
                    <>
                      <p className={`flex items-end gap-2 font-display leading-none font-semibold tracking-[-0.02em] text-fg ${fact.wide ? 'text-[3.4rem] md:text-[4.25rem]' : 'text-[2.9rem]'}`}>
                        <span className="inline-flex items-end whitespace-nowrap">
                          {fact.before && <span className="mr-[0.25em] text-muted">{fact.before}</span>}
                          <RollingNumber value={fact.value} decimals={fact.decimals} />
                          {fact.after && <span className="ml-[0.08em] text-muted">{fact.after}</span>}
                        </span>
                      </p>
                      <p className="mt-2 text-[1.05rem] font-medium text-fg">{fact.lead}</p>
                    </>
                  ) : (
                    <p className="font-display text-[1.75rem] leading-[1.05] font-semibold tracking-[-0.01em] text-fg">{fact.lead}</p>
                  )}
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{fact.rest}</p>
                </div>
                <p className="text-[0.82rem] text-faint">{fact.source}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);
