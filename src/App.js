import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import portfolioData from './data/portfolio';
import { PortfolioAbout, PortfolioCertifications, PortfolioHero, PortfolioNav, PortfolioProjects } from './components/PortfolioSections';
import { AchievementsAwards, Contact, ExperienceTimeline, Footer, ScrollToTop } from './components/SupportingSections';
import AmbientBackground from './components/AmbientBackground';
import './lively.css';

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
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
    <div className="portfolio">
      <AmbientBackground isDarkMode={isDarkMode} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PortfolioNav isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode((value) => !value)} />
      <main id="main-content" className="page-container" tabIndex={-1}>
        <PortfolioHero data={portfolioData} />
        <PortfolioProjects projects={portfolioData.projects} />
        <PortfolioAbout data={portfolioData.about} />
        <ExperienceTimeline data={portfolioData.timeline} />
        <AchievementsAwards data={portfolioData.achievements} publications={portfolioData.publications} />
        <PortfolioCertifications data={portfolioData.certifications} />
        <Contact data={portfolioData.contact} socialLinks={portfolioData.socialLinks} copyToClipboard={copyToClipboard} copiedType={copiedType} />
      </main>
      <div className="page-container"><Footer data={portfolioData} /></div>
      <ScrollToTop />
      <Analytics />
    </div>
  );
}
