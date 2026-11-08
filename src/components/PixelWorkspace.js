import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function PixelWorkspace() {
  const sceneRef = useRef(null);
  const depthRef = useRef(null);
  const frameRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(!document.hidden);
  const running = !paused && !reduced && inView && visible;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => setReduced(preference.matches);
    const onVisibility = () => setVisible(!document.hidden);
    preference.addEventListener?.('change', onPreference);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (observer) observer.observe(sceneRef.current);
    return () => {
      preference.removeEventListener?.('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!running && depthRef.current) depthRef.current.style.transform = '';
    return () => cancelAnimationFrame(frameRef.current);
  }, [running]);

  const resetDepth = () => {
    cancelAnimationFrame(frameRef.current);
    if (depthRef.current) depthRef.current.style.transform = '';
  };
  const moveDepth = (event) => {
    if (!running || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = sceneRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (depthRef.current) depthRef.current.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translate3d(${x * 8}px, ${y * 6}px, 0)`;
    });
  };

  return <div ref={sceneRef} className="pixel-workspace" data-running={running} onPointerMove={moveDepth} onPointerLeave={resetDepth}>
    <div className="workspace-art" ref={depthRef} aria-hidden="true">
      <img className="workspace-image" src="/images/pixel-workspace.webp" width="960" height="640" alt="" fetchpriority="high" />
      <span className="monitor-cursor" />
      <span className="monitor-signal" />
      <span className="coffee-steam steam-one" />
      <span className="coffee-steam steam-two" />
      <span className="workspace-pixel pixel-one" />
      <span className="workspace-pixel pixel-two" />
      <span className="workspace-pixel pixel-three" />
    </div>
    <div className="workspace-caption">
      <span><span className="workspace-status" />A little corner of my world.</span>
      <button type="button" className="artwork-toggle" disabled={reduced} onClick={() => { resetDepth(); setPaused((value) => !value); }} aria-label={reduced ? 'Artwork motion reduced by system preference' : paused ? 'Play artwork animation' : 'Pause artwork animation'} aria-pressed={paused || reduced}>
        {paused || reduced ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        <span>{reduced ? 'Still mode' : paused ? 'Play' : 'Pause'}</span>
      </button>
    </div>
  </div>;
}
