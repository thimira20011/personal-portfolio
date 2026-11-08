import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { motion, useMotionTemplate, useSpring, useTransform } from 'motion/react';

export default function PixelWorkspace({ paused: sharedPaused, onPauseChange }) {
  const sceneRef = useRef(null);
  const pointerX = useSpring(0, { mass: 1, stiffness: 100, damping: 20 });
  const pointerY = useSpring(0, { mass: 1, stiffness: 100, damping: 20 });
  const rotateX = useTransform(pointerY, (value) => value * -6);
  const rotateY = useTransform(pointerX, (value) => value * 8);
  const translateX = useTransform(pointerX, (value) => value * 16);
  const translateY = useTransform(pointerY, (value) => value * 10);
  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`;
  const [localPaused, setLocalPaused] = useState(false);
  const paused = sharedPaused ?? localPaused;
  const setPaused = onPauseChange || setLocalPaused;
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
    if (!running) { pointerX.jump(0); pointerY.jump(0); }
  }, [running, pointerX, pointerY]);

  const resetDepth = () => {
    if (!running) { pointerX.jump(0); pointerY.jump(0); return; }
    pointerX.set(0);
    pointerY.set(0);
  };
  const moveDepth = (event) => {
    if (!running || event.pointerType === 'touch' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const bounds = sceneRef.current.getBoundingClientRect();
    pointerX.set(Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5)));
    pointerY.set(Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5)));
  };

  return <div ref={sceneRef} className="pixel-workspace" data-running={running} onPointerMove={moveDepth} onPointerLeave={resetDepth}>
    <motion.div className="workspace-art" style={{ transform }} aria-hidden="true">
      <div className="workspace-scene">
      <img className="workspace-image" src="/images/pixel-workspace.webp" width="960" height="640" alt="" fetchpriority="high" />
      <div className="workspace-screen">
        <div className="screen-code">{[52, 82, 37, 64, 45, 92, 70, 58].map((width, index) => <span className={`screen-code-line code-line-${index}`} key={index}><i /><b style={{ width: `${width}%` }} /></span>)}<span className="monitor-cursor" /></div>
      </div>
      <span className="monitor-signal" />
      <span className="coffee-steam steam-one" />
      <span className="coffee-steam steam-two" />
      <span className="coffee-steam steam-three" />
      <span className="workspace-pixel pixel-one" />
      <span className="workspace-pixel pixel-two" />
      <span className="workspace-pixel pixel-three" />
      </div>
    </motion.div>
    <div className="workspace-caption">
      <span><span className="workspace-status" />A little corner of my world.</span>
      <button type="button" className="artwork-toggle" disabled={reduced} onClick={() => { resetDepth(); setPaused((value) => !value); }} aria-label={reduced ? 'Ambient motion reduced by system preference' : paused ? 'Play ambient animations' : 'Pause ambient animations'} aria-pressed={paused || reduced}>
        {paused || reduced ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        <span>{reduced ? 'Still mode' : paused ? 'Play' : 'Pause'}</span>
      </button>
    </div>
  </div>;
}
