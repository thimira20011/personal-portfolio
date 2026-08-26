import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpenIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  AcademicCapIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowDownCircleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Github, Linkedin, X, Sun, Moon, Menu, ChevronUp } from 'lucide-react';

// ─── Scroll-triggered fade-in hook ───────────────────────────────────────────
const useScrollAnimation = (threshold = 0.12) => {
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
  'Information Systems Undergraduate',
  '.NET 10 & C# Developer',
  'Green Coding Enthusiast',
  'Full-Stack Developer',
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
    const numParticles = 75;
    let stars = [];
    const numStars = 250;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity + 0.2})`;
        ctx.fill();
      });
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
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
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
      });
    };

    const updateStars = () => {
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < 0) {
          s.x = canvas.width;
          s.y = Math.random() * canvas.height;
        }
      });
    };

    const animate = () => {
      if (isDarkMode) {
        drawStars();
        updateStars();
      } else {
        drawParticles();
        updateParticles();
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    if (isDarkMode) initStars();
    else initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
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
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // ── Portfolio Data ──────────────────────────────────────────────────────────
  const portfolioData = {
    name: 'Thimira Niranjaya',
    title: 'Information Systems Undergraduate',
    tagline: 'Building high-performance software with .NET 10, C#, and green coding principles.',
    profilePicUrl:
      'https://github.com/thimira20011/portfolio-pictures/blob/main/WhatsApp%20Image%202026-03-30%20at%2023.34.12.jpeg?raw=true',
    resumeUrl:
      'https://drive.google.com/file/d/1A5cI1T66xB9HFwusyAgLF2TcU9Mkut8o/view?usp=sharing',

    // ── Stats Bar ─────────────────────────────────────────────────────────────
    stats: [
      { label: 'Projects Built', value: 6, suffix: '+' },
      { label: 'Years Coding', value: 2, suffix: '+' },
      { label: 'Certifications', value: 4, suffix: '' },
      { label: 'Technologies', value: 10, suffix: '+' },
    ],

    // ── About & Skills ────────────────────────────────────────────────────────
    about: {
      bio: 'I am an Information Systems undergraduate at the Sabaragamuwa University of Sri Lanka with a passion for building high-performance, sustainable software. My technical focus has evolved into a specialization in .NET 10 and C#, with a deep interest in Performance Engineering and Green Coding practices to reduce Software Carbon Intensity. Currently, I lead the NearU project, a university-oriented digital marketplace built with .NET 10, React (TypeScript), and PostgreSQL. I thrive at the intersection of technical architecture and efficient delivery, backed by certifications in Six Sigma and Scrum Fundamentals. When I\'m not optimizing codebases or managing cloud infrastructure on Linux, I\'m likely exploring the latest updates in technology or preparing for my next professional milestone.',
      skillGroups: [
        {
          category: 'Core Stack',
          items: ['.NET 10', 'C#', 'Java', 'Node.js', 'Firebase', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
        },
        {
          category: 'Specializations & Tools',
          items: ['Green Coding', 'Software Carbon Intensity Reduction', 'Git', 'Linux', 'Cloud Integration', 'Figma', 'UI/UX Design', 'Canva'],
        },
      ],
    },

    // ── Education & Experience Timeline ───────────────────────────────────────
    timeline: [
      {
        id: 1,
        type: 'education',
        title: 'BSc (Hons) in Information Systems',
        organization: 'Sabaragamuwa University of Sri Lanka',
        period: 'July 2024 – July 2028 (Expected)',
        description:
          'Specializing in software engineering, database systems, and information systems management. Maintaining a focus on high-performance application development and modern software architecture.',
      },
      {
        id: 2,
        type: 'project',
        title: 'Project Lead & Full-Stack Developer',
        organization: 'NearU — University Digital Marketplace',
        period: '2024 – Present',
        description:
          'Leading end-to-end development of a university-oriented digital marketplace for the SUSL campus community. Architecting the system with .NET 10, C#, React (TypeScript), and PostgreSQL — covering RESTful APIs, JWT authentication, and real-time features.',
      },
      {
        id: 3,
        type: 'activity',
        title: 'Graphic Designer & Member',
        organization: 'Rotaract Club of SUSL',
        period: '2024 – Present',
        description:
          'Creating visual content, promotional materials, and digital assets for community service events and club activities. Applying UI/UX design principles to produce impactful graphics with Figma and Canva.',
      },
      {
        id: 4,
        type: 'activity',
        title: 'Student Member',
        organization: 'IEEE Student Branch — SUSL',
        period: '2024 – Present',
        description:
          'Active participant in IEEE technical workshops, seminars, and knowledge-sharing sessions focused on emerging technologies, engineering best practices, and professional development.',
      },
      {
        id: 5,
        type: 'publication',
        title: 'Technical Writer & Content Creator',
        organization: 'Medium & LinkedIn Articles',
        period: '2024 – Present',
        description:
          'Publishing in-depth technical articles on software development, .NET performance, C# best practices, and green coding principles — building an online presence in the developer community.',
      },
    ],

    // ── Achievements ──────────────────────────────────────────────────────────
    // TODO: Replace placeholder with your real competition achievements
    achievements: [
      {
        id: 1,
        title: 'Competition Achievement — Update Me',
        event: 'Event / Competition Name',
        year: '2025',
        description: 'Replace this with your actual competition achievement details.',
      },
    ],

    // ── Certifications ────────────────────────────────────────────────────────
    certifications: [
      {
        id: 1,
        title: 'Six Sigma Yellow Belt',
        issuer: 'Six Sigma',
        issuedDate: 'Add date',
        credentialUrl: '#',
      },
      {
        id: 2,
        title: 'Scrum Fundamentals (SFC)',
        issuer: 'Scrum Study',
        issuedDate: 'Add date',
        credentialUrl: '#',
      },
      {
        id: 3,
        title: 'Digital Marketing',
        issuer: 'Google Digital Garage',
        issuedDate: 'Add date',
        credentialUrl: '#',
      },
      {
        id: 4,
        title: 'AI Certifications',
        issuer: 'LinkedIn Learning',
        issuedDate: 'Add date',
        credentialUrl: '#',
      },
    ],

    // ── Projects ──────────────────────────────────────────────────────────────
    projects: [
      {
        id: 0,
        featured: true,
        title: 'NearU — University Digital Marketplace',
        description:
          'A university-oriented digital marketplace connecting SUSL students with local services, products, and opportunities. Features RESTful APIs, JWT authentication, real-time updates, and a modern responsive UI built for the campus community.',
        link: 'https://github.com/thimira20011',
        imageUrl: '',
        techStack: ['.NET 10', 'C#', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
        role: 'Project Lead & Full-Stack Developer',
        status: 'In Development',
      },
      {
        id: 1,
        featured: false,
        title: 'Galagama Gems',
        description:
          'A modern, animated website showcasing gemstone products with smooth animations and transitions. Features comprehensive UI components, form validation, and a fully responsive design with advanced animation patterns.',
        link: 'https://github.com/thimira20011/Galagama-Gems.git',
        imageUrl:
          'https://github.com/thimira20011/portfolio-pictures/blob/main/Screenshot%202025-11-21%20230125.png?raw=true',
        techStack: ['React', 'TypeScript', 'Radix UI', 'Motion', 'Tailwind CSS'],
      },
      {
        id: 2,
        featured: false,
        title: 'The Reuse Hub',
        description:
          'A dynamic web application for managing and listing reusable items. Built with React and a Node.js backend. Features user authentication, real-time updates, and a clean user interface.',
        link: 'https://github.com/thimira20011/the-reuse-hub-v2.git',
        imageUrl:
          'https://github.com/thimira20011/portfolio-pictures/blob/main/ReuseHubHome.png?raw=true',
        techStack: ['React', 'Node.js', 'MySQL', 'Tailwind CSS'],
      },
      {
        id: 3,
        featured: false,
        title: 'Personal Expense Tracker',
        description:
          'An enterprise-style application for tracking personal expenses. Users can add, edit, and delete expenses, and view spending habits over time with clean reporting.',
        link: 'https://github.com/thimira20011/expense-tracker.git',
        imageUrl:
          'https://raw.githubusercontent.com/thimira20011/portfolio-pictures/refs/heads/main/expenseTracker.png',
        techStack: ['Java'],
      },
      {
        id: 4,
        featured: false,
        title: 'YouThink Website',
        description:
          'A responsive and modern website template built with a focus on simplicity and user experience.',
        link: 'https://github.com/thimira20011/you-think.git',
        imageUrl:
          'https://github.com/thimira20011/portfolio-pictures/blob/main/youThink.png?raw=true',
        techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      },
      // TODO: Replace placeholders below with your new projects
      {
        id: 5,
        featured: false,
        title: 'Project — Coming Soon',
        description: 'Replace this with your next project description, tech stack, and GitHub link.',
        link: 'https://github.com/thimira20011',
        imageUrl: '',
        techStack: ['Add', 'Tech', 'Stack'],
      },
    ],

    // ── Social & Contact ──────────────────────────────────────────────────────
    socialLinks: {
      github: 'https://github.com/thimira20011',
      linkedin:
        'https://www.linkedin.com/in/thimira-niranjaya-keerthiwansha-a62838310?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BSUE6RlHVTui6mGxCVORF%2BQ%3D%3D',
      x: 'https://x.com/TNiranjaya20011',
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
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-700/15" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-700/15" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-700/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent pt-20">
        <NavBar />
        <Header data={portfolioData} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <StatsBar stats={portfolioData.stats} />
        <About data={portfolioData.about} />
        <ExperienceTimeline data={portfolioData.timeline} />
        <Achievements data={portfolioData.achievements} />
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
      <Icon className="h-8 w-8 inline-block mr-2 text-sky-600 dark:text-sky-400" />
      {title}
    </span>
  </h2>
);

// ─── NavBar with mobile hamburger ─────────────────────────────────────────────
const NavBar = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop nav */}
      <nav aria-label="Section navigation" className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden sm:block">
        <div className="flex items-center gap-2 rounded-full bg-white/55 dark:bg-gray-800/45 backdrop-blur-lg border border-white/60 dark:border-gray-600/50 shadow-xl px-3 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm font-medium rounded-full text-gray-700 dark:text-gray-200 hover:bg-sky-100/70 dark:hover:bg-gray-700/70 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-white/60 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-gray-700 transition-all duration-300"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {isOpen && (
          <div className="absolute top-14 left-0 w-52 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-white/60 dark:border-gray-600/50 py-2 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700/70 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
});

// ─── Header with typing animation ────────────────────────────────────────────
const Header = React.memo(({ data, isDarkMode, toggleDarkMode }) => {
  const primaryButtonClass = 'bg-sky-600 hover:bg-sky-700 focus:ring-sky-500';
  const secondaryButtonClass =
    'border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 focus:ring-sky-500';

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;
    const currentTitle = TYPING_TITLES[titleIndex];
    const speed = isDeleting ? 40 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setIsPausing(true);
        setTimeout(() => {
          setIsPausing(false);
          setIsDeleting(true);
        }, 2200);
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
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700"
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-2 text-gray-900 dark:text-white">
            Hi, I'm <span className="text-sky-600 dark:text-sky-400">{data.name}</span>
          </h1>

          {/* Typing animation */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300 min-h-[2.5rem]">
            {displayText}
            <span className="inline-block w-0.5 h-6 bg-sky-500 ml-0.5 align-middle animate-pulse" />
          </p>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
            {data.tagline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#projects"
              className={`inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-3xl shadow-xl text-white ${primaryButtonClass} transition duration-300 ease-in-out transform hover:-translate-y-0.5`}
            >
              My Work
              <ArrowDownCircleIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-8 py-4 border-2 text-base font-medium rounded-3xl shadow-lg bg-white dark:bg-gray-800 ${secondaryButtonClass} transition duration-300 ease-in-out transform hover:-translate-y-0.5`}
            >
              Download Resume
              <ArrowDownTrayIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300/40 to-indigo-300/30 blur-md" />
          <img
            src={data.profilePicUrl}
            alt="Thimira Niranjaya"
            loading="eager"
            className="relative w-full h-full rounded-full object-cover ring-4 ring-sky-200 dark:ring-sky-600 transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl"
          />
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
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCounts(stats.map((s) => Math.round(s.value * eased)));
      if (step >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, stats]);

  return (
    <div
      ref={ref}
      className={`my-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 text-center shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
              {counts[i]}
              {stat.suffix}
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
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="bg-white/70 dark:bg-gray-800/55 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50 transition duration-300 ease-in-out hover:shadow-2xl hover:border-sky-200/70 dark:hover:border-sky-700/60">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{data.bio}</p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Technical Skills</h3>
            <div className="space-y-5">
              {data.skillGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 mb-3">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-4 py-2 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300 rounded-full font-medium text-sm transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                      >
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
  education:   { dot: 'bg-sky-500',     badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300',    label: 'Education'   },
  project:     { dot: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', label: 'Project'    },
  activity:    { dot: 'bg-violet-500',  badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300',  label: 'Activity'   },
  publication: { dot: 'bg-orange-500',  badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',  label: 'Publication'},
};

const TimelineItem = ({ item, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.activity;
  return (
    <div
      ref={ref}
      className={`relative pl-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline dot */}
      <div className={`absolute left-0 top-2 w-4 h-4 rounded-full ${cfg.dot} ring-4 ring-white dark:ring-gray-900 shadow-md z-10`} />

      <div className="bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 mb-6 shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-xl hover:border-sky-200/60 dark:hover:border-sky-700/50 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <div>
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
      {/* Continuous vertical line */}
      <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-700" />
      {data.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  </section>
));

// ─── Achievements ─────────────────────────────────────────────────────────────
const Achievements = React.memo(({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="achievements" className="py-16 md:py-24 scroll-mt-28">
      <SectionHeading icon={TrophyIcon} title="Achievements" />
      <div
        ref={ref}
        className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {data.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-white/70 dark:bg-gray-800/55 p-6 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50 hover:shadow-2xl hover:-translate-y-1.5 hover:border-amber-200/70 dark:hover:border-amber-700/60 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-md">
                <TrophyIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{achievement.title}</h3>
                <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mt-0.5">{achievement.event}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">{achievement.year}</span>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
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
      <div
        ref={ref}
        className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {data.map((cert) => (
          <div
            key={cert.id}
            className="bg-white/70 dark:bg-gray-800/55 p-6 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50 transition duration-300 ease-in-out transform hover:-translate-y-1.5 hover:shadow-2xl hover:border-sky-200/70 dark:hover:border-sky-700/60"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
            {(cert.issuer || cert.issuedDate) && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {[cert.issuer, cert.issuedDate].filter(Boolean).join(' • ')}
              </p>
            )}
            {cert.credentialUrl && cert.credentialUrl !== '#' ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-500 transition duration-300 ease-in-out"
              >
                View Credential
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
              </a>
            ) : (
              <span className="mt-4 inline-block text-sm text-gray-500 dark:text-gray-400">
                Credential link available on request
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
    <div
      ref={ref}
      className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 p-[1.5px] shadow-2xl">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600/95 via-indigo-600/95 to-violet-700/95 backdrop-blur-md p-8 md:p-10">
          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5">
              <StarIcon className="h-5 w-5 text-yellow-300 drop-shadow" />
              <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Featured Project</span>
            </div>
            {project.status && (
              <span className="px-3 py-0.5 bg-green-400/25 text-green-300 rounded-full text-xs font-semibold border border-green-400/40">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{project.title}</h3>
          {project.role && (
            <p className="text-white/60 text-sm font-medium mb-4">{project.role}</p>
          )}
          <p className="text-white/80 mb-6 max-w-2xl leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white/15 text-white rounded-full text-sm font-medium border border-white/25"
              >
                {tech}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-sky-700 font-semibold rounded-full hover:bg-sky-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            View on GitHub
            <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Regular Project Card ─────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.08);
  // Fallback placeholder image using project title
  const placeholder = `https://placehold.co/600x400/e0f2fe/0284c7?text=${encodeURIComponent(project.title)}`;

  return (
    <div
      ref={ref}
      className={`group bg-white/80 dark:bg-gray-900/75 rounded-3xl shadow-xl overflow-hidden border border-white/70 dark:border-gray-600/55 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-sky-200/70 dark:hover:border-sky-700/60 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl || placeholder}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = placeholder; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-500 transition duration-300 ease-in-out"
        >
          View on GitHub
          <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

// ─── Projects ─────────────────────────────────────────────────────────────────
const Projects = React.memo(({ data }) => {
  const featured = data.find((p) => p.featured);
  const regular = data.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 scroll-mt-28 bg-gradient-to-br from-gray-100/70 to-sky-100/55 dark:from-gray-800/65 dark:to-slate-900/70 rounded-3xl border border-white/60 dark:border-gray-600/50 backdrop-blur-md"
    >
      <SectionHeading icon={BookOpenIcon} title="My Projects" />
      <div className="max-w-6xl mx-auto p-4">
        {featured && <FeaturedProjectCard project={featured} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="rounded-3xl bg-gradient-to-r from-sky-200/40 via-indigo-200/25 to-sky-200/40 dark:from-sky-900/25 dark:via-indigo-900/20 dark:to-sky-900/25 p-[1px] shadow-xl">
          <div className="bg-white/70 dark:bg-gray-800/55 p-8 md:p-12 rounded-3xl backdrop-blur-lg border border-white/60 dark:border-gray-600/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact details */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get in Touch</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  I'm open to internships, collaborations, and impactful software projects. Feel free to reach out.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out"
                    >
                      {data.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    <span className="text-gray-700 dark:text-gray-300">{data.phone}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connect With Me</h3>
                  <div className="flex space-x-4">
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                      className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700">
                      <Github size={32} />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700">
                      <Linkedin size={32} />
                    </a>
                    <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                      className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700">
                      <X size={32} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Send me a message</h3>
                <form action="https://formspree.io/f/xdkdjdvn" method="POST" className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" required
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" id="email" name="_replyto" placeholder="you@example.com" required
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                    <textarea id="message" name="message" rows="4" placeholder="Your Message..." required
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                  </div>
                  <button type="submit"
                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-xl text-base font-medium rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition duration-300 ease-in-out">
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
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 transition-all duration-300 focus:outline-none animate-bounce"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ data }) => (
  <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
    <p className="text-gray-600 dark:text-gray-400">
      &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
    </p>
    <div className="mt-4 flex justify-center space-x-6">
      <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
        className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
        <Github className="h-5 w-5" />
      </a>
      <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
        className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
        <Linkedin className="h-5 w-5" />
      </a>
      <a href={data.socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
        className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
        <X className="h-5 w-5" />
      </a>
    </div>
  </footer>
);
