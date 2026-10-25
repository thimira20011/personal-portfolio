import { useLayoutEffect, useRef } from 'react';

export default function useReveal(delay = 0) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element?.animate || motion.matches || !window.IntersectionObserver) return undefined;
    // Keep initially visible content and direct section links readable without a replay.
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    let animation;
    let revealed = false;
    const previousWillChange = element.style.willChange;
    const clear = () => {
      element.removeAttribute('data-reveal-pending');
      element.style.willChange = previousWillChange;
    };
    element.setAttribute('data-reveal-pending', '');
    const observer = new IntersectionObserver((entries) => {
      if (revealed || !entries.some((entry) => entry.isIntersecting)) return;
      revealed = true;
      observer.disconnect();
      element.style.willChange = 'opacity, translate';
      animation = element.animate([
        { opacity: 0, translate: '0 10px' },
        { opacity: 1, translate: '0 0' },
      ], { duration: 360, delay: Math.min(delay, 80), easing: 'cubic-bezier(.25, .1, .25, 1)', fill: 'backwards' });
      element.removeAttribute('data-reveal-pending');
      animation.onfinish = clear;
    }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });

    const stop = () => { revealed = true; observer.disconnect(); animation?.cancel(); clear(); };
    const onMotionChange = () => { if (motion.matches) stop(); };
    observer.observe(element);
    element.addEventListener('focusin', stop);
    motion.addEventListener?.('change', onMotionChange);
    return () => {
      stop();
      element.removeEventListener('focusin', stop);
      motion.removeEventListener?.('change', onMotionChange);
    };
  }, [delay]);

  return ref;
}
