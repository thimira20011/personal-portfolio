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
import {
  Github,
  Linkedin,
  X,
  Sun,
  Moon,
  Menu,
  ChevronUp,
  Globe,
  Copy,
  Check,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

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

// ─── Typing animation titles (Master CV) ───────────────────────────────────────
const TYPING_TITLES = [
  'IS Undergrad',
  'Full-Stack & .NET Engineer',
  'Real-Time & Distributed Systems',
  'Lead Developer @ NearU',
  '1st Runner-Up @ Aurora 2026',
  'Writer on Medium',
];

// ─── Background Animation ─────────────────────────────────────────────────────
const BackgroundAnimation = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = Math.floor((width * height) / 10000);
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const starColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${star.alpha * (isDarkMode ? 0.6 : 0.25)})`;
        ctx.fill();
      }
      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copiedType, setCopiedType] = useState(null);
  const [projectFilter, setProjectFilter] = useState('All');

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

  const copyToClipboard = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2500);
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // All Portfolio Data — Master CV Verbatim
  // ────────────────────────────────────────────────────────────────────────────
  const portfolioData = {
    name: 'Thimira Niranjaya Keerthiwansha',
    shortName: 'Thimira Niranjaya',
    title: 'Full-Stack & .NET Engineer',
    tagline:
      'Building real-time, distributed backend systems — .NET 10 · SignalR · Redis · PostGIS · AWS Cloud.',
    location: 'Ratnapura District, Sabaragamuwa Province, Sri Lanka.',
    profilePicUrl:
      'https://github.com/thimira20011/portfolio-pictures/blob/main/WhatsApp%20Image%202026-03-30%20at%2023.34.12.jpeg?raw=true',
    resumeUrl:
      'https://drive.google.com/file/d/1A5cI1T66xB9HFwusyAgLF2TcU9Mkut8o/view?usp=sharing',

    // ── About & Technical Skills (7 Categories) ──────────────────────────────
    about: {
      bio: "I build real-time, distributed backend systems — with a strong focus on query performance, spatial data, and the DevOps under the hood. As an Information Systems undergraduate at Sabaragamuwa University of Sri Lanka (SUSL), I specialize in .NET 10, ASP.NET Core, and cloud-native architecture. I lead a 4-developer engineering team on NearU, author technical deep-dives on Medium, and placed 1st Runner-Up at Aurora 2026 with a multi-layered financial threat detection platform. Currently open to backend engineering, distributed systems, and full-stack software opportunities.",
      skillGroups: [
        {
          category: 'Distributed & Backend',
          items: [
            'C#',
            '.NET 10 / 8',
            'ASP.NET Core',
            'EF Core',
            'Node.js',
            'Express.js',
            'RESTful APIs',
            'Clean Architecture',
            'CQRS & MediatR',
            'Repository Pattern',
            'SignalR (WebSockets)',
          ],
        },
        {
          category: 'Cloud, DevOps & Containers',
          items: [
            'AWS (ECS, ECR, RDS, VPC, CloudWatch, ALB, Route 53)',
            'Microsoft Azure',
            'Docker',
            'Docker Compose',
            'CI/CD Pipelines',
            'Git & GitHub Actions',
          ],
        },
        {
          category: 'Frontend & UI',
          items: [
            'React 18',
            'Next.js',
            'JavaScript (ES6+)',
            'TypeScript',
            'Tailwind CSS',
            'HTML5 / CSS3',
            'Responsive Design',
          ],
        },
        {
          category: 'Databases & Caching',
          items: [
            'PostgreSQL',
            'PostGIS (Spatial)',
            'Microsoft SQL Server',
            'Redis (Cache-Aside & Pub/Sub)',
            'Firebase',
            'MongoDB',
          ],
        },
        {
          category: 'AI, Security & Quality',
          items: [
            'OWASP Top 10',
            'JWT & RBAC',
            'OAuth 2.0',
            'Roslyn Static Analysis',
            'Prompt Engineering',
            'Agentic AI',
            'LLaMA 3.3',
            'Gemini API',
          ],
        },
        {
          category: 'Testing & Observability',
          items: [
            'xUnit',
            'Moq',
            'Postman',
            'k6 Load Testing',
            'OpenTelemetry',
            'Prometheus',
            'Grafana',
            'Serilog',
          ],
        },
        {
          category: 'Game Development & Systems',
          items: [
            'Godot 4',
            'GDScript',
            'C++',
            'Python',
            '2D Kinematics & Physics Engine',
          ],
        },
      ],
    },

    // ── Key Engineering Projects (Master CV Verbatim) ─────────────────────────
    projects: [
      {
        id: 1,
        featured: true,
        category: '.NET & Distributed Systems',
        title: 'NearU — Microservices Ride-Sharing Platform',
        period: 'Oct 2024 – Present',
        role: 'Lead Backend & Cloud Engineer (Leading a 4-Developer Team)',
        status: 'Active Engineering Project',
        description:
          'High-concurrency microservices ride-sharing platform engineered to handle peak campus transit loads. Built with ASP.NET Core (.NET 10), MediatR CQRS, Redis distributed cache-aside, SignalR WebSockets for driver location tracking, PostGIS spatial indexing, and RabbitMQ event messaging.',
        bullets: [
          'Led a 4-developer team as Scrum Master, managing Jira sprint cycles, code reviews, and Git branching.',
          'Built real-time ride-matching with SignalR WebSockets and Redis pub/sub, using PostGIS spatial indexing for sub-second location queries.',
          'Designed Clean Architecture across 4 microservices with MediatR CQRS, Repository Pattern, and EF Core.',
          'Secured endpoints via JWT, role-based access control (RBAC), refresh-token rotation, and BCrypt password hashing.',
          'Containerized 11 services with Docker and deployed to AWS ECS Fargate across a multi-AZ VPC behind an Application Load Balancer (ALB).',
        ],
        techStack: [
          '.NET 10',
          'ASP.NET Core',
          'SignalR',
          'Redis',
          'PostgreSQL',
          'PostGIS',
          'RabbitMQ',
          'Docker',
          'AWS ECS',
        ],
        link: 'https://github.com/thimira20011/NearU-Backend',
        demoUrl: 'https://nearusab.me',
        repoLabel: 'github.com/thimira20011/NearU-Backend',
        imageUrl: '',
      },
      {
        id: 2,
        featured: false,
        category: 'Cloud & DevOps',
        title: 'NearU AWS Cloud Infrastructure',
        period: 'Jan 2026 – Present',
        role: 'DevOps & Cloud Engineer',
        status: 'Production Cloud Infra',
        description:
          'Production-ready AWS infrastructure for NearU microservices deployed across ap-south-1 with high availability, private subnets, and automated monitoring.',
        bullets: [
          'Architected a multi-AZ VPC across ap-south-1 with public/private subnets, NAT Gateways, and route tables.',
          'Configured ECS Fargate clusters running containerized .NET microservices behind an Application Load Balancer.',
          'Provisioned Amazon RDS for PostgreSQL with automated backups, Multi-AZ failover, and strict security group isolation.',
          'Built CloudWatch metric alarms and dashboard alerts for CPU, memory utilization, and 5XX error thresholds.',
        ],
        techStack: ['AWS VPC', 'ECS Fargate', 'RDS PostgreSQL', 'ALB', 'CloudWatch', 'Route 53', 'Docker'],
        link: 'https://github.com/thimira20011/NearU-Backend',
        repoLabel: 'github.com/thimira20011/NearU-Backend',
        imageUrl: '',
      },
      {
        id: 3,
        featured: false,
        category: 'AI & Security',
        title: 'ShadowSense — Threat & Financial Fraud Detection System',
        period: 'Jan 2026 – Feb 2026',
        role: 'AI & Systems Architect',
        status: '🥈 1st Runner-Up @ Aurora 2026',
        description:
          'Multi-layered fraud detection engine combining behavioral analysis, rule-based heuristics, and machine learning to intercept unauthorized freelancer transactions.',
        bullets: [
          'Designed a hybrid anomaly detection pipeline combining isolation forests and heuristic thresholds to score transaction risk in real time.',
          'Implemented an automated alert-and-freeze mechanism that locks suspicious accounts and notifies reviewers within seconds of detection.',
          'Placed 1st Runner-Up at Aurora 2026 (National AI Ideathon organized by IEEE WIE Student Branch Affinity Group, SUSL).',
        ],
        techStack: ['Python', 'FastAPI', 'Machine Learning', 'Isolation Forests', 'PostgreSQL', 'Docker'],
        link: 'https://github.com/thimira20011/ShadowSense-2026-Aurora',
        repoLabel: 'github.com/thimira20011/ShadowSense-2026-Aurora',
        imageUrl: '',
      },
      {
        id: 4,
        featured: false,
        category: '.NET & Distributed Systems',
        title: 'GreenOps Intelligence Hub — Cloud Carbon & Efficiency Engine',
        period: 'Jan 2026 – Present',
        role: 'Systems & Cloud Engineer',
        status: 'Active Engine',
        description:
          'Automated cloud efficiency and Software Carbon Intensity (SCI) rating engine for Azure resources with Roslyn static AST code analysis and AI optimization recommendations.',
        bullets: [
          'Built a .NET BackgroundService that polls Azure telemetry every 60s via Azure SDK, persisting metrics with EF Core.',
          'Implemented the Green Software Foundation’s SCI formula ((E × I + M)/R) with a 12-region carbon lookup table.',
          'Wrote a Roslyn-based static analyzer that detects common .NET performance anti-patterns, with fix recommendations via LLaMA 3.3 70B.',
          'Stood up Grafana dashboards, Prometheus metrics, OpenTelemetry tracing, and containerized the stack with Docker Compose.',
        ],
        techStack: ['.NET 10', 'C#', 'Azure SDK', 'Roslyn', 'EF Core', 'Docker', 'Grafana', 'Prometheus'],
        link: 'https://github.com/thimira20011/GreenOps-Intelligence-Hub',
        repoLabel: 'github.com/thimira20011/GreenOps-Intelligence-Hub',
        imageUrl: '',
      },
      {
        id: 5,
        featured: false,
        category: 'Full-Stack Web',
        title: 'Reuse Hub v2 — Campus Resource-Sharing Platform',
        period: 'Aug 2025 – Sep 2025',
        role: 'Full-Stack Developer',
        status: 'Live & Deployed',
        description:
          'Peer-to-peer resource-sharing marketplace built to help university students redistribute unused items and coordinate campus tasks with real-time sync.',
        bullets: [
          'Engineered a peer-to-peer resource-sharing marketplace to help students redistribute unused items and coordinate campus-wide tasks.',
          'Built a responsive UI in React and Tailwind CSS, backed by Firebase and Node.js for real-time data sync and authentication.',
        ],
        techStack: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
        link: 'https://github.com/thimira20011/the-reuse-hub-v2',
        demoUrl: 'https://thimira20011.github.io/the-reuse-hub-v2',
        repoLabel: 'github.com/thimira20011/the-reuse-hub-v2',
        imageUrl: 'https://github.com/thimira20011/portfolio-pictures/blob/main/ReuseHubHome.png?raw=true',
      },
      {
        id: 6,
        featured: false,
        category: 'Game Engineering',
        title: 'Knight Fury — 2D Action-Platformer',
        period: 'Jun 2026 – Jul 2026',
        role: 'Game Programmer & Designer',
        status: '🥉 2nd Runner-Up @ Pixel Pioneers Game Jam',
        description:
          'Fast-paced 2D action-platformer built with Godot 4 and GDScript featuring custom physics kinematics, autonomous RayCast2D enemy patrol AI, and time-slowdown mechanics.',
        bullets: [
          'Engineered a physics-based CharacterBody2D player controller with responsive movement, jumping, and state-driven animations.',
          'Implemented autonomous enemy patrolling using RayCast2D for wall/ledge collision detection and global GameManager for score tracking.',
          'Placed 2nd Runner-Up at Pixel Pioneers Game Jam v1.0 (SUSL, IEEE Computer Society Student Branch).',
        ],
        techStack: ['Godot 4', 'GDScript', '2D Physics Engine', 'RayCast2D AI'],
        link: 'https://github.com/thimira20011/Knight_Fury',
        repoLabel: 'github.com/thimira20011/Knight_Fury',
        imageUrl: '',
      },
      {
        id: 7,
        featured: false,
        category: 'Java Application',
        title: 'Personal Expense Tracker',
        period: '2024',
        role: 'Java Developer',
        status: 'Completed',
        description:
          'An enterprise-style Java application for tracking personal expenses — add, edit, delete entries and visualize spending habits over time.',
        bullets: [
          'Built an interactive CLI financial tracker in Java with modular object-oriented design and transaction validation.',
          'Implemented category-based expense breakdowns, monthly summaries, and persistent record storage.',
        ],
        techStack: ['Java'],
        link: 'https://github.com/thimira20011/expense-tracker.git',
        repoLabel: 'github.com/thimira20011/expense-tracker',
        imageUrl:
          'https://raw.githubusercontent.com/thimira20011/portfolio-pictures/refs/heads/main/expenseTracker.png',
      },
    ],

    // ── Honors & National Awards ──────────────────────────────────────────────
    achievements: [
      {
        id: 1,
        title: '1st Runner-Up — Aurora 2026 (National AI Ideathon)',
        event: 'Organized by IEEE WIE Student Branch Affinity Group, SUSL',
        year: '2026',
        description:
          'Awarded 1st Runner-Up for designing ShadowSense — an AI-powered financial fraud detection engine that uses isolation forests and behavioral heuristics to safeguard digital freelancer transactions.',
      },
      {
        id: 2,
        title: '2nd Runner-Up — Pixel Pioneers Game Jam v1.0',
        event: 'Organized by IEEE Computer Society Student Branch Chapter, SUSL',
        year: '2026',
        description:
          'Awarded 2nd Runner-Up for developing Knight Fury — a 2D action-platformer built in Godot 4 with responsive kinematics, autonomous RayCast2D enemy AI, and custom hazard state management.',
      },
    ],

    // ── Technical Publications on Medium ──────────────────────────────────────
    publications: [
      {
        id: 1,
        title: 'Securing .NET 10 Microservices: A Production Guide to Zero-Trust Architecture',
        topic: 'Microservices Security',
        url: 'https://medium.com/@tnirajaya2001/securing-net-10-microservices-a-production-guide-to-zero-trust-architecture-c30985b98f2f',
        date: '2026',
        readTime: '6 min read',
      },
      {
        id: 2,
        title: 'Clean Architecture with ASP.NET Core 10: From Spaghetti to Separation',
        topic: 'Software Architecture',
        url: 'https://medium.com/@tnirajaya2001/clean-architecture-with-asp-net-core-10-from-spaghetti-to-separation-256cf4673ec2',
        date: '2026',
        readTime: '7 min read',
      },
      {
        id: 3,
        title: 'Inside the Engine: How .NET 10 Compiles and Executes Your Code',
        topic: 'Runtime Internals',
        url: 'https://medium.com/@tnirajaya2001/inside-the-engine-how-net-10-compiles-and-executes-your-code-c361491ba63a',
        date: '2026',
        readTime: '8 min read',
      },
      {
        id: 4,
        title: 'Understanding Git Internals: What Actually Happens When You Commit',
        topic: 'Developer Tooling',
        url: 'https://medium.com/@tnirajaya2001/understanding-git-internals-what-actually-happens-when-you-commit-daaa268f760f',
        date: '2026',
        readTime: '5 min read',
      },
      {
        id: 5,
        title: 'Building Resilient Distributed Systems: Circuit Breakers and Fallbacks in .NET',
        topic: 'Distributed Systems',
        url: 'https://medium.com/@tnirajaya2001/building-resilient-distributed-systems-circuit-breakers-and-fallbacks-in-net-e75877fbaea2',
        date: '2026',
        readTime: '6 min read',
      },
      {
        id: 6,
        title: 'Designing Real-Time Ride-Matching Systems with SignalR, Redis, and PostGIS',
        topic: 'Real-Time Systems',
        url: 'https://medium.com/@tnirajaya2001/designing-real-time-ride-matching-systems-with-signalr-redis-and-postgis-7622619eb608',
        date: '2026',
        readTime: '9 min read',
      },
      {
        id: 7,
        title: 'AI Agentic Design Patterns: Multi-Agent Collaboration and Task Decomposition',
        topic: 'Agentic AI',
        url: 'https://medium.com/@tnirajaya2001/ai-agentic-design-patterns-multi-agent-collaboration-and-task-decomposition-a7beabda26a2',
        date: '2026',
        readTime: '7 min read',
      },
    ],

    // ── Education & Experience Timeline ───────────────────────────────────────
    timeline: [
      {
        id: 1,
        type: 'education',
        title: 'BSc (Hons) in Information Systems',
        organization: 'Sabaragamuwa University of Sri Lanka — Faculty of Computing',
        period: 'July 2024 – July 2028 (Expected)',
        badgeText: 'Current GPA: 3.14 / 4.00',
        description:
          'Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Distributed Systems, Software Engineering, Cloud Computing, Linux Administration.',
      },
      {
        id: 2,
        type: 'project',
        title: 'Lead Backend & Cloud Engineer / Scrum Master',
        organization: 'NearU — Microservices Ride-Sharing Platform',
        period: 'Oct 2024 – Present',
        badgeText: 'Engineering Leadership (Team of 4)',
        description:
          'Led 4-developer engineering team; ran Jira sprint planning, code reviews, and Git branching. Built real-time ride-matching with SignalR & Redis pub/sub, PostGIS spatial indexing for sub-second location queries, JWT/RBAC auth, and containerized services.',
      },
      {
        id: 3,
        type: 'project',
        title: 'Cloud & DevOps Engineer',
        organization: 'NearU AWS Infrastructure Deployment',
        period: 'Jan 2026 – Present',
        badgeText: 'Multi-AZ Cloud Architecture',
        description:
          'Designed and deployed production-ready AWS cloud infrastructure across ap-south-1 with multi-AZ VPC, public/private subnets, ECS Fargate clusters, Application Load Balancer, and Amazon RDS PostgreSQL Multi-AZ.',
      },
      {
        id: 4,
        type: 'publication',
        title: 'Freelance Technical Writer',
        organization: 'Medium · medium.com/@tnirajaya2001',
        period: 'Nov 2025 – Present',
        badgeText: '7 Deep-Dive Publications',
        description:
          'Authored comprehensive technical guides covering .NET 10 microservices zero-trust security, Clean Architecture, Git internals, distributed circuit breakers, and SignalR/Redis/PostGIS real-time architecture.',
      },
      {
        id: 5,
        type: 'activity',
        title: 'Director of Graphic Design & Media Contributor',
        organization: 'Rotaract Club of Sabaragamuwa University of Sri Lanka',
        period: '2024 – Present',
        badgeText: 'Creative & Community Leadership',
        description:
          'Directed graphic design and visual media strategy for community development initiatives, including branding and promotional campaigns for the Infraworld SDG 9 Podcast series.',
      },
      {
        id: 6,
        type: 'activity',
        title: 'Active Member',
        organization: 'IEEE Student Branch & IEEE Computer Society, SUSL',
        period: '2025 – Present',
        badgeText: 'Technical Society',
        description:
          'Participated in national competitive hackathons, algorithmic coding competitions, and academic workshops hosted by IEEE Computer Society and IEEE WIE affinity groups.',
      },
    ],

    // ── Verified Certifications & Memberships ─────────────────────────────────
    certifications: [
      {
        id: 1,
        title: 'Scrum Fundamentals Certified (SFC)',
        issuer: 'SCRUMstudy',
        issuedDate: 'Apr 2026',
        credentialUrl: 'https://www.scrumstudy.com/',
      },
      {
        id: 2,
        title: 'Six Sigma Yellow Belt (SSYB)',
        issuer: '6Sstudy',
        issuedDate: 'Apr 2026',
        credentialUrl: 'https://www.6sstudy.com/',
      },
      {
        id: 3,
        title: 'Complete DevOps Bootcamp',
        issuer: 'KodeKloud',
        issuedDate: 'Feb 2025',
        credentialUrl: 'https://kodekloud.com/',
      },
      {
        id: 4,
        title: 'Docker Training Course for the Absolute Beginner',
        issuer: 'KodeKloud',
        issuedDate: 'Feb 2025',
        credentialUrl: 'https://kodekloud.com/',
      },
      {
        id: 5,
        title: 'AI Fluency for Students',
        issuer: 'Anthropic',
        issuedDate: 'Apr 2026',
        credentialUrl: '#',
      },
      {
        id: 6,
        title: 'MCP Fundamentals for Building AI Agents',
        issuer: 'Educative',
        issuedDate: 'Apr 2026',
        credentialUrl: 'https://www.educative.io/',
      },
      {
        id: 7,
        title: 'Digital Marketing Certified',
        issuer: 'HubSpot Academy',
        issuedDate: 'Apr 2026',
        credentialUrl: 'https://academy.hubspot.com/',
      },
      {
        id: 8,
        title: 'IEEE Computer Society Membership',
        issuer: 'IEEE Computer Society',
        issuedDate: 'Sep 2025 – Present',
        credentialUrl: 'https://www.computer.org/',
      },
      {
        id: 9,
        title: 'IEEE Student Membership',
        issuer: 'IEEE',
        issuedDate: 'Sep 2025 – Present',
        credentialUrl: 'https://www.ieee.org/',
      },
    ],

    // ── Social Links & Contact ────────────────────────────────────────────────
    socialLinks: {
      github: 'https://github.com/thimira20011',
      linkedin: 'https://www.linkedin.com/in/thimira-niranjaya-keerthiwansha',
      x: 'https://x.com/TNiranjaya20011',
      medium: 'https://medium.com/@tnirajaya2001',
      website: 'https://thimira.tech',
    },
    contact: {
      email: 'tnirajaya2001@gmail.com',
      phone: '(+94) 76 751 3695',
      whatsapp: '(+94) 70 512 7856',
      location: 'Ratnapura, Sri Lanka',
    },
  };

  // Filter projects by category
  const filteredProjects =
    projectFilter === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => {
          if (projectFilter === '.NET & Cloud') {
            return p.category === '.NET & Distributed Systems' || p.category === 'Cloud & DevOps';
          }
          if (projectFilter === 'AI & Security') {
            return p.category === 'AI & Security';
          }
          if (projectFilter === 'Web & Game') {
            return (
              p.category === 'Game Engineering' ||
              p.category === 'Full-Stack Web' ||
              p.category === 'Java Application'
            );
          }
          return true;
        });

  const featuredProject = portfolioData.projects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured || projectFilter !== 'All');

  return (
    <div className="relative font-sans antialiased min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300 selection:bg-sky-500 selection:text-white">
      <BackgroundAnimation isDarkMode={isDarkMode} />

      {/* Floating Centered Pill Navbar */}
      <NavBar socialLinks={portfolioData.socialLinks} />

      {/* Standalone Circular Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-5 right-5 z-50 w-11 h-11 flex items-center justify-center rounded-full shadow-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border border-white/60 dark:border-gray-600/50 backdrop-blur-lg hover:bg-sky-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 hover:scale-105"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Header data={portfolioData} />

        <About data={portfolioData.about} />

        <ProjectsSection
          projects={regularProjects}
          featuredProject={featuredProject}
          filter={projectFilter}
          setFilter={setProjectFilter}
        />

        <AchievementsAwards
          data={portfolioData.achievements}
          publications={portfolioData.publications}
        />

        <ExperienceTimeline data={portfolioData.timeline} />

        <Certifications data={portfolioData.certifications} />

        <Contact
          data={portfolioData.contact}
          socialLinks={portfolioData.socialLinks}
          copyToClipboard={copyToClipboard}
          copiedType={copiedType}
        />

        <Footer data={portfolioData} />
      </div>

      <ScrollToTop />
    </div>
  );
}

// ─── Section Heading Component (Clean & Elegant) ──────────────────────────────
const SectionHeading = ({ icon: Icon, title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
      <span className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white/70 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/60 shadow-sm backdrop-blur-md">
        <Icon className="h-6 w-6 inline-block mr-2.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        {title}
      </span>
    </h2>
    {subtitle && (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

// ─── NavBar (Floating Centered Pill) ──────────────────────────────────────────
const NavBar = React.memo(({ socialLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop nav */}
      <nav aria-label="Section navigation" className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <div className="flex items-center gap-1 rounded-full bg-white/70 dark:bg-gray-800/65 backdrop-blur-xl border border-white/60 dark:border-gray-600/50 shadow-xl px-4 py-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-1.5 text-sm font-medium rounded-full text-gray-700 dark:text-gray-200 hover:bg-sky-100/70 dark:hover:bg-gray-700/70 hover:text-sky-700 dark:hover:text-sky-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border border-white/60 dark:border-gray-600/50 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-gray-700 transition-all duration-200"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {isOpen && (
          <div className="absolute top-14 left-0 w-52 rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl border border-white/60 dark:border-gray-600/50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700/70 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
            <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2 px-5 pb-1">
              <a
                href={socialLinks.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
              >
                <NewspaperIcon className="h-4 w-4" /> Medium Articles
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
});

// ─── Header / Hero Section (Matches Original Clean Design) ───────────────────
const Header = React.memo(({ data }) => {
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
    <header className="pt-40 sm:pt-48 md:pt-56 lg:pt-64 pb-20 md:pb-28 lg:pb-32 text-center">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="relative z-10 text-center md:text-left max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-2 text-gray-900 dark:text-white md:whitespace-nowrap">
            Hi, I'm{' '}
            <span className="text-sky-600 dark:text-sky-400 whitespace-nowrap">
              {data.shortName}
            </span>
          </h1>

          {/* Typing animation */}
          <p
            className="text-xl sm:text-2xl font-light text-gray-600 dark:text-gray-300 min-h-[2rem]"
            aria-live="polite"
          >
            {displayText}
            <span
              className="inline-block w-0.5 h-6 bg-sky-500 ml-0.5 align-middle animate-pulse"
              aria-hidden="true"
            />
          </p>

          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            📍 {data.location}
          </p>

          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {data.tagline}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-3xl shadow-xl text-white bg-sky-600 hover:bg-sky-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300"
            >
              View My Work
              <ArrowDownCircleIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-sky-600 dark:border-sky-400 text-base font-semibold rounded-3xl shadow-lg bg-white dark:bg-gray-800 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-300"
            >
              Download Resume
              <ArrowDownTrayIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Profile Picture with signature soft blue halo ring */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/35 to-indigo-500/25 blur-lg"
            aria-hidden="true"
          />
          <img
            src={data.profilePicUrl}
            alt="Thimira Niranjaya Keerthiwansha — profile photo"
            loading="eager"
            className="relative w-full h-full rounded-full object-cover ring-4 ring-sky-300 dark:ring-sky-500 transition-transform duration-300 hover:scale-105 shadow-2xl"
          />
        </div>
      </div>
    </header>
  );
});

// ─── About Section ────────────────────────────────────────────────────────────
const About = React.memo(({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="about" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={UserIcon}
        title="About Me"
      />
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white/70 dark:bg-gray-800/55 p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
            {data.bio}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Technical Skills
            </h3>

            <div className="space-y-4">
              {data.skillGroups.map((group, gi) => (
                <div key={gi}>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300 mb-2">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <span
                        key={si}
                        className="px-3 py-1 bg-sky-100/80 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300 rounded-full font-medium text-xs border border-sky-200/60 dark:border-sky-800/50 shadow-xs"
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

// ─── Projects Section ─────────────────────────────────────────────────────────
const ProjectsSection = React.memo(({ projects, featuredProject, filter, setFilter }) => {
  const filterTabs = [
    { id: 'All', label: 'All' },
    { id: '.NET & Cloud', label: '.NET & Cloud' },
    { id: 'AI & Security', label: 'AI & Security' },
    { id: 'Web & Game', label: 'Web & Game' },
  ];

  return (
    <section id="projects" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={BookOpenIcon}
        title="Featured Projects"
      />

      <div className="max-w-6xl mx-auto">
        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                filter === tab.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white/70 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200/70 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Featured Project Card (NearU) */}
        {featuredProject && (filter === 'All' || filter === '.NET & Cloud') && (
          <FeaturedProjectCard project={featuredProject} />
        )}

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((p) => !p.featured || filter !== 'All')
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
});

// ─── Featured Project Card (Clean Glassmorphism) ──────────────────────────────
const FeaturedProjectCard = ({ project }) => {
  const [ref, isVisible] = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`mb-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-gray-800/55 backdrop-blur-lg border-2 border-sky-200/70 dark:border-sky-700/50 shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative p-7 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700/60">
                <StarIcon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                <span className="text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
                  Featured Project
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-semibold">
                {project.status}
              </span>
            </div>

            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
              {project.period}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {project.title}
          </h3>

          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 mt-1 mb-3">
            {project.role}
          </p>

          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
            {project.description}
          </p>

          <ul className="mb-6 space-y-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {project.bullets?.slice(0, 4).map((b, bi) => (
              <li key={bi} className="flex items-start gap-2">
                <span className="text-sky-500 font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 rounded-full text-xs font-medium border border-sky-200/60 dark:border-sky-700/40"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-sky-300"
            >
              <Github className="mr-2 h-4 w-4" />
              <span>View on GitHub</span>
              <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </a>

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                <Globe className="mr-2 h-4 w-4" />
                <span>Live Demo</span>
                <ArrowTopRightOnSquareIcon className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Standard Project Card (Clean & Minimal) ──────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.08);
  const placeholder = `https://placehold.co/600x380/0f172a/38bdf8?text=${encodeURIComponent(
    project.title.split('—')[0].trim()
  )}`;

  return (
    <div
      ref={ref}
      className={`group bg-white/70 dark:bg-gray-800/55 rounded-3xl shadow-lg overflow-hidden border border-white/60 dark:border-gray-700/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div>
        <div className="relative h-44 overflow-hidden bg-slate-900">
          <img
            src={project.imageUrl || placeholder}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = placeholder;
            }}
          />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-1">
            <span className="text-sky-600 dark:text-sky-400 font-semibold">{project.category}</span>
            <span>{project.period}</span>
          </div>

          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
            {project.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 dark:bg-gray-700/70 dark:text-gray-300 rounded-md text-[11px] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
        >
          <Github className="mr-1.5 h-3.5 w-3.5" />
          <span>GitHub</span>
          <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" />
        </a>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <Globe className="mr-1 h-3.5 w-3.5" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

// ─── Achievements & Publications ──────────────────────────────────────────────
const AchievementsAwards = React.memo(({ data, publications }) => {
  const [refA, isVisibleA] = useScrollAnimation();
  const [refP, isVisibleP] = useScrollAnimation();

  return (
    <section id="achievements" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={TrophyIcon}
        title="Honors & Achievements"
      />

      {/* National Honors */}
      <div
        ref={refA}
        className={`max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-14 transition-all duration-700 ${
          isVisibleA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {data.map((a) => (
          <div
            key={a.id}
            className="bg-white/70 dark:bg-gray-800/55 p-6 rounded-3xl shadow-lg backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                <TrophyIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400">{a.year}</span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mt-0.5">
                  {a.title}
                </h3>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                  {a.event}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {a.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publications */}
      <div
        ref={refP}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisibleP ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <NewspaperIcon className="h-5 w-5 text-orange-500" aria-hidden="true" />
            <span>Technical Writing on Medium</span>
          </h3>
          <a
            href="https://medium.com/@tnirajaya2001"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-orange-500 hover:underline flex items-center gap-1"
          >
            <span>View Profile</span>
            <ArrowTopRightOnSquareIcon className="h-3 w-3" />
          </a>
        </div>

        <div className="space-y-3">
          {publications.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/70 dark:bg-gray-800/55 rounded-2xl shadow-sm backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-md hover:border-orange-300/60 dark:hover:border-orange-700/50 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors truncate">
                  {p.title}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 text-xs text-gray-400 font-mono">
                <span>{p.readTime}</span>
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 group-hover:text-orange-500 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

// ─── Education & Experience Timeline ──────────────────────────────────────────
const TYPE_CONFIG = {
  education: { dot: 'bg-sky-500', badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300', label: 'Education' },
  project: { dot: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', label: 'Engineering' },
  activity: { dot: 'bg-violet-500', badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300', label: 'Leadership' },
  publication: { dot: 'bg-orange-500', badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300', label: 'Writing' },
};

const TimelineItem = ({ item, index }) => {
  const [ref, isVisible] = useScrollAnimation(0.08);
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.activity;
  return (
    <div
      ref={ref}
      className={`relative pl-8 sm:pl-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className={`absolute left-0 top-3 w-3.5 h-3.5 rounded-full ${cfg.dot} ring-4 ring-white dark:ring-gray-950 shadow-xs z-10`} />
      <div className="bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 mb-6 shadow-md backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cfg.badge}`}>
                {cfg.label}
              </span>
              {item.badgeText && (
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                  {item.badgeText}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
              {item.title}
            </h3>
            <p className="text-xs font-medium text-sky-600 dark:text-sky-400 mt-0.5">
              {item.organization}
            </p>
          </div>
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700/50">
            {item.period}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const ExperienceTimeline = React.memo(({ data }) => (
  <section id="experience" className="py-16 md:py-20 scroll-mt-24">
    <SectionHeading
      icon={AcademicCapIcon}
      title="Education & Experience"
    />
    <div className="max-w-3xl mx-auto relative">
      <div className="absolute left-[6px] top-3 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-800" aria-hidden="true" />
      {data.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  </section>
));

// ─── Certifications ───────────────────────────────────────────────────────────
const Certifications = React.memo(({ data }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="certifications" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={CheckBadgeIcon}
        title="Certifications & Memberships"
      />
      <div
        ref={ref}
        className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {data.map((cert, i) => (
          <div
            key={cert.id}
            className="bg-white/70 dark:bg-gray-800/55 p-5 rounded-2xl shadow-md backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center flex-shrink-0 text-sky-600 dark:text-sky-400">
                  <CheckBadgeIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {cert.issuer}
                  </p>
                  <span className="text-[11px] font-mono text-gray-400 mt-1 block">
                    {cert.issuedDate}
                  </span>
                </div>
              </div>
            </div>

            {cert.credentialUrl && cert.credentialUrl !== '#' && (
              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  Verify Credential <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
});

// ─── Contact Section ──────────────────────────────────────────────────────────
const Contact = React.memo(({ data, socialLinks, copyToClipboard, copiedType }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <section id="contact" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={EnvelopeIcon}
        title="Contact Me"
      />
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-white/75 dark:bg-gray-800/60 p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Open to software engineering roles, distributed systems consulting, and impactful projects. Feel free to reach out.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400"
                    >
                      {data.email}
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.email, 'email')}
                    className="p-1.5 text-gray-500 hover:text-sky-600"
                    title="Copy Email"
                  >
                    {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`}
                        className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400"
                      >
                        {data.phone}
                      </a>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300">
                        Call
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.phone, 'phone')}
                    className="p-1.5 text-gray-500 hover:text-sky-600"
                    title="Copy Calling Number"
                  >
                    {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {data.whatsapp}
                      </a>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        WhatsApp
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.whatsapp, 'whatsapp')}
                    className="p-1.5 text-gray-500 hover:text-emerald-600"
                    title="Copy WhatsApp Number"
                  >
                    {copiedType === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200/50 dark:border-gray-700/50">
                  <Globe className="h-5 w-5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {data.location} · <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 hover:underline">thimira.tech</a>
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3">
                  Connect With Me
                </h4>
                <div className="flex gap-3">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={socialLinks.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Medium"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"
                  >
                    <NewspaperIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full bg-gray-100 dark:bg-gray-700 transition-colors"
                  >
                    <X size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Message form */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Send a Message
              </h3>
              <form action="https://formspree.io/f/xdkdjdvn" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Name"
                    required
                    autoComplete="name"
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="_replyto"
                    placeholder="email@example.com"
                    required
                    autoComplete="email"
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    placeholder="Your message..."
                    required
                    className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent shadow-md text-sm font-semibold rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// ─── Scroll To Top Floating Button ────────────────────────────────────────────
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
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300 animate-bounce"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

// ─── Footer Component ─────────────────────────────────────────────────────────
const Footer = ({ data }) => (
  <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800 text-center">
    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
      &copy; {new Date().getFullYear()} {data.name}. All rights reserved.
    </p>
    <div className="mt-4 flex justify-center gap-5">
      <a
        href={data.socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Github className="h-4 w-4" />
      </a>
      <a
        href={data.socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
      >
        <Linkedin className="h-4 w-4" />
      </a>
      <a
        href={data.socialLinks.x}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </a>
      <a
        href={data.socialLinks.medium}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Medium"
        className="text-gray-400 hover:text-orange-500 transition-colors"
      >
        <NewspaperIcon className="h-4 w-4" />
      </a>
    </div>
  </footer>
);
