import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Zap, 
  Shield, 
  Layout, 
  Cpu, 
  Globe, 
  Server, 
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';


// --- Data ---

const PROJECTS = [
  {
    id: 'payhub',
    title: 'PayHub Central',
    subtitle: 'Multi-Tenant Fintech Platform',
    description: 'A hardened financial platform built for hospital employee cooperatives. Enforces three levels of data isolation, nine distinct user roles, and row-level security on every table — ensuring no cooperative can access another\'s sensitive financial data, even within the same hospital.',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'RBAC', 'Row-Level Security'],
    metrics: ['3 Isolation Levels', '9 User Roles', 'Cross-Cooperative Risk Engine'],
    icon: Shield,
    color: 'emerald',
    githubUrl: 'https://github.com/temiloluwa-adebayo/payhub-central',
    liveUrl: '',
  },
  {
    id: 'leadforge',
    title: 'LeadForge',
    subtitle: 'Automated Outbound Sales Engine',
    description: 'A nine-phase automation pipeline that runs entirely without human input. Discovers businesses on Google, scrapes and scores their digital presence, generates a personalised PDF proposal using Google Docs, and delivers a cold email via Gmail — triggered by a single button click.',
    tags: ['Next.js 14', 'n8n', 'Supabase', 'ScrapingBee', 'Gmail API'],
    metrics: ['9-Phase Pipeline', 'Zero Manual Steps', 'AI-Scored Lead Quality'],
    icon: Zap,
    color: 'amber',
    githubUrl: 'https://github.com/temiloluwa-adebayo/LeadForge',
    liveUrl: '',
  },
  {
    id: 'voolt-academy',
    title: 'VOOLT Academy',
    subtitle: 'Invitation-Only Learning Management System',
    description: 'A closed, access-controlled LMS where students gain entry only after payment is verified externally. Automated onboarding via n8n generates credentials and provisions accounts instantly. Weekly MCQ quizzes are enforced as gates — students cannot advance without completing them.',
    tags: ['React 19', 'Supabase', 'n8n', 'Tailwind CSS', 'RLS'],
    metrics: ['Automated Provisioning', 'Enforced Weekly Gates', 'Zero Public Access'],
    icon: Layers,
    color: 'indigo',
    githubUrl: 'https://github.com/temiloluwa-adebayo/Voolt_Academy',
    liveUrl: 'https://voolt-academy-8f72.vercel.app/',
  },
  {
    id: 'vooltflow',
    title: 'VooltFlow',
    subtitle: 'AI-Powered Affiliate Automation',
    description: 'Searches Amazon, Jumia, and Konga simultaneously, filters results through a quality scoring engine (rating, review count, price thresholds), generates proper affiliate links, finds viral YouTube Shorts as social proof, and publishes a GPT-4o-written listing to WooCommerce — in under 60 seconds.',
    tags: ['Next.js 15', 'GPT-4o', 'n8n', 'WooCommerce API', 'Supabase'],
    metrics: ['3 Marketplaces in Parallel', '< 60s End-to-End', 'GPT-4o Descriptions'],
    icon: Cpu,
    color: 'rose',
    githubUrl: 'https://github.com/temiloluwa-adebayo/vooltflow',
    liveUrl: 'https://vooltflow-fmql.vercel.app/',
  },
  {
    id: 'voolttrip',
    title: 'VooltTrip',
    subtitle: 'AI Visa Assistance Platform',
    description: 'A trust-engineered visa assistance platform with a 24/7 AI assistant trained on service-specific knowledge. Client funds are held by a verified third-party lawyer and released only upon successful visa approval — with a full refund guarantee on rejection. Built to eliminate the trust barrier in visa services.',
    tags: ['AI Chatbot', 'Escrow Payment Model', 'Lawyer-Backed Security'],
    metrics: ['24/7 AI Consultation', 'Funds Held in Escrow', 'Full Refund on Rejection'],
    icon: Globe,
    color: 'sky',
    githubUrl: 'https://github.com/temiloluwa-adebayo/VooltTrip',
    liveUrl: 'https://voolt-trip.vercel.app/',
  },
  {
    id: 'campuspress',
    title: 'CampusPress AI',
    subtitle: 'University Journalism Platform',
    description: 'A structured digital newsroom for academic institutions. Every article submitted by a student journalist passes through an AI analysis layer — detecting bias, scoring credibility, and flagging sentiment — before an editor reviews it. Content cannot be published without passing editorial approval. No informal channels, no unmoderated publishing.',
    tags: ['React Native', 'AI Analysis', 'Editorial Workflow', 'Supabase'],
    metrics: ['AI Bias Detection', 'Enforced Editorial Gate', 'Credibility Scoring'],
    icon: Layout,
    color: 'violet',
    githubUrl: 'https://github.com/temiloluwa-adebayo/campuspress-ai',
    liveUrl: '',
  },
  {
    id: 'examforge',
    title: 'ExamForge CBT',
    subtitle: 'Offline-First Desktop Examination System',
    description: 'Two completely isolated desktop applications — a student exam client and an admin console — with no shared interface or data access between them. Runs 100% offline during examinations. Submissions are saved locally and synced to a Supabase workspace when connectivity returns. Built to operate reliably in environments with zero internet dependency.',
    tags: ['Electron', 'SQLite', 'Supabase', 'Offline-First', 'Isolated Architecture'],
    metrics: ['Zero Internet Required', 'Isolated Admin & Student Apps', 'Auto-Sync on Reconnect'],
    icon: Terminal,
    color: 'orange',
    githubUrl: 'https://github.com/temiloluwa-adebayo/examforge-cbt',
    liveUrl: '',
  }
];

const SKILLS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'Express'] },
  { category: 'Automation', items: ['n8n', 'Webhooks', 'API Chaining', 'Workflow Design'] },
  { category: 'AI / ML', items: ['Generative AI', 'AI Integration', 'Prompt Engineering', 'Large Language Models (LLMs)'] },
  { category: 'Platforms', items: ['Vercel', 'Electron', 'Flutter', 'Google Play', 'Microsoft Store'] }
];

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-display font-bold text-bg-dark">TA</div>
          <span className="font-display font-bold text-zinc-100 tracking-tight hidden sm:block">Temiloluwa Adebayo</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Skills', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-zinc-400 hover:text-brand-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-4 py-2 bg-brand-primary text-bg-dark text-sm font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Hire Me
          </a>
        </div>

        <button className="md:hidden text-zinc-100" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Work', 'Skills', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-lg font-medium text-zinc-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold mb-6">
            <Sparkles size={14} />
            AVAILABLE FOR NEW OPPORTUNITIES
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-6xl leading-[0.9] mb-8">
            Building systems that <span className="text-brand-primary">run themselves.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
            AI Software Engineer specialising in full-stack web applications, workflow automation, and AI-integrated systems — from architecture to deployment.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#work" className="px-8 py-4 bg-brand-primary text-bg-dark font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform glow">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-4 glass text-zinc-100 font-bold rounded-xl hover:bg-zinc-800 transition-colors">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="glass rounded-3xl p-8 glow relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="ml-auto font-mono text-xs text-zinc-500">terminal — 80x24</div>
            </div>
            <div className="font-mono text-sm space-y-2">
              <div className="text-brand-primary">$ whoami</div>
              <div className="text-zinc-300">Temiloluwa Adebayo</div>
              <div className="text-brand-primary">$ cat role.txt</div>
              <div className="text-zinc-300">AI Software Engineer</div>
              <div className="text-brand-primary">$ skills --list</div>
              <div className="grid grid-cols-2 gap-2 text-zinc-400">
                <div>• Next.js / React</div>
                <div>• Supabase / PostgreSQL</div>
                <div>• n8n Automation</div>
                <div>• Electron / Flutter</div>
                <div>• OpenAI / GPT-4o</div>
                <div>• System Architecture</div>
              </div>
              <div className="text-brand-primary">$ status</div>
              <div className="text-emerald-400">Open to opportunities — let's build._</div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 glass rounded-2xl -z-10 rotate-12" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 glass rounded-2xl -z-10 -rotate-6" />
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: typeof PROJECTS[0];
  index: number;
  key?: string;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass rounded-3xl p-8 h-full flex flex-col glow-hover">
        <div className={`w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-bg-dark transition-colors duration-500`}>
          <project.icon size={24} />
        </div>
        
        <h3 className="text-2xl mb-2 group-hover:text-brand-primary transition-colors">{project.title}</h3>
        <p className="text-xs font-bold text-brand-primary/60 uppercase tracking-widest mb-4">{project.subtitle}</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
            <ul className="space-y-2 mb-4">
              {project.metrics.map(metric => (
                <li key={metric} className="flex items-center gap-2 text-xs text-zinc-500">
                  <ChevronRight size={12} className="text-brand-primary" />
                  {metric}
                </li>
              ))}
            </ul>

            {/* Project Links */}
            <div className="flex items-center gap-3 pt-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-brand-primary transition-colors"
                >
                  <Github size={13} />
                  README
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-brand-primary transition-colors"
                >
                  <ExternalLink size={13} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />

      {/* --- Work Section --- */}
      <section id="work" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl mb-4">Selected Work</h2>
              <p className="text-zinc-400 max-w-xl">
                Production systems built end-to-end — architecture, security, automation, and deployment. Every project here is shipped, documented, and running.
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-display font-bold text-zinc-800/50">01</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Skills Section --- */}
      <section id="skills" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl mb-4">Technical Arsenal</h2>
              <p className="text-zinc-400 max-w-xl">
                Everything required to take a system from whiteboard to production — across web, mobile, desktop, automation, and AI.
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-display font-bold text-zinc-800/50">02</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SKILLS.map((skill, index) => (
              <motion.div 
                key={skill.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-6 glow-hover"
              >
                <h4 className="text-brand-primary text-sm font-bold mb-4 uppercase tracking-wider">{skill.category}</h4>
                <ul className="space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className="text-zinc-300 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square glass rounded-3xl overflow-hidden glow">
              <img 
                src="/profile.png" 
                alt="Temiloluwa Adebayo" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl glow">
              <div className="text-brand-primary font-display font-bold text-3xl">4+</div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Years Experience</div>
            </div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-6xl mb-8">The Engineer Behind the Code.</h2>
            <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
              <p>
                I'm a First-Class BSc Software Engineering graduate with a university specialisation in Artificial Intelligence and Machine Learning. I build production-grade software systems — web, mobile, desktop, and AI-powered — from architecture to deployment.
              </p>
              <p>
                Every system I ship is designed with security, reliability, and real-world constraints in mind. I don't build demos. I build things that run.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-zinc-100 font-bold text-2xl mb-1">15+</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-zinc-100 font-bold text-2xl mb-1">100%</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-zinc-100 font-bold text-2xl mb-1">Degree</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">BSc Software Engineering</div>
                </div>
                <div>
                  <div className="text-zinc-100 font-bold text-2xl mb-1">AI / ML</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">University Specialisation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 px-6 bg-brand-primary/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-7xl mb-6">Let's build something <span className="text-brand-primary">that lasts.</span></h2>
          <p className="text-xl text-zinc-400 mb-12">
            Open to full-time engineering roles, contract projects, and technical collaborations. If you need an engineer who ships complete, production-grade systems — reach out.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:temidaniel124@gmail.com" className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-bg-dark font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform glow">
              <Mail size={20} /> temidaniel124@gmail.com
            </a>
            <div className="flex items-center gap-4">
              <a href="https://github.com/temiloluwa-adebayo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-zinc-100 hover:text-brand-primary transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/temiloluwa-adebayo-4843ba377" target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass rounded-xl flex items-center justify-center text-zinc-100 hover:text-brand-primary transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-primary rounded flex items-center justify-center font-display font-bold text-[10px] text-bg-dark">TA</div>
            <span className="text-sm font-bold text-zinc-100">TEMILOLUWA ADEBAYO</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 Temiloluwa Adebayo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-brand-primary transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-xs font-bold text-zinc-500 hover:text-brand-primary transition-colors uppercase tracking-widest">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}