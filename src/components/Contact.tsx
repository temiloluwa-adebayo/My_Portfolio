import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { AlertCircle, Check, Copy, Github, Linkedin, Loader2, Mail, QrCode, Send, X } from 'lucide-react';
import { NAV, PROFILE, SERVICES } from '../data';
import { SELECT_SERVICE } from './Services';
import { Action, Container, EASE, Reveal } from './ui';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS = [...SERVICES.map((s) => s.title), 'Full-time or contract role', 'Something else'];

const field =
  'w-full rounded-2xl border border-line bg-page/60 px-4 py-3.5 text-[0.98rem] text-fg outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-fg/50 focus:shadow-[0_0_0_4px_rgba(239,237,232,0.06)]';

// --- Copy email with a confirmation that times out ---

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-line bg-page/50 p-1.5 pl-4">
      <Mail size={16} className="shrink-0 text-faint" aria-hidden="true" />
      <a href={`mailto:${PROFILE.email}`} className="min-w-0 flex-1 truncate font-mono text-[0.9rem] text-fg hover:underline">
        {PROFILE.email}
      </a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(PROFILE.email).then(() => setCopied(true))}
        className={`flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-3 text-sm transition-colors duration-300 ${copied ? 'bg-live text-page' : 'bg-raised text-fg hover:bg-line-strong'}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </motion.span>
        </AnimatePresence>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};

// --- QR: opens this site on a phone, useful in person ---

const ShowQr = () => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} className="w-fit overflow-hidden rounded-3xl border border-line bg-page/50">
      <AnimatePresence mode="popLayout" initial={false}>
        {!open ? (
          <motion.button
            key="closed"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            className="flex h-11 items-center gap-2 px-4 text-sm text-fg"
          >
            <QrCode size={16} aria-hidden="true" /> Show QR code
          </motion.button>
        ) : (
          <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4 p-3 pr-4">
            <motion.div initial={{ scale: 1.15, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="rounded-2xl bg-fg p-2.5">
              <QRCodeSVG value={PROFILE.site} size={104} level="M" bgColor="transparent" fgColor="#121212" />
            </motion.div>
            <div className="max-w-[11rem]">
              <p className="text-sm text-fg">Scan to open this portfolio on your phone.</p>
              <button type="button" onClick={() => setOpen(false)} className="mt-2 flex items-center gap-1 text-[0.82rem] text-faint hover:text-fg">
                <X size={13} aria-hidden="true" /> Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Contact form: the submit button morphs through its states ---

const ContactForm = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [data, setData] = useState({ name: '', email: '', message: '', company: '' });

  useEffect(() => {
    const onSelect = (e: Event) => setTopic((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_SERVICE, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE, onSelect);
  }, []);

  const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`${topic} — from ${data.name || 'your portfolio'}`)}&body=${encodeURIComponent(data.message)}`;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, topic }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex min-h-[26rem] flex-col items-center justify-center gap-4 rounded-[1.75rem] border border-line bg-page/50 p-8 text-center"
        role="status"
      >
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }} className="grid size-14 place-items-center rounded-full bg-live text-page">
          <Check size={26} strokeWidth={2.5} />
        </motion.span>
        <h3 className="font-display text-[1.8rem] font-semibold tracking-[-0.01em]">Message sent</h3>
        <p className="max-w-xs text-muted">Thanks, {data.name.split(' ')[0] || 'there'}. It’s in my inbox, and I’ll reply to {data.email}.</p>
        <button type="button" onClick={() => { setStatus('idle'); setData({ name: '', email: '', message: '', company: '' }); }} className="text-sm text-faint underline-offset-2 hover:text-fg hover:underline">
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 rounded-[1.75rem] border border-line bg-page/50 p-4 md:p-5" noValidate={false}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="px-1 text-[0.85rem] text-muted">Your name</span>
          <input required autoComplete="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={field} placeholder="Ada Okafor" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="px-1 text-[0.85rem] text-muted">Email</span>
          <input required type="email" autoComplete="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="px-1 text-[0.85rem] text-muted">What’s it about?</span>
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={`${field} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%23a8a6a1' stroke-width='2'%3E%3Cpath d='m3 5 4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
          {TOPICS.map((t) => (
            <option key={t} value={t} className="bg-panel">
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="px-1 text-[0.85rem] text-muted">Message</span>
        <textarea
          required
          minLength={10}
          rows={5}
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
          className={`${field} resize-y`}
          placeholder="What are you building, where does it stand, and when do you need it?"
        />
      </label>
      {/* Honeypot: people never see it, bots fill it in */}
      <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={data.company} onChange={(e) => setData({ ...data, company: e.target.value })} name="company" className="hidden" />

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="flex items-start gap-2 px-1 text-[0.9rem] text-fg"
          >
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-fg" aria-hidden="true" />
            <span>
              The message didn’t go through.{' '}
              <a href={mailto} className="font-medium underline underline-offset-2">
                Send it by email instead
              </a>{' '}
              and it’ll arrive with your text filled in.
            </span>
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <p className="px-1 text-[0.82rem] text-faint">Goes straight to my inbox.</p>
        <motion.button
          layout
          type="submit"
          disabled={status === 'sending'}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="group inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 text-[0.95rem] font-medium text-on-accent shadow-[0_8px_24px_-8px_rgba(255,178,36,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] transition-colors hover:bg-accent-hover disabled:opacity-80"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status}
              initial={{ y: 18, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -18, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex items-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : status === 'error' ? (
                <>
                  Try again <Send size={16} aria-hidden="true" />
                </>
              ) : (
                <>
                  Send message <Send size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
};

export const Contact = () => (
  <section id="contact" className="relative overflow-hidden py-24 md:py-32">
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <img src="/hero/desk-sm.webp" alt="" className="h-full w-full object-cover opacity-[0.12] blur-[2px]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-b from-page via-page/80 to-page" />
    </div>
    <Container>
      <Reveal>
        <div className="grid gap-10 rounded-[2.25rem] border border-line bg-panel/80 p-5 backdrop-blur-sm md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="font-display text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.025em] md:text-[4rem]">Let’s build something that lasts</h2>
              <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-muted">
                Open to remote, contract and full-time roles, and to commissioned systems. Tell me what you’re building.
              </p>
            </div>
            <CopyEmail />
            <div className="flex flex-wrap items-center gap-3">
              <ShowQr />
              <Action href={PROFILE.linkedin} variant="secondary" size="sm" external ariaLabel="LinkedIn">
                <Linkedin size={15} aria-hidden="true" /> LinkedIn
              </Action>
              <Action href={PROFILE.github} variant="secondary" size="sm" external ariaLabel="GitHub">
                <Github size={15} aria-hidden="true" /> GitHub
              </Action>
            </div>
          </div>
          <ContactForm />
        </div>
      </Reveal>
    </Container>
  </section>
);

export const Footer = () => (
  <footer className="pb-28 md:pb-10">
    <Container>
      <div className="flex flex-col justify-between gap-8 border-t border-line pt-10 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <img src="/avatar.webp" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
          <div>
            <p className="font-medium tracking-tight text-fg">{PROFILE.name}</p>
            <p className="text-[0.85rem] text-faint">Complete, production-grade systems that run themselves.</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {[...NAV, { label: 'Contact', href: '#contact' }].map((item) => (
            <a key={item.href} href={item.href} className="text-[0.92rem] text-muted transition-colors hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-8 text-[0.82rem] text-faint">
        © {new Date().getFullYear()} {PROFILE.name}. Built with React, Vite and Motion. Hero imagery generated with Canva AI; project photos credited on their cards.
      </p>
    </Container>
  </footer>
);
