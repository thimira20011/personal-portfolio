import React, { useEffect, useState } from 'react';

const pixels = [
  [3, 8, 3], [9, 24, 2], [5, 46, 4], [12, 72, 2], [2, 88, 3], [8, 96, 2],
  [95, 13, 3], [90, 34, 2], [97, 55, 4], [91, 76, 2], [98, 91, 3], [87, 5, 2],
];

export default function AmbientBackground({ paused = false }) {
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => setReduced(preference.matches);
    const onVisibility = () => setHidden(document.hidden);
    preference.addEventListener?.('change', onPreference);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      preference.removeEventListener?.('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
  return <div className="ambient-background" data-running={!paused && !hidden && !reduced} aria-hidden="true">
    <div className="ambient-layer ambient-layer-far">{pixels.map(([x, y, size], index) => <span key={index} className={index % 5 === 0 ? 'ambient-pixel ambient-pixel-accent' : 'ambient-pixel'} style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }} />)}</div>
    <div className="ambient-layer ambient-layer-near">{pixels.filter((_, index) => index % 2 === 0).map(([x, y], index) => <span key={index} className="ambient-pixel" style={{ left: `${100 - x}%`, top: `${(y + 17) % 100}%`, width: 2, height: 2 }} />)}</div>
    <div className="ambient-graphics">
      {[[2, 18], [92, 42], [1, 72], [93, 88]].map(([x, y], index) => <svg key={index} className={`ambient-glyph glyph-${index}`} viewBox="0 0 80 80" fill="none" style={{ left: `${x}%`, top: `${y}%` }}>
        {index % 2 === 0 ? <><path d="M36 8h8v20h8v8h20v8H52v8h-8v20h-8V52h-8v-8H8v-8h20v-8h8Z" /><rect x="36" y="36" width="8" height="8" /></> : <><path d="M40 8 72 40 40 72 8 40Z" /><path d="M40 24 56 40 40 56 24 40Z" /><rect x="36" y="36" width="8" height="8" /></>}
      </svg>)}
      <svg className="ambient-trail" viewBox="0 0 120 80" fill="none"><path d="M12 68h32V44h32V20h32" /><rect x="8" y="64" width="8" height="8" /><rect x="104" y="16" width="8" height="8" /></svg>
    </div>
  </div>;
}
