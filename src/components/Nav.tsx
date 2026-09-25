import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ArrowUpRight, Briefcase, Copy, Download, FileText, Home, Layers, Mail, MessageCircleQuestion, Search, Send } from 'lucide-react';
import { NAV, PROFILE, PROJECTS } from '../data';
import { Action, ArrowIcon, EASE } from './ui';

// --- Scroll spy: which section is under the nav ---

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState('top');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
};

// --- Command palette (⌘K / Ctrl K) ---

type Command = { id: string; title: string; group: 'Go to' | 'Projects' | 'Actions'; icon: typeof Home; hint?: string; run: () => void };

const go = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });

const CommandPalette = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { id: 'top', title: 'Home', group: 'Go to', icon: Home, run: () => go('#top') },
      ...NAV.map((n) => ({ id: n.href, title: n.label, group: 'Go to' as const, icon: Layers, run: () => go(n.href) })),
      { id: 'contact', title: 'Contact', group: 'Go to', icon: Send, run: () => go('#contact') },
      ...PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        group: 'Projects' as const,
        icon: Briefcase,
        hint: p.liveUrl ? 'Open live site' : p.githubUrl ? 'Open source' : undefined,
        run: () => {
          const url = p.liveUrl ?? p.githubUrl;
          if (url) window.open(url, '_blank', 'noopener');
          else go('#work');
        },
      })),
      {
        id: 'copy-email',
        title: 'Copy email address',
        group: 'Actions',
        icon: Copy,
        hint: PROFILE.email,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).then(() => setToast('Email copied'), () => (window.location.href = `mailto:${PROFILE.email}`));
        },
      },
      { id: 'email', title: 'Email Temiloluwa', group: 'Actions', icon: Mail, run: () => (window.location.href = `mailto:${PROFILE.email}`) },
      { id: 'cv', title: 'Download CV', group: 'Actions', icon: Download, run: () => window.open(PROFILE.cv, '_blank') },
      { id: 'github', title: 'GitHub profile', group: 'Actions', icon: FileText, run: () => window.open(PROFILE.github, '_blank', 'noopener') },
    ],
    [],
  );

  const results = commands.filter((c) => `${c.title} ${c.group}`.toLowerCase().includes(query.trim().toLowerCase()));
  const groups = (['Go to', 'Projects', 'Actions'] as const).map((g) => ({ g, items: results.filter((r) => r.group === g) })).filter((x) => x.items.length);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => {
      setToast('');
      onClose();
    }, 900);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  const runAt = (i: number) => {
    const cmd = results[i];
    if (!cmd) return;
    cmd.run();
    if (cmd.id !== 'copy-email') onClose();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runAt(index);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the portfolio"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative w-full max-w-[34rem] overflow-hidden rounded-3xl border border-line-strong bg-panel shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search size={18} className="text-faint" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder="Jump to a section, project or action…"
                aria-label="Search"
                aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
                className="h-14 flex-1 bg-transparent text-[0.98rem] text-fg outline-none placeholder:text-faint"
              />
              <kbd className="rounded-md border border-line-strong px-1.5 py-0.5 font-mono text-[0.7rem] text-faint">Esc</kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {groups.length === 0 && <p className="px-4 py-10 text-center text-sm text-faint">Nothing matches “{query}”.</p>}
              {groups.map(({ g, items }) => (
                <div key={g} className="py-1">
                  <p className="px-3 pt-2 pb-1.5 text-[0.75rem] text-faint">{g}</p>
                  {items.map((cmd) => {
                    const i = results.indexOf(cmd);
                    const on = i === index;
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={on}
                        onMouseEnter={() => setIndex(i)}
                        onClick={() => runAt(i)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${on ? 'bg-raised text-fg' : 'text-muted'}`}
                      >
                        <Icon size={16} className={on ? 'text-fg' : 'text-faint'} aria-hidden="true" />
                        <span className="flex-1 text-[0.95rem]">{cmd.title}</span>
                        {cmd.hint && <span className="truncate text-[0.78rem] text-faint">{cmd.hint}</span>}
                        {cmd.group === 'Projects' && <ArrowUpRight size={14} className="text-faint" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <AnimatePresence>
              {toast && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  className="absolute right-4 bottom-4 rounded-full bg-live px-3 py-1 text-sm font-medium text-page"
                >
                  {toast}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Nav ---

const SPY_IDS = ['top', 'work', 'services', 'experience', 'faq', 'contact'];

const TABS = [
  { id: 'top', label: 'Home', icon: Home },
  { id: 'work', label: 'Work', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'faq', label: 'FAQ', icon: MessageCircleQuestion },
  { id: 'contact', label: 'Contact', icon: Send },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [palette, setPalette] = useState(false);
  const active = useActiveSection(SPY_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes((document.activeElement as HTMLElement | null)?.tagName ?? '');
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setPalette((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <motion.nav
          aria-label="Primary"
          initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`flex w-full max-w-[1180px] items-center justify-between gap-3 rounded-full border py-2 pr-2 pl-2.5 transition-[background-color,border-color,max-width,box-shadow] duration-500 ease-(--ease-out-expo) md:pl-3 ${
            scrolled
              ? 'max-w-[980px] border-line bg-page/75 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${PROFILE.name}, back to top`}>
            <img src="/avatar.webp" alt="" width={34} height={34} className="size-[34px] rounded-full object-cover ring-1 ring-line-strong" />
            <span className="text-[0.95rem] font-medium tracking-tight text-fg">
              <span className="sm:hidden">{PROFILE.name.split(' ')[0]}</span>
              <span className="hidden sm:inline">{PROFILE.name}</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            <LayoutGroup id="nav">
              {NAV.map((item) => {
                const on = active === item.href.slice(1);
                return (
                  <a key={item.href} href={item.href} className={`relative isolate rounded-full px-3.5 py-2 text-sm transition-colors ${on ? 'text-fg' : 'text-muted hover:text-fg'}`}>
                    {on && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-raised" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    {item.label}
                  </a>
                );
              })}
            </LayoutGroup>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPalette(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              aria-label="Search (Command K)"
            >
              <Search size={15} aria-hidden="true" />
              <kbd className="hidden font-sans text-[0.78rem] lg:inline">⌘K</kbd>
            </button>
            <Action href="#contact" size="sm" className="hidden sm:inline-flex">
              Hire me <ArrowIcon />
            </Action>
          </div>
        </motion.nav>
      </header>

      {/* Mobile: bottom tab bar with a sliding active pill */}
      <nav aria-label="Sections" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <LayoutGroup id="tabs">
          <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-line bg-panel/85 p-1.5 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            {TABS.map((tab) => {
              const on = active === tab.id;
              const Icon = tab.icon;
              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`relative isolate flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[0.68rem] transition-colors ${on ? 'text-page' : 'text-muted'}`}
                >
                  {on && <motion.span layoutId="tab-pill" className="absolute inset-0 -z-10 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                  <Icon size={18} aria-hidden="true" />
                  {tab.label}
                </a>
              );
            })}
          </div>
        </LayoutGroup>
      </nav>

      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </>
  );
};
