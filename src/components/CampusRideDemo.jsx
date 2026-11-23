import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, LocateFixed, RotateCcw } from 'lucide-react';

const drivers = [
  { x: 386, y: 135, angle: 29 },
  { x: 103, y: 224, angle: -52 },
  { x: 552, y: 249, angle: -50 },
];
const pickup = { x: 297, y: 198 };
const searchRadius = 118;
// Distances are in units of the illustrative map. The real NearU service uses PostGIS.
const closestDriver = drivers
  .map((driver) => ({ driver, distance: Math.hypot(driver.x - pickup.x, driver.y - pickup.y) }))
  .filter(({ distance }) => distance <= searchRadius)
  .sort((a, b) => a.distance - b.distance)[0].driver;

function CampusMap({ phase }) {
  const matched = phase === 'matched';
  return <svg className="campus-map" viewBox="0 0 640 332" role="img" aria-label={matched
    ? 'A nearby driver is matched to the pickup at the library.'
    : 'Illustrated campus with a library pickup and three sample drivers.'}>
    <image href="/images/campus-plan.svg" width="640" height="332" />
    {phase !== 'idle' && <circle className="search-area" cx={pickup.x} cy={pickup.y} r={searchRadius} />}
    {matched && <path className="match-route" d="M297 198 Q321 196 342 178 T386 135" fill="none" />}
    {drivers.map((driver) => {
      const selected = matched && driver === closestDriver;
      return <g key={driver.x} transform={`translate(${driver.x} ${driver.y})`}>
        {selected && <circle r="16" fill="#ccf374" stroke="#294a37" strokeWidth="1.5" />}
        <g transform={`rotate(${driver.angle})`} stroke="#f5f1da" strokeWidth="1.8">
          <rect x="-6" y="-10" width="12" height="20" rx="4" fill="#30493c" />
          <path d="M-3.5 -4h7m-7 8h7" />
        </g>
      </g>;
    })}
    <g transform={`translate(${pickup.x} ${pickup.y})`}>
      <circle r="10" fill="#c7f46a" stroke="#1d382d" strokeWidth="3" />
      <circle r="3" fill="#183326" />
      <path d="M-6 -10l-12 -14h-9" stroke="#193629" strokeWidth="2" fill="none" />
      <rect x="-117" y="-38" width="94" height="28" rx="4" fill="#233e31" />
      <text x="-70" y="-19" textAnchor="middle" fill="#fff9e7" fontSize="16" fontWeight="700">Pickup</text>
    </g>
  </svg>;
}

const status = {
  idle: ['Pickup at the library', 'Find a driver near this point.'],
  searching: ['Looking for a driver…', 'Checking the area around the pickup.'],
  matched: ['Driver matched', 'PostGIS finds nearby drivers in NearU.'],
};

export default function CampusRideDemo({ article, paused }) {
  const [phase, setPhase] = useState('idle');
  useEffect(() => {
    if (phase !== 'searching') return;
    const timer = window.setTimeout(() => setPhase('matched'), paused ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, [phase, paused]);

  const request = () => {
    if (phase === 'searching') return;
    const instant = paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase(instant ? 'matched' : 'searching');
  };

  return <div className="ride-feature" id="ride-demo">
    <figure className="ride-sheet" data-phase={phase} data-paused={paused}>
      <figcaption className="map-heading">
        <span className="map-project"><LocateFixed size={22} aria-hidden="true" />NearU</span>
        <span>Campus ride demo</span>
      </figcaption>
      <CampusMap phase={phase} />
      <div className="ride-console">
        <div className="ride-status" role="status" aria-live="polite" aria-atomic="true">
          <strong>{status[phase][0]}</strong><span>{status[phase][1]}</span>
        </div>
        <button className="ride-action" type="button" onClick={phase === 'matched' ? () => setPhase('idle') : request} aria-disabled={phase === 'searching'}>
          {phase === 'matched' ? <>Reset demo<RotateCcw size={16} /></> : <>Request a ride<ArrowRight size={17} /></>}
        </button>
      </div>
    </figure>
    {article && <a className="ride-note" href={article.url} target="_blank" rel="noopener noreferrer">
      <BookOpen size={17} aria-hidden="true" /><span>My field notes <b>How I find nearby drivers</b></span><ArrowUpRight size={16} aria-hidden="true" />
    </a>}
  </div>;
}
