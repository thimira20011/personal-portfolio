import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Code2, ExternalLink, FileText, Github, Linkedin, MapPin, Menu, Moon, Network, Sun, X } from 'lucide-react';
import { projectStories } from '../data/projectStories';
import useReveal from '../hooks/useReveal';

const navigation = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function PortfolioNav({ isDarkMode, toggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const menuRef = useRef(null);
  const desktopRef = useRef(null);
  const [pill, setPill] = useState(null);
  useEffect(() => {
    const links = desktopRef.current;
    const updatePill = () => {
      const link = links?.querySelector('[aria-current]');
      setPill(link ? { x: link.offsetLeft } : null);
    };
    updatePill();
    const resize = window.ResizeObserver ? new ResizeObserver(updatePill) : null;
    if (links) resize?.observe(links);
    window.addEventListener('resize', updatePill);
    return () => { resize?.disconnect(); window.removeEventListener('resize', updatePill); };
  }, [active]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const links = navigation.map(({ id, label }) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>
  ));
  return (
    <div className="site-nav-wrap">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Thimira Niranjaya, home"><span>tn<span className="brand-dot">.</span></span><span className="wordmark-caption">THIMIRA NIRANJAYA</span></a>
        <div className="desktop-links" ref={desktopRef}>
          <span className="nav-active-pill" aria-hidden="true" style={{ opacity: pill ? 1 : 0, transform: `translateX(${pill?.x || 0}px)` }} />
          {links}
        </div>
        <div className="nav-actions">
          <a className="nav-availability" href="#contact"><span className="status-dot" />Open to internships</a>
          <button className="icon-button" onClick={toggleDarkMode} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={isDarkMode}>
            {isDarkMode ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button ref={menuRef} className="icon-button menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
        {open && <div className="mobile-links" id="mobile-navigation">{links}<a href="#certifications" onClick={() => setOpen(false)}>Certifications</a></div>}
      </nav>
    </div>
  );
}

export function SectionTitle({ number, eyebrow, title, description }) {
  const ref = useReveal();
  return (
    <div className="section-title" ref={ref}>
      <div className="eyebrow"><span>{number}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PortfolioHero({ data }) {
  return (
    <header id="home" className="hero">
      <div className="hero-copy">
        <a href="#contact" className="availability"><span className="status-dot" />Available for software engineering internships<ArrowUpRight size={15} aria-hidden="true" /></a>
        <p className="hero-intro">Hi, I'm {data.shortName}.</p>
        <h1>Backend thinking.<br /><span>Real-world impact.</span></h1>
        <p className="hero-description">An Information Systems undergraduate building real-time systems with <strong>.NET, cloud infrastructure, and AI.</strong> I enjoy turning complex problems into software people can use.</p>
        <div className="hero-buttons">
          <a className="button button-primary" href="#projects">Explore my work<ArrowDown size={17} aria-hidden="true" /></a>
          <a className="button button-secondary" href={data.resumeUrl} target="_blank" rel="noopener noreferrer">View resume<FileText size={17} aria-hidden="true" /></a>
        </div>
        <div className="hero-socials">
          <span><MapPin size={15} aria-hidden="true" />Sri Lanka</span>
          <span className="social-divider" />
          <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame">
          <div className="portrait-topline" aria-hidden="true">
            <span className="portrait-corner">+</span>
            <span>THE PERSON BEHIND THE CODE</span>
            <span className="portrait-corner">+</span>
          </div>
          <img src={data.profilePicUrl} alt="Thimira Niranjaya Keerthiwansha" width="480" height="560" fetchpriority="high" />
        </div>
      </div>
      <div className="proof-strip" aria-label="Experience at a glance">
        <div><strong>4<span> developers</span></strong><span>Leading the NearU team</span></div>
        <div><strong>{data.achievements.length}<span> competition awards</span></strong><span>Building under real constraints</span></div>
        <div><strong>{data.publications.length}<span> technical articles</span></strong><a href="#publications">Sharing what I learn<ArrowUpRight size={14} aria-hidden="true" /></a></div>
      </div>
    </header>
  );
}

function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);
  return <div className="project-image">{!failed && project.imageUrl ? <img src={project.imageUrl} alt={`${projectStories[project.id]?.name || project.title} application screenshot`} loading="lazy" onError={() => setFailed(true)} /> : <div className="project-image-fallback"><Code2 size={38} aria-hidden="true" /><span>{projectStories[project.id]?.name || project.title.split('—')[0]}</span></div>}</div>;
}

function ProjectLinks({ project }) {
  return <div className="project-links">
    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${projectStories[project.id]?.name || project.title} on GitHub`}><Github size={16} aria-hidden="true" />Source code<ArrowUpRight size={14} aria-hidden="true" /></a>
    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.demoLabel || 'Live demo'}: ${projectStories[project.id]?.name || project.title}`}><ExternalLink size={15} aria-hidden="true" />{project.demoLabel || 'Live demo'}<ArrowUpRight size={14} aria-hidden="true" /></a>}
  </div>;
}

function ArchitectureFlow({ story, projectId }) {
  const [activeStep, setActiveStep] = useState(0);
  const detailId = `architecture-detail-${projectId}`;
  return <figure className="architecture">
    <figcaption><Network size={15} aria-hidden="true" />Architecture overview</figcaption>
    <p className="architecture-hint">Select a step to explore the flow.</p>
    <div className="architecture-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(activeStep + 1) / story.flow.length})` }} /></div>
    <ol>{story.flow.map((step, index) => <li key={step} data-complete={index <= activeStep}>
      <button type="button" aria-pressed={activeStep === index} aria-controls={detailId} onClick={() => setActiveStep(index)}>
        <span className="architecture-step-number">{String(index + 1).padStart(2, '0')}<ArrowUpRight size={13} aria-hidden="true" /></span>{step}
      </button>
    </li>)}</ol>
    <p id={detailId} className="architecture-detail" role="status"><strong>{story.flow[activeStep]}</strong>{story.flowDetails[activeStep]}</p>
  </figure>;
}

export function ProjectCaseStudy({ project, story }) {
  return <details className="case-study" id={`case-study-${project.id}`}>
    <summary><span>{story ? 'Read the engineering story' : 'Explore the implementation'}</span><ChevronDown size={17} aria-hidden="true" /></summary>
    <div className="case-study-body">
      {story ? <>
        <div><h4>The problem</h4><p>{story.problem}</p></div>
        <div><h4>{story.contributionLabel || 'My contribution'}</h4><p>{story.contribution}</p></div>
        <div><h4>Engineering approach</h4><p>{story.approach}</p></div>
        <ArchitectureFlow story={story} projectId={project.id} />
        <div><h4>A key design choice</h4><p>{story.decision}</p></div>
        <div className="evidence-note"><h4>{story.evidenceLabel}</h4><p>{story.evidence}</p>{story.certificateUrl && <a className="text-link" href={story.certificateUrl} target="_blank" rel="noopener noreferrer">View award certificate (PDF)<ArrowUpRight size={15} aria-hidden="true" /></a>}</div>
      </> : <><h4>Implementation highlights</h4><ul>{project.bullets?.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></>}
    </div>
  </details>;
}

function SelectedProject({ project, index, flagship }) {
  const story = projectStories[project.id];
  const ref = useReveal(index * 60);
  return <article ref={ref} className={`selected-project ${flagship ? 'flagship-project' : ''}`} data-project={project.id} aria-labelledby={`project-title-${project.id}`}>
    <div className="project-visual">
      <div className="project-preview-frame">
        <div className="project-preview-toolbar" aria-hidden="true"><span className="preview-dots"><i /><i /><i /></span><span>{story.name}</span><span className="preview-mark">↗</span></div>
        <ProjectImage project={project} />
      </div>
      <span className="project-index">0{index + 1} / SELECTED WORK</span>
      <span className="project-orbit" aria-hidden="true" />
    </div>
    <div className="project-content">
      <div className="project-meta"><span>{story.label}</span><span>{project.period}</span></div>
      <h3 id={`project-title-${project.id}`}>{story.name}<span> {project.title.split('—')[1]?.trim()}</span></h3>
      <p className="project-summary">{story.summary}</p>
      <div className="contribution"><span>{story.contributionLabel || 'My contribution'}</span><p>{story.contribution}</p></div>
      <div className="project-result"><Check size={16} aria-hidden="true" /><span>{story.result}</span></div>
      <div className="tech-list" aria-label="Technologies">{project.techStack.slice(0, flagship ? 7 : 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
      <ProjectLinks project={project} />
    </div>
    <ProjectCaseStudy project={project} story={story} />
  </article>;
}

const categoryFilters = ['All', '.NET & Cloud', 'AI & Security', 'Web & Game'];
const inCategory = (project, filter) => filter === 'All' || (filter === '.NET & Cloud' ? ['.NET & Distributed Systems', 'Cloud & DevOps'].includes(project.category) : filter === 'Web & Game' ? ['Game Engineering', 'Full-Stack Web', 'Java Application'].includes(project.category) : project.category === filter);

export function PortfolioProjects({ projects }) {
  const [filter, setFilter] = useState('All');
  const selected = [1, 8, 4].map((id) => projects.find((project) => project.id === id)).filter(Boolean);
  const others = projects.filter((project) => !projectStories[project.id]);
  const filtered = others.filter((project) => inCategory(project, filter));
  return <section id="projects" className="portfolio-section projects-section">
    <SectionTitle number="01" eyebrow="Selected work" title="Built to solve something." description="Three projects that reflect how I think, collaborate, and build—from real-time backends to agentic AI." />
    <div className="selected-projects">{selected.map((project, index) => <SelectedProject key={project.id} project={project} index={index} flagship={index === 0} />)}</div>
    <details className="more-projects">
      <summary><span>More projects <span className="count-badge">{others.length}</span></span><span className="expand-label">Explore the rest<ChevronDown size={18} aria-hidden="true" /></span></summary>
      <div className="project-filters" role="group" aria-label="Filter additional projects">{categoryFilters.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <p className="filter-result" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{filter !== 'All' ? ` in ${filter}` : ''}</p>
      <div className="more-project-grid">{filtered.map((project) => <article className="small-project" key={project.id}>
        <ProjectImage project={project} /><div className="small-project-content"><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="contribution"><span>My role</span><p>{project.role}</p></div><p className="small-project-status">{project.status.replace(/^[^\p{L}\p{N}]+/u, '')}</p><div className="tech-list">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} /><ProjectCaseStudy project={project} /></div>
      </article>)}</div>
      {!filtered.length && <p className="empty-projects">No additional projects in this category. Choose All to browse the remaining projects.</p>}
    </details>
  </section>;
}

function SkillFocus({ title, description, skills, index }) {
  const ref = useReveal(index * 60);
  return <div ref={ref} className="skill-focus"><span className="skill-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p><div className="tech-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>;
}

export function PortfolioAbout({ data }) {
  const core = [
    { title: 'Backend & real-time', description: 'APIs, domain logic, and the connections between services.', skills: ['C# / .NET', 'ASP.NET Core', 'SignalR', 'CQRS & MediatR'] },
    { title: 'Cloud & data', description: 'The infrastructure and data that keep systems running.', skills: ['AWS', 'Docker', 'PostgreSQL / PostGIS', 'Redis'] },
    { title: 'AI & full-stack', description: 'Agent coordination and interfaces that make complex systems usable.', skills: ['Jac / Jaseci', 'Multi-Agent Systems', 'React', 'TypeScript'] },
  ];
  return <section id="about" className="portfolio-section about-section">
    <SectionTitle number="02" eyebrow="A little about me" title="Curiosity, backed by practice." />
    <div className="about-intro"><p>{data.bio}</p><p>{data.motivation}</p></div>
    <div className="skill-focus-grid">{core.map((skill, index) => <SkillFocus key={skill.title} {...skill} index={index} />)}</div>
    <details className="skills-details"><summary>Explore my full toolkit<ChevronDown size={17} aria-hidden="true" /></summary><div className="full-skills">{data.skillGroups.map((group) => <div key={group.category}><h3>{group.category}</h3><p>{group.items.join(' · ')}</p></div>)}</div></details>
  </section>;
}

function CertificateCard({ cert }) {
  const ref = useReveal();
  return <article ref={ref} className="certificate-card"><div className="certificate-icon"><FileText size={20} aria-hidden="true" /></div><p className="certificate-date">{cert.issuedDate}</p><h3>{cert.title}</h3><p>{cert.issuer}</p><div className="certificate-links"><a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">{cert.title.includes('Membership') ? 'Visit organization' : 'Verify credential'}<ArrowUpRight size={14} aria-hidden="true" /></a>{cert.certificateUrl && <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">Certificate PDF<ArrowUpRight size={15} aria-hidden="true" /></a>}</div></article>;
}

export function PortfolioCertifications({ data }) {
  const featuredIds = [10, 3, 4];
  const featured = featuredIds.map((id) => data.find((cert) => cert.id === id)).filter(Boolean);
  const others = data.filter((cert) => !featuredIds.includes(cert.id));
  return <section id="certifications" className="portfolio-section">
    <SectionTitle number="05" eyebrow="Continuous learning" title="Building on the fundamentals." description="Selected credentials that support my engineering work." />
    <div className="certificate-grid">{featured.map((cert) => <CertificateCard cert={cert} key={cert.id} />)}</div>
    <details className="skills-details"><summary>More certifications & memberships <span className="count-badge">{others.length}</span><ChevronDown size={17} aria-hidden="true" /></summary><div className="certificate-grid additional-certificates">{others.map((cert) => <CertificateCard cert={cert} key={cert.id} />)}</div></details>
  </section>;
}
