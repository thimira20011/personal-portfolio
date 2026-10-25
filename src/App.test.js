import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';
import App from './App';

let container;
let root;
let observers;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  window.matchMedia = jest.fn((query) => ({ matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  observers = [];
  window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(element) { this.callback([{ target: element, isIntersecting: true }]); }
    unobserve() {}
    disconnect() {}
  };
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<App />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.restoreAllMocks();
});

test('puts the three selected projects first and clearly identifies internship availability and AI contribution', () => {
  expect([...container.querySelectorAll('main > section')].map((section) => section.id)).toEqual(['projects', 'about', 'experience', 'achievements', 'certifications', 'contact']);
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect([...container.querySelectorAll('.selected-project h3')].map((title) => title.textContent)).toEqual([
    expect.stringContaining('NearU'), expect.stringContaining('GridWalk AI'), expect.stringContaining('GreenOps'),
  ]);
  expect(container.querySelector('.availability').textContent).toContain('internships');
  expect(container.querySelector('#project-title-8').closest('article').textContent).toContain('Built the AI coordination layer');
  expect(container.querySelector('#project-title-8').closest('article').textContent).toContain('three-member team IGNITE');
});

test('filters additional projects without duplicating the selected projects', () => {
  expect(container.querySelectorAll('.small-project')).toHaveLength(5);
  const buttons = [...container.querySelectorAll('.project-filters button')];
  act(() => buttons.find((button) => button.textContent === 'AI & Security').click());
  expect(container.querySelectorAll('.small-project')).toHaveLength(1);
  expect(container.querySelector('.small-project h3').textContent).toContain('ShadowSense');
  expect(container.querySelector('.filter-result').textContent).toBe('1 project in AI & Security');
  expect(buttons.find((button) => button.textContent === 'AI & Security').getAttribute('aria-pressed')).toBe('true');
  act(() => buttons.find((button) => button.textContent === '.NET & Cloud').click());
  expect(container.querySelectorAll('.small-project')).toHaveLength(1);
  act(() => buttons.find((button) => button.textContent === 'All').click());
  expect(container.querySelectorAll('.small-project')).toHaveLength(5);
  expect(container.querySelectorAll('.selected-project')).toHaveLength(3);
});

test('persists theme changes and restores the preference after mounting again', () => {
  act(() => container.querySelector('[aria-label="Switch to dark mode"]').click());
  expect(document.documentElement.classList.contains('dark')).toBe(true);
  expect(localStorage.getItem('theme')).toBe('dark');
  expect(container.querySelector('[aria-label="Switch to light mode"]').getAttribute('aria-pressed')).toBe('true');
  act(() => root.unmount());
  root = createRoot(container);
  act(() => root.render(<App />));
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

test('loads Vercel Analytics once across app remounts', () => {
  const scripts = () => document.head.querySelectorAll('script[data-sdkn="@vercel/analytics/react"]');
  expect(scripts()).toHaveLength(1);
  expect(scripts()[0].defer).toBe(true);
  act(() => root.unmount());
  root = createRoot(container);
  act(() => root.render(<App />));
  expect(scripts()).toHaveLength(1);
});

test('mobile navigation closes on Escape and returns focus to its trigger', () => {
  const button = container.querySelector('[aria-controls="mobile-navigation"]');
  act(() => button.click());
  expect(button.getAttribute('aria-expanded')).toBe('true');
  expect(container.querySelector('#mobile-navigation')).not.toBeNull();
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })));
  expect(container.querySelector('#mobile-navigation')).toBeNull();
  expect(button.getAttribute('aria-expanded')).toBe('false');
  expect(document.activeElement).toBe(button);
});

test('preserves all credentials, PDFs, engineering stories, and valid local section links', () => {
  expect(container.querySelectorAll('.certificate-card')).toHaveLength(10);
  expect(container.querySelectorAll('.selected-project .architecture')).toHaveLength(3);
  expect(container.querySelector('a[href="https://coursera.org/verify/56MSHOTEXYNR"]')).not.toBeNull();
  expect(container.querySelector('a[href$="ai-hackathon-2026-first-runner-up.pdf"]')).not.toBeNull();
  expect(container.querySelector('a[href$="ibm-continuous-integration-and-continuous-delivery.pdf"]')).not.toBeNull();
  const ids = [...container.querySelectorAll('[id]')].map((element) => element.id);
  expect(new Set(ids).size).toBe(ids.length);
  container.querySelectorAll('a[href^="#"]').forEach((link) => expect(container.querySelector(link.getAttribute('href'))).not.toBeNull());
  container.querySelectorAll('a[target="_blank"]').forEach((link) => expect(link.rel).toContain('noopener'));
});

test('failed project images use a local fallback without retry loops or third-party placeholders', () => {
  const image = container.querySelector('.selected-project img');
  act(() => Simulate.error(image));
  expect(container.querySelector('.selected-project .project-image-fallback').textContent).toBe('NearU');
  expect(container.querySelector('.flagship-project img')).toBeNull();
  expect(container.innerHTML).not.toContain('placehold.co');
});

test('architecture steps update their explanation and progress without affecting other projects', () => {
  const diagram = container.querySelector('#case-study-1 .architecture');
  const steps = [...diagram.querySelectorAll('button')];
  expect(steps[0].getAttribute('aria-pressed')).toBe('true');
  act(() => steps[2].click());
  expect(steps[0].getAttribute('aria-pressed')).toBe('false');
  expect(steps[2].getAttribute('aria-pressed')).toBe('true');
  expect(diagram.querySelector('[role="status"]').textContent).toContain('nearby-driver searches');
  expect(diagram.querySelectorAll('[data-complete=true]')).toHaveLength(3);
  expect(container.querySelector('#case-study-8 .architecture button').getAttribute('aria-pressed')).toBe('true');
});

test('highlights the AWS leadership role with its dates and description', () => {
  const role = container.querySelector('.timeline-featured');
  expect(role.textContent).toContain('Associate Technical Lead');
  expect(role.textContent).toContain('Current role');
  expect(role.textContent).toContain('Oct 2026 – Present');
  expect(role.textContent).toContain('hands-on lab design');
});

test('reduced motion shows supporting content without depending on scroll animation', () => {
  act(() => root.unmount());
  window.matchMedia = jest.fn((query) => ({ matches: query.includes('reduced-motion') }));
  observers = [];
  root = createRoot(container);
  act(() => root.render(<App />));
  expect(observers).toHaveLength(1); // Only navigation needs an observer.
  expect(container.querySelector('#achievements .opacity-0')).toBeNull();
  expect(container.querySelector('#contact .opacity-0')).toBeNull();
});

test('contact form handles a failed submission without clearing the message', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ errors: [{ message: 'Please try again later.' }] }) });
  try {
    const input = container.querySelector('textarea');
    input.value = 'I would like to discuss an internship.';
    await act(async () => Simulate.submit(container.querySelector('#contact form')));
    expect(container.querySelector('#contact').textContent).toContain('Please try again later.');
    expect(container.querySelector('textarea').value).toBe('I would like to discuss an internship.');
    expect(container.querySelector('button[type="submit"]').disabled).toBe(false);
  } finally { global.fetch = originalFetch; }
});
