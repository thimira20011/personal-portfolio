import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import portfolioData from './data/portfolio';
import { PortfolioAbout, PortfolioCertifications, PortfolioHero, PortfolioNav, PortfolioProjects } from './components/PortfolioSections';
import { AchievementsAwards, Contact, ExperienceTimeline, Footer, ScrollToTop } from './components/SupportingSections';
import AmbientBackground from './components/AmbientBackground';
import './lively.css';
import { MotionConfig } from 'motion/react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const [copiedType, setCopiedType] = useState(null);
  const [animationsPaused, setAnimationsPaused] = useState(false);

  useEffect(() => {
    const page = document.documentElement;
    const onKey = (event) => {
      if (event.key === 'Tab') page.setAttribute('data-keyboard-navigation', '');
    };
    const onPointer = () => page.removeAttribute('data-keyboard-navigation');
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
      page.removeAttribute('data-keyboard-navigation');
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#171714' : '#ece4d6');
    try { localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); } catch { /* The theme still works without storage. */ }
  }, [isDarkMode]);

  useEffect(() => {
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, []);

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2500);
    } catch {
      setCopiedType(null);
    }
  };

  return (
    <MotionConfig reducedMotion="user"><div className="portfolio">
      <AmbientBackground isDarkMode={isDarkMode} paused={animationsPaused} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PortfolioNav isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((value) => !value)} resumes={portfolioData.resumes} animationsPaused={animationsPaused} onToggleAnimations={() => setAnimationsPaused((value) => !value)} />
      <main id="main-content" className="page-container" tabIndex={-1}>
        <PortfolioHero data={portfolioData} animationsPaused={animationsPaused} setAnimationsPaused={setAnimationsPaused} />
        <PortfolioProjects projects={portfolioData.projects} />
        <PortfolioAbout data={portfolioData.about} profilePicUrl={portfolioData.profilePicUrl} />
        <ExperienceTimeline data={portfolioData.timeline} />
        <AchievementsAwards data={portfolioData.achievements} publications={portfolioData.publications} />
        <PortfolioCertifications data={portfolioData.certifications} />
        <Contact data={portfolioData.contact} socialLinks={portfolioData.socialLinks} copyToClipboard={copyToClipboard} copiedType={copiedType} />
      </main>
      <div className="page-container"><Footer data={portfolioData} /></div>
      <ScrollToTop />
      <Analytics />
    </div></MotionConfig>
  );
}
