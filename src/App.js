import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpenIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  AcademicCapIcon,
  TrophyIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowDownCircleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Github, Linkedin, X, Sun, Moon, Menu, ChevronUp } from 'lucide-react';

// ─── UX: Scroll-triggered fade-in hook (IntersectionObserver) ─────────────────
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

// ─── Typing animation titles ──────────────────────────────────────────────────
const TYPING_TITLES = [
  'Full-Stack & .NET Engineer',
  'Performance Engineering',
  'Cloud & Distributed Systems',
  'IS Undergraduate @ SUSL',
];

// ─── Background Animation ─────────────────────────────────────────────────────
const BackgroundAnimation = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let stars = [];
    const numParticles = 75;
    const numStars = 250;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2, opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,150,150,${p.opacity + 0.2})`; ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
      });
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`; ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < 0) { s.x = canvas.width; s.y = Math.random() * canvas.height; }
      });
    };

    const animate = () => {
      if (isDarkMode) { drawStars(); updateStars(); }
      else { drawParticles(); updateParticles(); }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    if (isDarkMode) initStars(); else initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />;
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // ────────────────────────────────────────────────────────────────────────────
  // All portfolio data — edit here to update the site
  // ────────────────────────────────────────────────────────────────────────────
  const portfolioData = {
    name: 'Thimira Niranjaya Keerthiwansha',
    shortName: 'Thimira Niranjaya',
    title: 'Full-Stack & .NET Engineer',
    tagline: 'Building real-time, distributed backend systems — .NET 10 · SignalR · Redis · PostGIS · Azure.',
    location: 'Ratnapura District, Sabaragamuwa Province, Sri Lanka',
    profilePicUrl:
      'https://github.com/thimira20011/portfolio-pictures/blob/main/WhatsApp%20Image%202026-03-30%20at%2023.34.12.jpeg?raw=true',
    resumeUrl:
      'https://drive.google.com/file/d/1A5cI1T66xB9HFwusyAgLF2TcU9Mkut8o/view?usp=sharing',

    // ── About & Skills ────────────────────────────────────────────────────────
    about: {
      bio: "I build real-time, distributed backend systems — and I like the parts most people skip: query performance, spatial data, and the DevOps under the hood. As an Information Systems undergraduate at SUSL, I work across .NET, Java, and Python, with a focus on distributed systems and cloud-native architecture. I've written technical deep-dives on real-time infrastructure (SignalR/Redis), Docker image hardening, and PostGIS-based geospatial engineering, and placed 1st Runner-Up at Aurora 2026 (AI Ideathon) with a multi-agent security framework I designed for freelancers. I'm currently open to freelance full-stack work and internship opportunities in backend/distributed systems.",
      skillGroups: [
        {
          category: 'Languages',
          items: ['C#', 'TypeScript', 'JavaScript', 'SQL', 'Python', 'Java', 'HTML5', 'CSS3'],
        },
        {
          category: 'Backend & APIs',
          items: ['.NET 10', 'ASP.NET Core', 'SignalR', 'Redis', 'EF Core', 'REST APIs', 'JWT/RBAC', 'PostGIS'],
        },
        {
          category: 'Frontend',
          items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
        },
        {
          category: 'Databases',
          items: ['PostgreSQL', 'PostGIS', 'MS SQL Server', 'MySQL'],
        },
        {
          category: 'Cloud & DevOps',
          items: ['Microsoft Azure', 'Docker', 'GitHub Actions (CI/CD)', 'Linux', 'Cloudflare', 'Vercel'],
        },
        {
          category: 'Practices & Tools',
          items: ['Clean Architecture', 'k6 Load Testing', 'Agile/Scrum', 'Git', 'Jira', 'Postman'],
        },
      ],
    },

    // ── Education & Experience Timeline ───────────────────────────────────────
    timeline: [
      {
        id: 1,
        type: 'education',
        title: 'BSc (Hons) in Information Systems',
        organization: 'Sabaragamuwa University of Sri Lanka — Faculty of Computing',
        period: 'July 2024 – July 2028 (Expected)',
        description:
          'GPA: 3.14/4.00 · Relevant Coursework: Data Structures & Algorithms, OOP, DBMS, Distributed Systems, Software Engineering, Cloud Computing, OS & Linux Administration.',
      },
      {
        id: 2,
        type: 'project',
        title: 'Lead Developer & Scrum Master',
        organization: 'NearU — Campus Marketplace & Real-Time Ride-Sharing Platform',
        period: '2024 – Present',
        description:
          'Led a 4-developer team; ran Jira sprint planning, code reviews, and Git branching. Built real-time ride-matching with SignalR & Redis pub/sub, PostGIS spatial indexing for sub-second location queries, JWT/RBAC auth, Ubuntu Chiseled containers, and a multi-stage GitHub Actions CI/CD pipeline to Azure + Vercel.',
      },
      {
        id: 3,
        type: 'publication',
        title: 'Freelance Technical Writer',
        organization: 'Medium · medium.com/@tnirajaya2001',
        period: 'November 2025 – Present',
        description:
          'Authored technical deep-dives for a developer audience: container hardening (Chiseled .NET 10), real-time backend design (SignalR/Redis/PostGIS), deploying a production AI gateway on a Cloud VPS.',
      },
      {
        id: 4,
        type: 'activity',
        title: 'Graphic Designer & Contributor',
        organization: 'Rotaract Club of SUSL — Infraworld SDG 9 Podcast',
        period: '2024 – Present',
        description:
          'Created visual assets and promotional materials for community events; contributed to the Infraworld SDG 9 Podcast focused on infrastructure and sustainable development.',
      },
      {
        id: 5,
        type: 'activity',
        title: 'Student Member',
        organization: 'IEEE Computer Society — SUSL Student Branch',
        period: '2024 – Present',
        description:
          'Active participant in IEEE technical workshops, seminars, and knowledge-sharing events on emerging technologies and engineering best practices.',
      },
    ],

    // ── Achievements ──────────────────────────────────────────────────────────
    achievements: [
      {
        id: 1,
        title: '1st Runner-Up — Aurora 2026 AI Ideathon',
        event: 'Aurora 2026 · National AI Competition',
        year: '2026',
        description:
          'Recognized nationally for ShadowSense — an autonomous multi-agent AI security framework designed to detect client-side payload attacks in freelance developer workspaces using sandboxed agent-to-agent communication.',
        highlight: true,
      },
    ],

    // ── Publications ─────────────────────────────────────────────────────────
    publications: [
      {
        id: 1,
        title: 'Deploying a Production-Ready AI Gateway on a Cloud VPS: A Complete Survival Guide',
        url: 'https://medium.com/@tnirajaya2001',
      },
      {
        id: 2,
        title: 'How we engineered a resilient, real-time, ride-sharing backend for university students',
        url: 'https://medium.com/@tnirajaya2001',
      },
      {
        id: 3,
        title: "Beyond Distroless: Why We 'Chiseled' Our .NET 10 Backend for NearU",
        url: 'https://medium.com/@tnirajaya2001',
      },
    ],

    // ── Certifications ────────────────────────────────────────────────────────
    certifications: [
      {
        id: 1,
        title: 'AI Fluency for Students',
        issuer: 'Certificate of Completion',
        issuedDate: '',
        credentialUrl: '#',
      },
      {
        id: 2,
        title: 'Scrum Fundamentals Certified (SFC)',
        issuer: 'Scrum Study',
        issuedDate: '',
        credentialUrl: '#',
      },
      {
        id: 3,
        title: 'Six Sigma Yellow Belt',
        issuer: 'Six Sigma',
        issuedDate: '',
        credentialUrl: '#',
      },
      {
        id: 4,
        title: 'Digital Marketing',
        issuer: 'Google Digital Garage',
        issuedDate: '',
        credentialUrl: '#',
      },
      {
        id: 5,
        title: 'IEEE Membership Certificate',
        issuer: 'IEEE Computer Society',
        issuedDate: '',
        credentialUrl: '#',
      },
    ],

    // ── Projects ──────────────────────────────────────────────────────────────
    projects: [
      {
        id: 0,
        featured: true,
        title: 'NearU — Campus Marketplace & Real-Time Ride-Sharing',
        description:
          'A full-stack university platform featuring a real-time ride-matching engine (SignalR + Redis pub/sub), PostGIS spatial indexing for sub-second location queries, JWT/RBAC auth with token-refresh lifecycles, Ubuntu Chiseled containers, and a multi-stage GitHub Actions CI/CD pipeline to Azure + Vercel.',
        link: 'https://github.com/thimira20011',
        imageUrl: '',
        techStack: ['.NET 10', 'React', 'TypeScript', 'SignalR', 'Redis', 'PostGIS', 'Azure', 'Docker'],
        role: 'Lead Developer & Scrum Master · 4-developer team',
        status: 'In Development',
      },
      {
        id: 1,
        featured: false,
        title: 'ShadowSense — Multi-Agent AI Security Framework',
        description:
          '🥈 1st Runner-Up · Aurora 2026 National AI Ideathon. An autonomous multi-agent framework that detects client-side payload attacks in freelance developer workspaces using sandboxed agent-to-agent communication and isolated triage.',
        link: 'https://github.com/thimira20011',
        imageUrl: '',
        techStack: ['Python', 'Multi-Agent AI', 'Docker'],
      },
      {
        id: 2,
        featured: false,
        title: 'GreenOps Hub — Cloud Efficiency & High-Throughput API',
        description:
          'A cloud efficiency analyzer on the Azure API tracking compute telemetry and estimating Software Carbon Intensity (SCI) per service. Async REST API in Clean Architecture, load-tested with k6 for sub-100ms response latency.',
        link: 'https://github.com/thimira20011',
        imageUrl: '',
        techStack: ['.NET 10', 'C#', 'Azure', 'Docker', 'k6', 'Clean Architecture'],
      },
      {
        id: 3,
        featured: false,
        title: 'Galagama Gems',
        description:
          'A modern, animated product showcase website with smooth transitions, comprehensive UI components, form validation, and a fully responsive design using advanced animation patterns.',
        link: 'https://github.com/thimira20011/Galagama-Gems.git',
        imageUrl:
          'https://github.com/thimira20011/portfolio-pictures/blob/main/Screenshot%202025-11-21%20230125.png?raw=true',
        techStack: ['React', 'TypeScript', 'Radix UI', 'Motion', 'Tailwind CSS'],
      },
      {
        id: 4,
        featured: false,
        title: 'The Reuse Hub',
        description:
          'A dynamic web application for listing and managing reusable items. Features user authentication, real-time updates, and a clean interface backed by Node.js and MySQL.',
        link: 'https://github.com/thimira20011/the-reuse-hub-v2.git',
        imageUrl:
          'https://github.com/thimira20011/portfolio-pictures/blob/main/ReuseHubHome.png?raw=true',
        techStack: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
      },
      {
        id: 5,
        featured: false,
        title: 'Personal Expense Tracker',
        description:
          'An enterprise-style Java application for tracking personal expenses — add, edit, delete entries and visualize spending habits over time.',
        link: 'https://github.com/thimira20011/expense-tracker.git',
        imageUrl:
          'https://raw.githubusercontent.com/thimira20011/portfolio-pictures/refs/heads/main/expenseTracker.png',
        techStack: ['Java'],
      },
    ],

    // ── Social & Contact ──────────────────────────────────────────────────────
    socialLinks: {
      github: 'https://github.com/thimira20011',
      linkedin: 'https://www.linkedin.com/in/thimira-niranjaya-keerthiwansha-a62838310',
      x: 'https://x.com/TNiranjaya20011',
      medium: 'https://medium.com/@tnirajaya2001',
    },
    contact: {
      email: 'tnirajaya2001@gmail.com',
      phone: '+94 70 512 7856',
    },
  };

  return (
    <div className="relative font-sans antialiased min-h-screen bg-sky-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <BackgroundAnimation isDarkMode={isDarkMode} />

      {/* Decorative gradient glows */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-700/15" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-700/15" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-700/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent pt-20">
        <NavBar socialLinks={portfolioData.socialLinks} />
        <Header data={portfolioData} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <About data={portfolioData.about} />
        <ExperienceTimeline data={portfolioData.timeline} />
        <Achievements data={portfolioData.achievements} publications={portfolioData.publications} />
        <Certifications data={portfolioData.certifications} />
        <Projects data={portfolioData.projects} />
        <Contact data={portfolioData.contact} socialLinks={portfolioData.socialLinks} />
        <Footer data={portfolioData} />
      </div>

      <ScrollToTop />
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ icon: Icon, title }) => (
  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
    <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/60 dark:bg-gray-800/50 border border-white/60 dark:border-gray-600/50 shadow-lg backdrop-blur-md">
      <Icon className="h-8 w-8 inline-block mr-2 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      {title}
    </span>
  </h2>
);

// ─── NavBar ───────────────────────────────────────────────────────────────────
const NavBar = React.memo(({ socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#about',          label: 'About'          },
    { href: '#experience',     label: 'Experience'     },
    { href: '#achievements',   label: 'Achievements'   },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects',       label: 'Projects'       },
    { href: '#contact',        label: 'Contact'        },
  ];

  return (
    <>
      {/* Desktop nav */}
      <nav aria-label="Section navigation" className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <div className="flex items-center gap-1 rounded-full bg-white/55 dark:bg-gray-800/45 backdrop-blur-lg border border-white/60 dark:border-gray-600/50 shadow-xl px-3 py-2">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}
              className="px-3 py-1.5 text-sm font-medium rounded-full text-gray-700 dark:text-gray-200 hover:bg-sky-100/70 dark:hover:bg-gray-700/70 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile hamburger — min 44×44px touch target (UX rule: touch-target-size) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu" aria-expanded={isOpen}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-white/60 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-gray-700 transition-all duration-200">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {isOpen && (
          <div className="absolute top-14 left-0 w-52 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-white/60 dark:border-gray-600/50 py-2 overflow-hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700/70 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-150">
                {item.label}
              </a>
            ))}
            {/* Medium link in mobile nav */}
            <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2 px-5 pb-1">
              <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors">
                <NewspaperIcon className="h-4 w-4" /> Read my articles
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

// ─── Header with typing animation ────────────────────────────────────────────
const Header = React.memo(({ data, isDarkMode, toggleDarkMode }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  // UX: animation duration 150–300ms, use transform/opacity only
  useEffect(() => {
    if (isPausing) return;
    const currentTitle = TYPING_TITLES[titleIndex];
    const speed = isDeleting ? 40 : 70;
    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setIsPausing(true);
        setTimeout(() => { setIsPausing(false); setIsDeleting(true); }, 2200);
        return;
      }
      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TYPING_TITLES.length);
        return;
      }
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentTitle.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPausing, titleIndex]);

  return (
    <header className="py-24 md:py-32 lg:py-40 text-center">
      {/* Dark mode toggle — 44×44px touch target */}
      <button onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-5 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-full shadow-lg bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700">
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="relative z-10 text-center md:text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-2 text-gray-900 dark:text-white">
            Hi, I'm{' '}
            <span className="text-sky-600 dark:text-sky-400">{data.shortName}</span>
          </h1>

          {/* Typing animation — min-h prevents layout shift (UX: content-jumping) */}
          <p className="text-xl sm:text-2xl font-light text-gray-600 dark:text-gray-300 min-h-[2rem]" aria-live="polite">
            {displayText}
            <span className="inline-block w-0.5 h-6 bg-sky-500 ml-0.5 align-middle animate-pulse" aria-hidden="true" />
          </p>

          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            📍 {data.location}
          </p>

          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {data.tagline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a href="#projects"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-3xl shadow-xl text-white bg-sky-600 hover:bg-sky-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300">
              View My Work
              <ArrowDownCircleIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-sky-600 dark:border-sky-400 text-base font-semibold rounded-3xl shadow-lg bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300">
              Download Resume
              <ArrowDownTrayIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative w-44 h-44 md:w-60 md:h-60 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300/40 to-indigo-300/30 blur-md" aria-hidden="true" />
          <img src={data.profilePicUrl} alt="Thimira Niranjaya Keerthiwansha — profile photo"
            loading="eager"
            className="relative w-full h-full rounded-full object-cover ring-4 ring-sky-200 dark:ring-sky-600 transition-transform duration-300 hover:scale-105 shadow-xl" />
        </div>
      </div>
    </header>
  );
});

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = ({ stats }) => {
  const [ref, isVisible] = useScrollAnimation(0.2);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (!isVisible) return;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - Math.min(step / steps, 1), 3);
      setCounts(stats.map((s) => Math.round(s.value * eased)));
      if (step >= steps) clearInterval(timer);
    }, 1500 / steps);
    return () => clearInterval(timer);
  }, [isVisible, stats]);

  return (
    <div ref={ref}
      className={`my-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i}
            className="bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 text-center shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* UX: tabular figures for numbers */}
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400 tabular-nums">
              {counts[i]}{stat.suffix}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── About ────────────────────────────────────────────────────────────────────
const About = React.memo(({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="about" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={UserIcon} title="About Me" />
      <div ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white/70 dark:bg-gray-800/55 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-2xl hover:border-sky-200/70 dark:hover:border-sky-700/60 transition-all duration-300">
          {/* UX: line-height 1.5 for body text */}
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{data.bio}</p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">Technical Skills</h3>
            <div className="space-y-5">
              {data.skillGroups.map((group, gi) => (
                <div key={gi}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <span key={si}
                        className="px-3 py-1.5 bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-200 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// ─── Experience Timeline ──────────────────────────────────────────────────────
const TYPE_CONFIG = {
  education:   { dot: 'bg-sky-500',     badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300',     label: 'Education'   },
  project:     { dot: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', label: 'Project'    },
  activity:    { dot: 'bg-violet-500',  badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',   label: 'Activity'   },
  publication: { dot: 'bg-orange-500',  badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',   label: 'Writing'    },
};

const TimelineItem = ({ item, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.08);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.activity;
  return (
    <div ref={ref} className={`relative pl-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      {/* Dot — UX: color + badge label (color-not-only rule) */}
      <div className={`absolute left-0 top-2.5 w-4 h-4 rounded-full ${cfg.dot} ring-4 ring-white dark:ring-gray-900 shadow-md z-10`} />
      <div className="bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 mb-6 shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-xl hover:border-sky-200/60 dark:hover:border-sky-700/50 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${cfg.badge}`}>
              {cfg.label}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">{item.title}</h3>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">{item.organization}</p>
          </div>
          <span className="flex-shrink-0 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
            {item.period}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
};

const ExperienceTimeline = React.memo(({ data }) => (
  <section id="experience" className="py-16 md:py-24 scroll-mt-28">
    <SectionHeading icon={AcademicCapIcon} title="Education & Experience" />
    <div className="max-w-3xl mx-auto relative">
      <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
      {data.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  </section>
));

// ─── Achievements & Publications ──────────────────────────────────────────────
const Achievements = React.memo(({ data, publications }) => {
  const [refA, isVisibleA] = useScrollAnimation();
  const [refP, isVisibleP] = useScrollAnimation();
  return (
    <section id="achievements" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={TrophyIcon} title="Achievements & Publications" />

      {/* Achievements */}
      <div ref={refA}
        className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 transition-all duration-700 ${isVisibleA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {data.map((a) => (
          <div key={a.id}
            className="bg-white/70 dark:bg-gray-800/55 p-6 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber-200/70 dark:hover:border-amber-700/60 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-md">
                <TrophyIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{a.title}</h3>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-0.5">{a.event}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{a.year}</span>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publications */}
      <div ref={refP} className={`max-w-5xl mx-auto transition-all duration-700 ${isVisibleP ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <NewspaperIcon className="h-5 w-5 text-orange-500" aria-hidden="true" />
          Technical Writing on Medium
        </h3>
        <div className="space-y-3">
          {publications.map((p) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-white/70 dark:bg-gray-800/55 rounded-2xl shadow-md backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-lg hover:border-orange-200/60 dark:hover:border-orange-700/40 hover:-translate-y-0.5 transition-all duration-200 group">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-orange-400" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-relaxed">
                {p.title}
              </span>
              <ArrowTopRightOnSquareIcon className="flex-shrink-0 h-4 w-4 mt-0.5 text-gray-400 group-hover:text-orange-500 transition-colors" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Certifications ───────────────────────────────────────────────────────────
const Certifications = React.memo(({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="certifications" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={CheckBadgeIcon} title="Licenses & Certifications" />
      <div ref={ref}
        className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {data.map((cert, i) => (
          <div key={cert.id}
            className="bg-white/70 dark:bg-gray-800/55 p-5 rounded-2xl shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-200/70 dark:hover:border-sky-700/60 transition-all duration-300"
            style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center flex-shrink-0">
                <CheckBadgeIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{cert.title}</h3>
            </div>
            {cert.issuer && (
              <p className="text-xs text-gray-500 dark:text-gray-400 ml-12">{cert.issuer}</p>
            )}
            {cert.credentialUrl && cert.credentialUrl !== '#' ? (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className="mt-3 ml-12 inline-flex items-center text-xs font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors">
                View Credential <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" />
              </a>
            ) : (
              <span className="mt-3 ml-12 inline-block text-xs text-gray-400 dark:text-gray-500">
                Available on request
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});

// ─── Featured Project Card ────────────────────────────────────────────────────
const FeaturedProjectCard = ({ project }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 p-[1.5px] shadow-2xl">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600/95 via-indigo-600/95 to-violet-700/95 backdrop-blur-md p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <StarIcon className="h-5 w-5 text-yellow-300" aria-hidden="true" />
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Featured Project</span>
            </div>
            {project.status && (
              <span className="px-3 py-0.5 bg-green-400/25 text-green-300 rounded-full text-xs font-semibold border border-green-400/40">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{project.title}</h3>
          {project.role && <p className="text-white/60 text-sm font-medium mb-4">{project.role}</p>}
          <p className="text-white/80 mb-6 max-w-2xl leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.techStack.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-white/15 text-white rounded-full text-sm font-medium border border-white/25">
                {tech}
              </span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-sky-700 font-semibold rounded-full hover:bg-sky-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            View on GitHub
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Regular Project Card ─────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.08);
  const placeholder = `https://placehold.co/600x400/e0f2fe/0284c7?text=${encodeURIComponent(project.title)}`;
  return (
    <div ref={ref}
      className={`group bg-white/80 dark:bg-gray-900/75 rounded-3xl shadow-xl overflow-hidden border border-white/70 dark:border-gray-600/55 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-sky-200/70 dark:hover:border-sky-700/60 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="relative overflow-hidden">
        <img src={project.imageUrl || placeholder} alt={project.title} loading="lazy" decoding="async"
          className="w-full h-44 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = placeholder; }}
          width="600" height="176" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors duration-200">
          View on GitHub <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────
const Projects = React.memo(({ data }) => {
  const featured = data.find((p) => p.featured);
  const regular = data.filter((p) => !p.featured);
  return (
    <section id="projects" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={BookOpenIcon} title="My Projects" />
      <div className="max-w-6xl mx-auto">
        {featured && <FeaturedProjectCard project={featured} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {regular.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = React.memo(({ data, socialLinks }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={EnvelopeIcon} title="Contact Me" />
      <div ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="rounded-3xl bg-gradient-to-r from-sky-200/40 via-indigo-200/25 to-sky-200/40 dark:from-sky-900/25 dark:via-indigo-900/20 dark:to-sky-900/25 p-[1px] shadow-xl">
          <div className="bg-white/70 dark:bg-gray-800/55 p-8 md:p-12 rounded-3xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact details */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get in Touch</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                  Open to internships, freelance collaborations, and impactful backend/distributed systems projects. Feel free to reach out.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" aria-hidden="true" />
                    <a href={`mailto:${data.email}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-sm">
                      {data.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{data.phone} (Home)</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect With Me</h3>
                  {/* UX: 44×44px touch targets for social icons */}
                  <div className="flex gap-3">
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                      <Github size={22} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200">
                      <Linkedin size={22} />
                    </a>
                    <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) profile"
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                      <X size={22} />
                    </a>
                    <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium blog"
                      className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 rounded-full hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200">
                      <NewspaperIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact form — UX: visible labels, not placeholder-only */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Send me a message</h3>
                <form action="https://formspree.io/f/xdkdjdvn" method="POST" className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input type="text" id="contact-name" name="name" placeholder="Your Name" required autoComplete="name"
                      className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input type="email" id="contact-email" name="_replyto" placeholder="you@example.com" required autoComplete="email"
                      className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <textarea id="contact-message" name="message" rows="4" placeholder="Your Message..." required
                      className="block w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm transition-colors resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full flex justify-center py-3 px-6 border border-transparent shadow-xl text-base font-semibold rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-200 hover:-translate-y-0.5">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// ─── Scroll To Top ────────────────────────────────────────────────────────────
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300 animate-bounce">
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ data }) => (
  <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
    <p className="text-gray-600 dark:text-gray-400 text-sm">
      &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
    </p>
    <div className="mt-4 flex justify-center gap-5">
      <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        <Github className="h-5 w-5" />
      </a>
      <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200">
        <Linkedin className="h-5 w-5" />
      </a>
      <a href={data.socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
        <X className="h-5 w-5" />
      </a>
      <a href={data.socialLinks.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium Blog"
        className="text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200">
        <NewspaperIcon className="h-5 w-5" />
      </a>
    </div>
  </footer>
);
