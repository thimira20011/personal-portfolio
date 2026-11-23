import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';

// Both the painted roads and the moving car use the campus plan's 640 × 332 coordinates.
const toLibrary = 'M433 85 C415 98 400 117 386 135 S357 165 342 178 Q323 195 297 198';
const toGate = 'M297 198 C253 208 184 190 126 212 C105 220 80 243 56 263';
const stages = [
  { id: 'search', label: 'Search', caption: 'A student requests a pickup at the library. PostGIS finds a nearby driver.', duration: 2800 },
  { id: 'pickup', label: 'Pickup', caption: 'The driver heads to the library. SignalR delivers location updates to the rider.', duration: 3800 },
  { id: 'ride', label: 'On the road', caption: 'The student is on board. Follow the car across campus to the west gate.', duration: 4300 },
  { id: 'arrival', label: 'Arrival', caption: 'The car reaches the west gate and the ride is complete.', duration: 2600 },
];

function Vehicle({ selected = false }) {
  return <g className="map-vehicle">
    {selected && <ellipse rx="17" ry="13" fill="#d4fc8b" fillOpacity=".18" stroke="#c3ef87" strokeWidth="1" />}
    <rect x="-10" y="-5.5" width="20" height="11" rx="4" fill={selected ? '#e2fcad' : '#a5bbac'} stroke="#162c27" strokeWidth="1.8" />
    <path d="M-5-3.5h2l.8 7H-5zM3-3.5h2.5l1 7H3.5z" fill="#304940" />
    <path d="M8-3h2m-2 6h2" stroke="#fff5c8" strokeWidth="2" />
  </g>;
}

function CampusMap({ stage }) {
  const route = stage === 'pickup' ? toLibrary : toGate;
  let carPosition = 'translate(433 85) rotate(138)';
  if (stage === 'arrival') carPosition = 'translate(56 263) rotate(140)';
  const moving = stage === 'pickup' || stage === 'ride';
  return <svg className="campus-map" viewBox="0 0 640 332" preserveAspectRatio="xMidYMid slice" role="img"
    aria-label="Campus ride simulation. A driver approaches the library from the east and takes a student along the main road to the west gate.">
    <image href="/images/campus-plan.svg" width="640" height="332" />
    <g transform="translate(103 224) rotate(-36)"><Vehicle /></g>
    <g transform="translate(552 249) rotate(39)"><Vehicle /></g>
    {stage === 'search' && <g className="dispatch-search">
      <circle cx="297" cy="198" r="180" className="search-ring" />
      <circle cx="297" cy="198" r="180" className="search-ring search-echo" />
    </g>}
    <path d={toGate} className="trip-guide" />
    {stage !== 'search' && <g className="dispatch-route">
      <path d={stage === 'arrival' ? toLibrary : route} className="route-bed" />
      {stage === 'arrival' ? <>
        <path d={toLibrary} className="approach-trace" />
        <path d={toGate} className="route-ink" />
      </> : <path key={stage} d={route} className="route-ink route-reveal" pathLength="1" />}
    </g>}
    <g transform="translate(297 198)">
      <circle r="7" fill="#c4f464" stroke="#1c3227" strokeWidth="2" />
      <path d="m0-9-10-18" fill="none" stroke="#d6f5b5" strokeWidth="2" />
      <rect x="-67" y="-47" width="74" height="24" rx="3" fill="#d9e9b9" />
      <text x="-30" y="-30" textAnchor="middle" className="map-pin-text">Pickup</text>
    </g>
    <g transform="translate(56 263)">
      <path d="M0 0v-30" stroke="#f4cca4" strokeWidth="2.5" />
      <path d="M1-31h19l-5 6 5 6H1z" fill="#efb581" />
      <text x="2" y="22" textAnchor="middle" className="gate-label">West gate</text>
    </g>
    {moving ? <g key={stage} className="moving-car" style={{ offsetPath: `path('${route}')` }}><Vehicle selected /></g>
      : <g className={stage === 'arrival' ? 'arrived-car' : undefined} transform={carPosition}><Vehicle selected={stage !== 'search'} /></g>}
  </svg>;
}

export default function CampusRideDemo({ article, paused }) {
  const sheet = useRef(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(() => !window.IntersectionObserver);
  const [visible, setVisible] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPreference = () => { setReduced(preference.matches); setIndex(0); };
    const onVisibility = () => setVisible(!document.hidden);
    preference.addEventListener?.('change', onPreference);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = window.IntersectionObserver && new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0 });
    observer?.observe(sheet.current);
    return () => {
      observer?.disconnect();
      preference.removeEventListener?.('change', onPreference);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const activeIndex = reduced ? stages.length - 1 : index;
  const stage = stages[activeIndex];
  const running = !reduced && !paused && inView && visible;
  // The active progress line is the clock. Pausing CSS freezes it and the car at the same instant.
  function advance(event) {
    if (!reduced && event.animationName === 'dispatch-progress') {
      setIndex((previous) => (previous + 1) % stages.length);
    }
  }

  return <div className="ride-feature" id="ride-demo">
    <figure ref={sheet} className="ride-sheet" data-stage={stage.id} data-running={running} style={{ '--leg-duration': `${stage.duration}ms` }}>
      <figcaption className="dispatch-caption">
        <div><h2>NearU<span>.</span></h2><p>Campus ride simulation</p></div>
        <div className="trip-endpoints"><span>Library</span><span>West gate</span></div>
      </figcaption>
      <CampusMap stage={stage.id} />
      <div className="dispatch-log">
        <ol className="dispatch-steps" aria-label="Ride sequence">
          {stages.map((item, step) => <li key={item.id} data-state={step < activeIndex ? 'done' : step === activeIndex ? 'current' : 'next'}
            aria-current={step === activeIndex ? 'step' : undefined}>
            <span className="step-track" aria-hidden="true">{step === activeIndex && !reduced && <i onAnimationEnd={advance} />}</span>
            {item.label}
          </li>)}
        </ol>
        <div className="ride-status" aria-live="off">
          {stages.map((item) => <p key={item.id} aria-hidden={item !== stage} data-current={item === stage}>{item.caption}</p>)}
        </div>
      </div>
      {article && <a className="ride-note" href={article.url} target="_blank" rel="noopener noreferrer">
        <BookOpen size={16} aria-hidden="true" /><span>How I find nearby drivers</span><ArrowUpRight size={15} aria-hidden="true" />
      </a>}
    </figure>
  </div>;
}
