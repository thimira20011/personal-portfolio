import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpenIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowDownCircleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/20/solid';
import { Github, Linkedin, X, Sun, Moon } from 'lucide-react';

// A new component to handle the canvas-based background animation
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
    // FIX: Corrected the syntax error in the user's code block
    const numStars = 250; 

    // A function to resize the canvas to fit the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles for light mode
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    // Draw the particles for light mode
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // NOTE: Using darker color for better visibility against the light background
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 150, ${p.opacity + 0.2})`;
        ctx.fill();
      });
    };

    // Update particle positions for light mode
    const updateParticles = () => {
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap particles around the screen
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
      });
    };

    // Initialize stars for dark mode
    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: (Math.random() * 0.05) + 0.01,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
    };

    // Draw the stars for dark mode
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.fill();
      });
    };

    // Update star positions for dark mode
    const updateStars = () => {
      stars.forEach(s => {
        s.x -= s.speed;
        if (s.x < 0) {
          s.x = canvas.width;
          s.y = Math.random() * canvas.height;
        }
      });
    };

    // Main animation loop
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

    // Initial setup and animation start
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    if (isDarkMode) {
      initStars();
    } else {
      initParticles();
    }
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameIdRef.current);
    };

  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
    ></canvas>
  );
};

// Main App component which contains all the sections and logic
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect to set initial theme based on localStorage or system preference
  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Use saved preference
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  // All the portfolio data is centralized here for easy editing
  const [portfolioData] = useState({
    name: "Thimira Niranjaya",
    title: "Student, Information Systems",
    tagline: "Fascinated by Web Development, Networking, and Cybersecurity.",
    profilePicUrl: "https://github.com/thimira20011/portfolio-pictures/blob/main/Profile.jpg?raw=true", // Replace with your image URL
    resumeUrl: "https://drive.google.com/file/d/1jJ99adEOCqtgoB7DH6lfyMGXgjnw_5hF/view?usp=sharing", // Replace with your resume's URL
    about: {
      bio: "Hello! I'm a passionate student at the Sabaragamuwa University of Sri Lanka, following a degree in Information Systems. I'm fascinated by web development, networking, and cybersecurity. My journey in tech started with a curiosity for how things work, and it has evolved into a passion for building user-friendly applications and exploring the intricacies of network security. In my free time, I enjoy reading, hiking, and exploring new technologies.",
      skills: ["Java", "C", "React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Figma","Linux"]
    },
    projects: [
      {
        id: 1,
        title: "Project The Reuse Hub",
        description: "A dynamic web application for managing tasks and tracking progress. Built with React and a Node.js + firebase backend. Features include user authentication, real-time updates, and a clean user interface.",
        link: "https://github.com/thimira20011/the-reuse-hub-v2.git",
        imageUrl: "https://github.com/thimira20011/portfolio-pictures/blob/main/ReuseHubHome.png?raw=true", // Placeholder image URL
        techStack: ["React", "Node.js", "MySQL","TailwindCSS"]
      },
      {
        id: 2,
        title: "Personal Expense Tracker",
        description: "A enterprise application for tracking personal expenses. Users can add, edit, and delete expenses, and view their spending habits over time.",
        link: "https://github.com/thimira20011/expense-tracker.git",
        imageUrl: "https://raw.githubusercontent.com/thimira20011/portfolio-pictures/refs/heads/main/expenseTracker.png", // Placeholder image URL
        techStack: ["Java"]
      },
      {
        id: 3,
        title: "You think Web Site",
        description: "This very website! A responsive and modern portfolio template built to showcase my projects and skills. Designed with a focus on simplicity and user experience.",
        link: "https://github.com/thimira20011/you-think.git",
        imageUrl: "https://github.com/thimira20011/portfolio-pictures/blob/main/youThink.png?raw=true", // Placeholder image URL
        techStack: ["HTML", "CSS", "JavaScript","Bootstrap"]
      }
    ],
    socialLinks: {
      github: "https://github.com/thimira20011",
      linkedin: "https://www.linkedin.com/in/thimira-niranjaya-keerthiwansha-a62838310?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BSUE6RlHVTui6mGxCVORF%2BQ%3D%3D",
      x: "https://x.com/TNiranjaya20011"
    },
    contact: {
      email: "tnirajaya2001@gmail.com",
      phone: "+94 70 512 7856"
    }
  });

  return (
    // M3 Base: Use light sky background for light mode
    <div className="relative font-sans antialiased min-h-screen bg-sky-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      {/* The background animation is now a separate component */}
      <BackgroundAnimation isDarkMode={isDarkMode} />
      {/* The rest of the content is in a separate container on top of the animation */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <Header data={portfolioData} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <About data={portfolioData.about} />
        <Projects data={portfolioData.projects} />
        <Contact data={portfolioData.contact} socialLinks={portfolioData.socialLinks} />
      </div>
    </div>
  );
}

// Header component for the hero section
const Header = React.memo(({ data, isDarkMode, toggleDarkMode }) => {
  // M3 Accent Color: Using sky-600/400 for primary elements
  const accentColorClass = "text-sky-600 dark:text-sky-400";
  const primaryButtonClass = "bg-sky-600 hover:bg-sky-700 focus:ring-sky-500";
  const secondaryButtonClass = "border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 focus:ring-sky-500";

  return (
    <header className="py-24 md:py-32 lg:py-40 text-center">
      {/* M3 Toggle Button: Rounded, high-contrast toggle */}
      <button
        onClick={toggleDarkMode}
        // M3 Toggle Button Style: Full rounded, shadow for elevation
        className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700"
      >
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </button>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-2 text-gray-900 dark:text-white">
            Hi, I'm <span className={accentColorClass}>{data.name}</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-600 dark:text-gray-300">
            {data.title}
          </p>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
            {data.tagline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            {/* M3 Primary Button Style (Elevated/Filled) */}
            <a
              href="#projects"
              // M3 Button: Full rounded shape, shadow-xl for high elevation
              className={`inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-3xl shadow-xl text-white ${primaryButtonClass} transition duration-300 ease-in-out`}
            >
              My Work
              <ArrowDownCircleIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
            {/* M3 Secondary Button Style (Outlined) */}
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              // M3 Button: Full rounded shape, shadow-lg, outlined
              className={`inline-flex items-center px-8 py-4 border-2 text-base font-medium rounded-3xl shadow-lg bg-white dark:bg-gray-800 ${secondaryButtonClass} transition duration-300 ease-in-out`}
            >
              Download Resume
              <ArrowDownTrayIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          {/* M3 Profile Circle: Softer ring color */}
          <img
            src={data.profilePicUrl}
            alt="Profile"
            className="w-full h-full rounded-full object-cover ring-4 ring-sky-200 dark:ring-sky-600 transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-xl"
          />
        </div>
      </div>
    </header>
  );
});

// About Me component
const About = React.memo(({ data }) => {
  return (
    <section id="about" className="py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <UserIcon className="h-8 w-8 inline-block mr-2 text-sky-600 dark:text-sky-400" />
        About Me
      </h2>
      <div className="max-w-4xl mx-auto">
        {/* M3 Card: Elevated surface, large rounded corners, subtle shadow */}
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl transition duration-300 ease-in-out hover:shadow-2xl">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.bio}
          </p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  // M3 Chip Style: Rounded, contrasting color background
                  className="px-4 py-2 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300 rounded-full font-medium text-sm transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Projects component
const Projects = React.memo(({ data }) => {
  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800 rounded-3xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <BookOpenIcon className="h-8 w-8 inline-block mr-2 text-sky-600 dark:text-sky-400" />
        My Projects
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {data.map((project) => (
          // M3 Project Card: High rounded corners, significant shadow for elevation
          <div key={project.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    // M3 Chip Style
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
        ))}
      </div>
    </section>
  );
});

// Contact Me component
const Contact = React.memo(({ data, socialLinks }) => {
  // State for form submission status
  const [submissionStatus, setSubmissionStatus] = useState(''); // 'success', 'error', or ''
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section id="contact" className="py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        <EnvelopeIcon className="h-8 w-8 inline-block mr-2 text-sky-600 dark:text-sky-400" />
        Contact Me
      </h2>
      <div className="max-w-4xl mx-auto">
        {/* M3 Surface Card */}
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get in Touch</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <a href={`mailto:${data.email}`} className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out">
                    {data.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <span className="text-gray-700 dark:text-gray-300">{data.phone}</span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Find Me On</h3>
                <div className="flex space-x-4">
                  {/* M3 Icon Button Hover */}
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700"
                  >
                    <Github size={32} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700"
                  >
                    <Linkedin size={32} />
                  </a>
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 transition duration-300 ease-in-out p-1 rounded-full hover:bg-sky-50 dark:hover:bg-gray-700"
                  >
                    <X size={32} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form using Formspree */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Send me a message</h3>
              <form
                action="https://formspree.io/f/xdkdjdvn" // NOTE: Using your provided Formspree ID
                method="POST"
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  {/* M3 Input Field: Highly rounded corners */}
                  <input
                    type="text"
                    id="name"
                    name="name"
                    // M3 Style: Rounded-xl for softer look
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                   {/* M3 Input Field */}
                  <input
                    type="email"
                    id="email"
                    name="_replyto"
                    // M3 Style: Rounded-xl
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                   {/* M3 Input Field */}
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    // M3 Style: Rounded-xl
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-inner focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    placeholder="Your Message..."
                    required
                  ></textarea>
                </div>
                {/* M3 Primary Button (Filled) */}
                <button
                  type="submit"
                  // M3 Button: Full rounded shape, shadow-xl for high elevation
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-xl text-base font-medium rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition duration-300 ease-in-out"
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
