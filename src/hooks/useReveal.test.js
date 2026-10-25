import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import useReveal from './useReveal';

function Content() {
  const ref = useReveal(60);
  return <div ref={ref}><a href="#experience">Explore experience</a></div>;
}

let container;
let root;
let animate;
let cancel;
let intersect;
let motion;
let onMotionChange;
let bounds;
const originalAnimate = Element.prototype.animate;

beforeEach(() => {
  cancel = jest.fn();
  animate = jest.fn(() => ({ cancel }));
  Element.prototype.animate = animate;
  motion = { matches: false, addEventListener: jest.fn((event, callback) => { onMotionChange = callback; }), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(() => motion);
  bounds = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 1000 });
  window.IntersectionObserver = jest.fn(function Observer(callback) {
    intersect = callback;
    this.observe = jest.fn();
    this.disconnect = jest.fn();
  });
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  bounds.mockRestore();
  if (originalAnimate) Element.prototype.animate = originalAnimate;
  else delete Element.prototype.animate;
});

test('prepares offscreen content before entry, reveals once, and cancels on focus', () => {
  act(() => root.render(<Content />));
  const element = container.firstChild;
  expect(element.hasAttribute('data-reveal-pending')).toBe(true);
  intersect([{ isIntersecting: false }]);
  expect(animate).not.toHaveBeenCalled();
  intersect([{ isIntersecting: true }]);
  intersect([{ isIntersecting: true }]);
  expect(animate).toHaveBeenCalledTimes(1);
  expect(element.hasAttribute('data-reveal-pending')).toBe(false);
  expect(window.IntersectionObserver.mock.instances[0].disconnect).toHaveBeenCalled();
  act(() => element.firstChild.focus());
  expect(cancel).toHaveBeenCalled();
  expect(element.style.willChange).toBe('');
});

test('does not hide or replay content already in the viewport', () => {
  bounds.mockReturnValue({ top: 200 });
  act(() => root.render(<Content />));
  expect(container.firstChild.hasAttribute('data-reveal-pending')).toBe(false);
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
  expect(animate).not.toHaveBeenCalled();
});

test('releases its temporary compositor hint after the reveal finishes', () => {
  act(() => root.render(<Content />));
  intersect([{ isIntersecting: true }]);
  expect(container.firstChild.style.willChange).toBe('opacity, translate');
  animate.mock.results[0].value.onfinish();
  expect(container.firstChild.style.willChange).toBe('');
});

test('skips observers and motion when reduced motion is enabled', () => {
  motion.matches = true;
  act(() => root.render(<Content />));
  expect(window.IntersectionObserver).not.toHaveBeenCalled();
  expect(animate).not.toHaveBeenCalled();
  expect(container.textContent).toBe('Explore experience');
});

test('cancels a running reveal when the visitor enables reduced motion', () => {
  act(() => root.render(<Content />));
  intersect([{ isIntersecting: true }]);
  motion.matches = true;
  onMotionChange();
  expect(cancel).toHaveBeenCalled();
  expect(container.firstChild.hasAttribute('data-reveal-pending')).toBe(false);
});
