import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, BarChart3, Check, ChevronDown, Cloud, Code2, Database, ExternalLink, FileText, Github, Linkedin, MapPin, Menu, Moon, Network, Pause, Play, Sun, Trophy, X } from 'lucide-react';
import { projectStories } from '../data/projectStories';
import useReveal from '../hooks/useReveal';
import imageProps from '../data/imageProps';
import PixelWorkspace from './PixelWorkspace';
import { motion, useReducedMotion } from 'motion/react';

const navigation = [
  { id: 'projects', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function ResumeMenu({ resumes }) {
  const ref = useRef(null);
  useEffect(() => {
    const closeOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) ref.current.open = false;
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector('summary').focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
  return <details className="resume-menu" ref={ref}>
    <summary className="nav-resume">Résumé<ChevronDown size={14} aria-hidden="true" /></summary>
    <div className="resume-options" role="group" aria-label="Choose a résumé">
      {resumes.map((resume) => <a key={resume.url} href={resume.url} target="_blank" rel="noopener noreferrer" onClick={() => { ref.current.open = false; }}>
        <FileText size={18} aria-hidden="true" /><span>{resume.label}<small>View PDF · 2 pages · {resume.size}</small></span><ArrowUpRight size={15} aria-hidden="true" />
      </a>)}
    </div>
  </details>;
}

export function PortfolioNav({ isDarkMode, toggleDarkMode, resumes, animationsPaused, onToggleAnimations }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
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
    if (!window.IntersectionObserver) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id === 'home' ? '' : entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    [{ id: 'home' }, ...navigation].forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const links = (withIndicator = false) => navigation.map(({ id, label }) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}{withIndicator && active === id && <motion.span className="nav-active-indicator" layoutId="current-section" initial={false} transition={document.documentElement.hasAttribute('data-keyboard-navigation') ? { duration: 0 } : { type: 'spring', duration: 0.5, bounce: 0.1 }} aria-hidden="true" />}</a>
  ));
  return (
    <div className="site-nav-wrap" data-scrolled={scrolled}>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="wordmark" href="#home" aria-label="Thimira Niranjaya, home">Thimira<span className="brand-dot">.</span></a>
        <div className="desktop-links">
          {links(true)}
        </div>
        <div className="nav-actions">
          <ResumeMenu resumes={resumes} />
          <button className="icon-button nav-motion-toggle" type="button" onClick={onToggleAnimations} disabled={reducedMotion} aria-label={reducedMotion ? 'Ambient motion reduced by system preference' : animationsPaused ? 'Play ambient animations' : 'Pause ambient animations'} aria-pressed={animationsPaused || !!reducedMotion}>
            {animationsPaused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
          <button className="icon-button" onClick={toggleDarkMode} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={isDarkMode}>
            {isDarkMode ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button ref={menuRef} className="icon-button menu-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
        {open && <div className="mobile-links" id="mobile-navigation">{links()}<a href="#certifications" onClick={() => setOpen(false)}>Certifications</a>{resumes.map((resume) => <a key={resume.url} href={resume.url} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{resume.label} résumé<ArrowUpRight size={14} aria-hidden="true" /></a>)}</div>}
      </nav>
    </div>
  );
}

export function SectionTitle({ title, description }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function PortfolioHero({ data, animationsPaused, setAnimationsPaused }) {
  return (
    <header id="home" className="hero" data-enter>
      <div className="hero-copy">
        <h1><span className="hero-line"><span>Backend thinking.</span></span><span className="hero-line"><span>Real-world impact<span className="headline-period">.</span></span></span></h1>
        <p className="hero-description"><strong className="hero-greeting">Hi, I'm {data.shortName}.</strong>An Information Systems undergraduate building real-time systems with <strong>.NET, cloud infrastructure, and AI.</strong> I enjoy turning complex problems into software people can use.</p>
        <div className="hero-buttons">
          <a className="button button-primary" href={data.resumes[0].url} target="_blank" rel="noopener noreferrer">View résumé<FileText size={17} aria-hidden="true" /></a>
          <a className="button button-secondary" href="#projects">Explore my work<ArrowDown size={17} aria-hidden="true" /></a>
        </div>
        <p className="hero-cv-alternative">Also available: <a href={data.resumes[1].url} target="_blank" rel="noopener noreferrer">DevOps résumé<ArrowUpRight size={14} aria-hidden="true" /></a></p>
        <div className="hero-socials">
          <span><MapPin size={15} aria-hidden="true" />Sri Lanka</span>
          <span className="social-divider" />
          <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" />GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" />LinkedIn<ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-visual">
        <PixelWorkspace paused={animationsPaused} onPauseChange={setAnimationsPaused} />
        <a href="#contact" className="availability"><span className="status-dot" />Available for software engineering internships<ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="proof-strip" aria-label="Experience at a glance">
        <a href="#case-study-8"><Trophy size={19} aria-hidden="true" /><span><strong>AI Hackathon 2026</strong><span>1st Runner-Up · Team IGNITE</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
        <a href="#experience"><Cloud size={19} aria-hidden="true" /><span><strong>AWS Student Builder Group</strong><span>Associate Technical Lead</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
        <a href="#publications"><FileText size={19} aria-hidden="true" /><span><strong>{data.publications.length} technical articles</strong><span>Engineering notes on Medium</span></span><ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
    </header>
  );
}

function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);
  return <div className="project-image">{!failed && project.imageUrl ? <img src={project.imageUrl} {...imageProps(project.imageUrl, '(max-width: 767px) calc(100vw - 96px), (max-width: 1100px) calc((100vw - 176px) / 2), 544px')} alt={project.imageAlt || `${projectStories[project.id]?.name || project.title} application screenshot`} loading="lazy" onError={() => setFailed(true)} /> : <div className="project-image-fallback"><Code2 size={38} aria-hidden="true" /><span>{projectStories[project.id]?.name || project.title.split('—')[0]}</span></div>}</div>;
}

function ProjectLinks({ project }) {
  return <div className="project-links">
    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${projectStories[project.id]?.name || project.title} on GitHub`}><Github size={16} aria-hidden="true" />Source code<ArrowUpRight size={14} aria-hidden="true" /></a>
    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.demoLabel || 'Live demo'}: ${projectStories[project.id]?.name || project.title}`}><ExternalLink size={15} aria-hidden="true" />{project.demoLabel || 'Live demo'}<ArrowUpRight size={14} aria-hidden="true" /></a>}
  </div>;
}

function GreenOpsPreview({ project }) {
  const steps = [
    { title: 'Azure telemetry', detail: 'Cloud resource metrics', icon: Cloud },
    { title: '.NET collection', detail: 'Background service · EF Core', icon: Database },
    { title: 'SCI + Roslyn', detail: 'Carbon intensity & code analysis', icon: Code2 },
    { title: 'Observability', detail: 'Grafana · Prometheus', icon: BarChart3 },
  ];
  return <div className="greenops-preview">
    <figure className="greenops-flow">
      <figcaption><Network size={18} aria-hidden="true" />GreenOps architecture</figcaption>
      <ol>{steps.map(({ title, detail, icon: Icon }) => <li key={title}><span className="greenops-node"><Icon size={21} aria-hidden="true" /></span><span><strong>{title}</strong><span>{detail}</span></span></li>)}</ol>
      <p>From cloud signals to efficiency insights.</p>
    </figure>
    <details className="greenops-screenshot">
      <summary>View dashboard screenshot<ChevronDown size={16} aria-hidden="true" /></summary>
      <a href={project.imageUrl} target="_blank" rel="noopener noreferrer" aria-label="Open original GreenOps dashboard screenshot"><ProjectImage project={project} /><span>Open full-size screenshot<ArrowUpRight size={14} aria-hidden="true" /></span></a>
    </details>
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
      {project.id === 4 ? <GreenOpsPreview project={project} /> : <div className="project-preview-frame">
        <ProjectImage project={project} />
      </div>}
    </div>
    <div className="project-content">
      <h3 id={`project-title-${project.id}`}>{story.name}<span> {project.title.split('—')[1]?.trim()}</span></h3>
      <div className="project-meta"><span>{story.label}</span><span>{project.period}</span></div>
      <p className="project-summary">{story.summary}</p>
      <dl className="project-facts">
        <div><dt>Problem</dt><dd>{story.problem}</dd></div>
        <div><dt>{story.contributionLabel || 'My contribution'}</dt><dd>{story.contribution}</dd></div>
        <div className="project-outcome"><dt><Check size={13} aria-hidden="true" />Outcome</dt><dd>{story.result}</dd></div>
      </dl>
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
  const selected = [1, 8, 4, 9].map((id) => projects.find((project) => project.id === id)).filter(Boolean);
  const others = projects.filter((project) => !projectStories[project.id]);
  const filtered = others.filter((project) => inCategory(project, filter));
  return <section id="projects" className="portfolio-section projects-section">
    <SectionTitle title="Selected engineering work." description="Real-time backends, agentic AI, and cloud infrastructure. Explore what I built, the decisions behind it, and the code." />
    <div className="selected-projects">{selected.map((project, index) => <SelectedProject key={project.id} project={project} index={index} flagship={index === 0} />)}</div>
    <details className="more-projects">
      <summary><span>More projects <span className="count-badge">{others.length}</span></span><span className="expand-label">Explore the rest<ChevronDown size={18} aria-hidden="true" /></span></summary>
      <div className="project-filters" role="group" aria-label="Filter additional projects">{categoryFilters.map((category) => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <p className="filter-result" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{filter !== 'All' ? ` in ${filter}` : ''}</p>
      <div className="more-project-grid">{filtered.map((project) => <article className="small-project" key={project.id}>
        <ProjectImage project={project} /><div className="small-project-content"><h3>{project.title}</h3><p>{project.description}</p><div className="contribution"><span>My role</span><p>{project.role}</p></div><p className="small-project-status">{project.status.replace(/^[^\p{L}\p{N}]+/u, '')}</p><div className="tech-list">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div><ProjectLinks project={project} /><ProjectCaseStudy project={project} /></div>
      </article>)}</div>
      {!filtered.length && <p className="empty-projects">No additional projects in this category. Choose All to browse the remaining projects.</p>}
    </details>
  </section>;
}

function SkillFocus({ title, description, skills, index }) {
  const ref = useReveal(index * 60);
  return <div ref={ref} className="skill-focus"><h3>{title}</h3><p>{description}</p><div className="tech-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>;
}

export function PortfolioAbout({ data, profilePicUrl }) {
  const core = [
    { title: 'Backend & real-time', description: 'APIs, domain logic, and the connections between services.', skills: ['C# / .NET', 'ASP.NET Core', 'SignalR', 'CQRS & MediatR'] },
    { title: 'Cloud & data', description: 'The infrastructure and data that keep systems running.', skills: ['AWS', 'Docker', 'PostgreSQL / PostGIS', 'Redis'] },
    { title: 'AI & full-stack', description: 'Agent coordination and interfaces that make complex systems usable.', skills: ['Jac / Jaseci', 'Multi-Agent Systems', 'React', 'TypeScript'] },
  ];
  return <section id="about" className="portfolio-section about-section">
    <SectionTitle title="The engineer behind the work." />
    <div className="about-person"><div className="portrait-frame"><img src={profilePicUrl} {...imageProps(profilePicUrl, '(max-width: 767px) 112px, 200px')} alt="Thimira Niranjaya Keerthiwansha" loading="lazy" /></div><div className="about-intro"><p>{data.bio}</p><p>{data.motivation}</p></div></div>
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
    <SectionTitle title="Credentials & continuous learning." description="Selected credentials that support my engineering work." />
    <div className="certificate-grid">{featured.map((cert) => <CertificateCard cert={cert} key={cert.id} />)}</div>
    <details className="skills-details"><summary>More certifications & memberships <span className="count-badge">{others.length}</span><ChevronDown size={17} aria-hidden="true" /></summary><div className="certificate-grid additional-certificates">{others.map((cert) => <CertificateCard cert={cert} key={cert.id} />)}</div></details>
  </section>;
}
