import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import PixelWorkspace from './PixelWorkspace';

let container;
let root;
let intersect;
let motionChanged;
let preference;
let hidden;

beforeEach(() => {
  hidden = false;
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  preference = { matches: false, addEventListener: vi.fn((type, listener) => { motionChanged = listener; }), removeEventListener: vi.fn() };
  window.matchMedia = vi.fn(() => preference);
  window.IntersectionObserver = vi.fn(function Observer(callback) {
    intersect = callback;
    this.observe = vi.fn();
    this.disconnect = vi.fn();
  });
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

test('follows the shared pause state without a duplicate artwork control', () => {
  act(() => root.render(<PixelWorkspace />));
  const scene = container.firstChild;
  expect(container.querySelector('button')).toBeNull();
  expect(scene.dataset.running).toBe('true');
  act(() => root.render(<PixelWorkspace paused />));
  expect(scene.dataset.running).toBe('false');
  expect(container.querySelector('img')).not.toBeNull();
  act(() => root.render(<PixelWorkspace paused={false} />));
  expect(scene.dataset.running).toBe('true');
});

test('pauses outside the viewport and in a hidden tab while preserving a manual pause', () => {
  act(() => root.render(<PixelWorkspace />));
  const scene = container.firstChild;
  act(() => intersect([{ isIntersecting: false }]));
  expect(scene.dataset.running).toBe('false');
  act(() => intersect([{ isIntersecting: true }]));
  expect(scene.dataset.running).toBe('true');
  hidden = true;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(scene.dataset.running).toBe('false');
  hidden = false;
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(scene.dataset.running).toBe('true');
  act(() => root.render(<PixelWorkspace paused />));
  act(() => intersect([{ isIntersecting: false }]));
  act(() => intersect([{ isIntersecting: true }]));
  expect(scene.dataset.running).toBe('false');
});

test('honors reduced motion on load and when the system preference changes', () => {
  preference.matches = true;
  act(() => root.render(<PixelWorkspace />));
  expect(container.firstChild.dataset.running).toBe('false');
  expect(container.querySelector('button')).toBeNull();
  preference.matches = false;
  act(() => motionChanged());
  expect(container.firstChild.dataset.running).toBe('true');
  preference.matches = true;
  act(() => motionChanged());
  expect(container.firstChild.dataset.running).toBe('false');
});

test('releases its observer and preference subscription on unmount', () => {
  act(() => root.render(<PixelWorkspace />));
  const observer = window.IntersectionObserver.mock.instances[0];
  act(() => root.unmount());
  expect(observer.disconnect).toHaveBeenCalled();
  expect(preference.removeEventListener).toHaveBeenCalledWith('change', motionChanged);
  root = createRoot(container);
});
