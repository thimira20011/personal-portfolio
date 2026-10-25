import React, { useState, useEffect } from 'react';
import { EnvelopeIcon, AcademicCapIcon, TrophyIcon, NewspaperIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Github, Linkedin, X, ChevronUp, Globe, Copy, Check, PhoneCall, MessageCircle } from 'lucide-react';
import { SectionTitle } from './PortfolioSections';
import useReveal from '../hooks/useReveal';

const sectionTitles = {
  'Education & Experience': ['03', 'The journey so far', 'Learning by building.'],
  'Honors & Achievements': ['04', 'Recognition & writing', 'Ideas put to the test.'],
  'Contact Me': ['06', 'Let’s build something', 'A good conversation starts here.'],
};
const SectionHeading = ({ title }) => {
  const [number, eyebrow, heading] = sectionTitles[title];
  return <SectionTitle number={number} eyebrow={eyebrow} title={heading} />;
};

export const AchievementsAwards = React.memo(({ data, publications }) => {
  const refA = useReveal();
  const refP = useReveal();

  return (
    <section id="achievements" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={TrophyIcon}
        title="Honors & Achievements"
      />

      {/* National Honors */}
      <div
        ref={refA}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-14"
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
                {a.certificateUrl && (
                  <a
                    href={a.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View certificate for ${a.title} (PDF)`}
                    className="inline-flex items-center mt-3 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    View Certificate (PDF) <ArrowTopRightOnSquareIcon className="ml-1 h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Publications */}
      <div
        ref={refP}
        id="publications"
        className="max-w-4xl mx-auto"
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
              <div className="flex items-start sm:items-center gap-3 min-w-0 pr-4">
                <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0 mt-1.5 sm:mt-0" />
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors block">
                    {p.title}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-400 font-mono">
                    <span className="text-orange-600 dark:text-orange-400 font-sans font-medium">{p.topic}</span>
                    <span>•</span>
                    <span>{p.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 text-xs text-gray-400 font-mono">
                <span className="hidden sm:inline">{p.readTime}</span>
                <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 group-hover:text-orange-500 transition-colors" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

const TYPE_CONFIG = {
  education: { dot: 'bg-sky-500', badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300', label: 'Education' },
  project: { dot: 'bg-emerald-500', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300', label: 'Engineering' },
  activity: { dot: 'bg-violet-500', badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300', label: 'Leadership' },
  publication: { dot: 'bg-orange-500', badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300', label: 'Writing' },
};

const TimelineItem = ({ item, index }) => {
  const ref = useReveal(Math.min(index * 60, 180));
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.activity;
  return (
    <div
      ref={ref}
      className={`timeline-item relative pl-8 sm:pl-10 ${item.featured ? 'timeline-featured' : ''}`}
    >
      <div className={`absolute left-0 top-3 w-3.5 h-3.5 rounded-full ${cfg.dot} ring-4 ring-white dark:ring-gray-950 shadow-xs z-10`} />
      <div className="timeline-card bg-white/70 dark:bg-gray-800/55 rounded-2xl p-5 mb-6 shadow-md backdrop-blur-lg border border-white/60 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cfg.badge}`}>
                {cfg.label}
              </span>
              {item.featured && <span className="current-role-badge">Current role</span>}
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

export const ExperienceTimeline = React.memo(({ data }) => (
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

export const Contact = React.memo(({ data, socialLinks, copyToClipboard, copiedType }) => {
  const ref = useReveal();
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xdkdjdvn', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        const errorData = await response.json();
        setFormError(
          errorData.errors
            ? errorData.errors.map((err) => err.message).join(', ')
            : 'Submission failed. Please try again or reach out directly.'
        );
        setFormStatus('error');
      }
    } catch (err) {
      setFormError('Network error. Please email me directly at ' + data.email);
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 scroll-mt-24">
      <SectionHeading
        icon={EnvelopeIcon}
        title="Contact Me"
      />
      <div
        ref={ref}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/75 dark:bg-gray-800/60 p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-lg border border-white/60 dark:border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                I'm looking for a software engineering internship, with a focus on backend development, cloud systems, and AI. If your team is building something interesting, I'd love to hear from you.
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
              {formStatus === 'success' ? (
                <div className="p-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 border border-sky-200/80 dark:border-sky-700/50 text-center shadow-lg backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center mb-4 ring-4 ring-sky-100/70 dark:ring-sky-900/40">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out! I've received your note and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-all duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-sky-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formStatus === 'error' && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
                      {formError || 'Something went wrong. Please try again.'}
                    </div>
                  )}
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
                      disabled={formStatus === 'submitting'}
                      autoComplete="name"
                      className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors disabled:opacity-50"
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
                      disabled={formStatus === 'submitting'}
                      autoComplete="email"
                      className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors disabled:opacity-50"
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
                      disabled={formStatus === 'submitting'}
                      className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 shadow-xs focus:border-sky-500 focus:ring-2 focus:ring-sky-500 text-gray-900 dark:text-gray-100 text-sm transition-colors resize-none disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 px-6 border border-transparent shadow-md text-sm font-semibold rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export const ScrollToTop = () => {
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
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-sky-700 text-white shadow-lg hover:bg-sky-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export const Footer = ({ data }) => (
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
