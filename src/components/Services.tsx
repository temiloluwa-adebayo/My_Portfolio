import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Check, Minus, Plus } from 'lucide-react';
import { FAQ, SERVICES } from '../data';
import { Action, ArrowIcon, Container, EASE, Reveal, SectionHead } from './ui';

export const SELECT_SERVICE = 'portfolio:select-service';

// --- Services: pick one, see what it includes, request a quote for it ---

export const Services = () => {
  const [selected, setSelected] = useState(SERVICES[0].id);
  const current = SERVICES.find((s) => s.id === selected) ?? SERVICES[0];

  const requestQuote = () => {
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE, { detail: current.title }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              align="left"
              title="What I can build for you"
              lede="Three kinds of engagement, each quoted per project once the scope is clear. Pick the closest one and tell me what you’re building."
            />
            <Reveal className="hidden lg:block">
              <p className="text-[0.95rem] text-faint">Hiring for a full-time role instead? The same skills apply. Use the form below or email me directly.</p>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-[2rem] border border-line bg-panel p-2 md:p-2.5" role="radiogroup" aria-label="Services">
              <LayoutGroup>
                <div className="flex flex-col gap-2">
                  {SERVICES.map((service) => {
                    const on = service.id === selected;
                    return (
                      <motion.div
                        layout
                        key={service.id}
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                        className={`relative overflow-hidden rounded-[1.5rem] border transition-colors duration-300 ${on ? 'border-fg/40 bg-raised' : 'border-line bg-page/40 hover:border-line-strong'}`}
                      >
                        <button
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setSelected(service.id)}
                          className="flex w-full items-start gap-4 p-5 text-left md:p-6"
                        >
                          <span
                            className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border transition-colors ${on ? 'border-fg bg-fg' : 'border-line-strong'}`}
                            aria-hidden="true"
                          >
                            {on && <Check size={12} strokeWidth={3} className="text-page" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-display text-[1.35rem] leading-tight font-medium tracking-[-0.01em] text-fg">{service.title}</span>
                            <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-muted">{service.summary}</span>
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              key="details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="mx-5 mb-5 border-t border-dashed border-line-strong pt-4 md:mx-6 md:mb-6 md:ml-[3.75rem]">
                                <ul className="grid gap-2.5 sm:grid-cols-2">
                                  {service.includes.map((item) => (
                                    <li key={item} className="flex gap-2.5 text-[0.92rem] leading-snug text-fg/90">
                                      <Check size={15} className="mt-0.5 shrink-0 text-live" aria-hidden="true" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                                <p className="mt-4 text-[0.82rem] text-faint">{service.stack}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </LayoutGroup>

              <div className="flex flex-col items-start gap-4 px-4 pt-5 pb-3 sm:flex-row sm:items-center sm:justify-between md:px-5">
                <p className="text-[0.88rem] text-faint">Quoted per project, after a short scoping conversation.</p>
                <Action onClick={requestQuote}>
                  Request a quote <ArrowIcon />
                </Action>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

// --- FAQ: tabbed categories, one answer open at a time ---

export const Faq = () => {
  const [tab, setTab] = useState(FAQ[0].id);
  const [open, setOpen] = useState<string | null>(`${FAQ[0].id}-0`);
  const group = FAQ.find((g) => g.id === tab) ?? FAQ[0];

  return (
    <section id="faq" className="bg-band py-24 md:py-32">
      <Container className="max-w-[860px]!">
        <SectionHead title="Questions people ask first" lede="Availability, how we’d work together, and the technical basics." />

        <Reveal className="mb-8 flex justify-center">
          <div className="flex gap-1 rounded-full border border-line bg-panel p-1" role="tablist" aria-label="Question categories">
            <LayoutGroup id="faq-tabs">
              {FAQ.map((g) => {
                const on = g.id === tab;
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setTab(g.id);
                      setOpen(`${g.id}-0`);
                    }}
                    className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors sm:px-5 ${on ? 'text-page' : 'text-muted hover:text-fg'}`}
                  >
                    {on && <motion.span layoutId="faq-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                    {g.label}
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col gap-2.5"
          >
            {group.items.map((item, i) => {
              const id = `${group.id}-${i}`;
              const on = open === id;
              return (
                <li key={id} className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${on ? 'border-line-strong bg-panel' : 'border-line bg-panel/60 hover:border-line-strong'}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`${id}-a`}
                      onClick={() => setOpen(on ? null : id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    >
                      <span className={`text-[1rem] font-medium transition-colors md:text-[1.05rem] ${on ? 'text-fg' : 'text-fg/85'}`}>{item.q}</span>
                      <span className={`grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300 ${on ? 'bg-fg text-page' : 'bg-raised text-muted'}`} aria-hidden="true">
                        {on ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`${id}-a`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        <p className="px-5 pb-5 text-[0.97rem] leading-relaxed text-muted md:px-6 md:pb-6">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </Container>
    </section>
  );
};
