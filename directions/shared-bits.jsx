// Shared visual atoms used by both Direction A and Direction B.

// Logo path — absolute from site root so it works whether the HTML
// loading us is at / or at /directions/.
const LOGO_SRC = "/assets/logo-badincaulnes-transparent.png";

// Caulnes wordmark — letters follow the city's charte graphique:
//   C A U L → teal · N → slate · E S → lime
// On dark backgrounds, the parent should add the `bc-on-dark` class so
// the slate/lime stay readable.
const CaulnesWord = ({ children, style }) => {
  const text = (typeof children === 'string' && children) ? children : 'Caulnes';
  const letters = text.split("");
  return (
    <span className="bc-caulnes" style={style}>
      {letters.map((ch, i) => <span key={i}>{ch}</span>)}
    </span>
  );
};

// Small logo lockup used in topbars / footers.
// The wordmark always reads "Badin" + colorized "Caulnes" (per the city charte).
const BcLogo = ({ inverse = false, size = 44, subtitle = "Club de badminton · Caulnes" }) => (
  <div className="a-brand">
    <span className="a-brand-mark" style={{ width: size, height: size }}>
      <img src={LOGO_SRC} alt="" className="bc-logo-img" />
    </span>
    <span>
      <div className="a-brand-name" style={{ color: inverse ? '#fff' : undefined }}>
        Badin<CaulnesWord>Caulnes</CaulnesWord>
      </div>
      <div className="a-brand-sub"  style={{ color: inverse ? 'rgba(255,255,255,.6)' : undefined }}>{subtitle}</div>
    </span>
  </div>
);

// Hero illustration — uses the actual club logo with a soft radial halo
// and a few motion arcs behind it. Sized to ~360x360.
const LogoHero = ({ size = 380 }) => (
  <div style={{ position: 'relative', width: size, height: size }}>
    <svg viewBox="0 0 360 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {/* motion arcs */}
      <g stroke="rgba(187,211,102,.40)" strokeWidth="1.4" fill="none" strokeDasharray="3 6">
        <path d="M30 300 Q 180 30 340 220" />
        <path d="M60 330 Q 200 80 350 260" />
      </g>
      {/* soft halo */}
      <circle cx="180" cy="180" r="140" fill="rgba(44,145,173,.08)" />
      <circle cx="180" cy="180" r="170" fill="rgba(187,211,102,.04)" />
      {/* speck stars */}
      <g fill="rgba(255,255,255,.55)">
        <circle cx="48"  cy="80"  r="1.6" />
        <circle cx="320" cy="110" r="2" />
        <circle cx="290" cy="310" r="1.4" />
        <circle cx="80"  cy="280" r="1.8" />
      </g>
    </svg>
    <img
      src={LOGO_SRC}
      alt="Logo BadinCaulnes"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 8px 24px rgba(7,50,76,.35))',
      }}
    />
  </div>
);

// Hero shuttlecock — realistic silhouette:
// proper conical "skirt" of feathers tied by two visible cord rings,
// with the cork head clearly attached underneath. Colored navy + teal + lime.
const ShuttlecockHero = ({ size = 460, onDark = true }) => {
  const navy      = "#07324c";
  const navyDeep  = "#041e30";
  const navyMid   = "#0e4a6c";
  const teal      = "#2c91ad";
  const tealDeep  = "#1f6e83";
  const lime      = "#bbd366";
  const limeDeep  = "#8fa843";

  // Geometry — all in the local frame, origin at cork center.
  // The shuttlecock points up-right at ~12° from vertical.
  // 9 feathers, evenly spread in a moderate fan (-44° to +44°)
  // around the cork's TOP plane, so they form a real skirt — not a starburst.
  const N        = 9;
  const fanDeg   = 38;                              // half-spread (tighter than before, more skirt-like)
  const length   = 280;                             // feather length
  const baseW    = 18;                              // half-width at the base (near cork)
  const midW     = 28;                              // half-width at the cord ring — wider so they overlap
  const skewDeg  = -10;                             // overall tilt of the shuttlecock
  const baseY    = -36;                             // top of the cork disc

  // Per-feather color plan, alternating but with a clear order.
  // Brighter hues sit in the center so the silhouette reads cleanly on the
  // dark hero background; navy stays on the outer edges where it's framed.
  const palette = [
    { fill: navyMid,  edge: navyDeep },
    { fill: teal,     edge: tealDeep },
    { fill: lime,     edge: limeDeep },
    { fill: teal,     edge: tealDeep },
    { fill: lime,     edge: limeDeep },   // center
    { fill: teal,     edge: tealDeep },
    { fill: lime,     edge: limeDeep },
    { fill: teal,     edge: tealDeep },
    { fill: navyMid,  edge: navyDeep },
  ];

  // Builds ONE feather as a tall narrow leaf, anchored at the cork top
  // and tied at a mid-cord ring at ~55% of its length.
  // angle is in degrees from vertical (positive = right).
  // Returns the polygon path (outline) plus two highlight strokes.
  const buildFeather = (angle) => {
    const t = (angle + skewDeg) * Math.PI / 180;
    const s = Math.sin(t), c = Math.cos(t);
    const px = c, py = s;                            // perpendicular (90° right)
    // base center (anchored on the cork top disc)
    const bx = 0, by = baseY;
    // mid (where the cord ring binds — slight bulge there)
    const mx = bx + length * 0.55 * s;
    const my = by - length * 0.55 * c;
    // tip
    const tx = bx + length * s;
    const ty = by - length * c;
    // base corners
    const blx = bx + baseW * px, bly = by + baseW * py;
    const brx = bx - baseW * px, bry = by - baseW * py;
    // mid corners (the widest point)
    const mlx = mx + midW * px,  mly = my + midW * py;
    const mrx = mx - midW * px,  mry = my - midW * py;
    // path: base-left → mid-left → tip → mid-right → base-right → close
    const path = `M ${blx.toFixed(1)} ${bly.toFixed(1)}
                  Q ${mlx.toFixed(1)} ${mly.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}
                  Q ${mrx.toFixed(1)} ${mry.toFixed(1)} ${brx.toFixed(1)} ${bry.toFixed(1)} Z`;
    // spine — center line giving the feather its "quill" look
    const spine = `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${tx.toFixed(1)} ${ty.toFixed(1)}`;
    return { path, spine, mid: { x: mx, y: my } };
  };

  // Build feathers, plus a small back row tinted darker for depth.
  const feathers = Array.from({ length: N }, (_, i) => {
    const a = -fanDeg + (i * (2 * fanDeg)) / (N - 1);
    return { angle: a, ...buildFeather(a), color: palette[i] };
  });

  // Paint order: outer → inner so center feather sits on top.
  const order = [0, 8, 1, 7, 2, 6, 3, 5, 4];

  return (
    <svg viewBox="-230 -380 460 460" width={size} height={size} aria-hidden="true">
      <defs>
        <radialGradient id="bcSh-halo" cx="50%" cy="50%" r="55%">
          <stop offset="0%"  stopColor={onDark ? "rgba(44,145,173,.20)" : "rgba(44,145,173,.10)"} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="bcSh-cork" cx="35%" cy="30%" r="80%">
          <stop offset="0%"  stopColor="#fafafa" />
          <stop offset="55%" stopColor="#e9e5dc" />
          <stop offset="100%" stopColor="#bdb39e" />
        </radialGradient>
        <linearGradient id="bcSh-feather-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
          <stop offset="50%" stopColor="rgba(255,255,255,.06)" />
          <stop offset="100%" stopColor="rgba(0,0,0,.18)" />
        </linearGradient>
      </defs>

      <circle cx="0" cy="-180" r="220" fill="url(#bcSh-halo)" />

      {/* Feathers — back-to-front */}
      {order.map((i) => {
        const f = feathers[i];
        return (
          <g key={i}>
            <path d={f.path} fill={f.color.fill} stroke={f.color.edge} strokeWidth="2.2" strokeLinejoin="round" />
            {/* gloss on each feather */}
            <path d={f.path} fill="url(#bcSh-feather-gloss)" opacity=".55" />
            {/* quill / spine line */}
            <path d={f.spine} stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        );
      })}

      {/* Two cord rings that bind the feathers — the visual hallmark of a real shuttlecock */}
      {/* Lower ring — right around the cork top */}
      <ellipse cx="0" cy={baseY} rx="38" ry="9" fill="none" stroke="#bbd366" strokeWidth="3" />
      <ellipse cx="0" cy={baseY - 2} rx="38" ry="9" fill="none" stroke={navyDeep} strokeWidth="1.6" />

      {/* Upper ring — at the mid-cord height, threading through every feather */}
      {(() => {
        const yMid = feathers[4].mid.y;
        const r = 102;                  // wide enough to circle them all
        return (
          <>
            <ellipse cx="0" cy={yMid} rx={r} ry="18" fill="none" stroke="#bbd366" strokeWidth="2.8" />
            <ellipse cx="0" cy={yMid - 2} rx={r} ry="18" fill="none" stroke="rgba(7,30,48,.8)" strokeWidth="1.4" />
          </>
        );
      })()}

      {/* Cork head — clearly attached at the base */}
      <g>
        {/* top disc — where the feathers root */}
        <ellipse cx="0" cy={baseY} rx="42" ry="11" fill="#ebe7df" stroke={navyDeep} strokeWidth="2.4" />
        {/* hemisphere */}
        <path
          d={`M -42 ${baseY} A 42 50 0 0 0 42 ${baseY} Z`}
          fill="url(#bcSh-cork)"
          stroke={navyDeep}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* rim shadow under the disc */}
        <path d={`M -40 ${baseY + 3} Q 0 ${baseY + 10} 40 ${baseY + 3}`} fill="none" stroke="rgba(7,50,76,.22)" strokeWidth="2" />
        {/* glint highlight */}
        <ellipse cx="-14" cy={baseY + 14} rx="14" ry="5" fill="rgba(255,255,255,.55)" />
        {/* dropped shadow on the ground (subtle) */}
        <ellipse cx="6" cy={baseY + 26} rx="22" ry="4" fill="rgba(0,0,0,.25)" />
      </g>
    </svg>
  );
};

// Pseudo "map" — schematic of the gymnase location
const MapMock = ({ height = 360 }) => (
  <div className="a-contact-map" style={{ height }}>
    <div className="a-map-grid"></div>
    <svg viewBox="0 0 600 360" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {/* main road */}
      <path d="M -10 240 Q 200 220 300 250 T 620 220" stroke="#ffffff" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M -10 240 Q 200 220 300 250 T 620 220" stroke="#cccccc" strokeWidth="20" fill="none" strokeLinecap="round" />
      {/* side road */}
      <path d="M 280 -10 L 305 250 L 270 360" stroke="#ffffff" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M 280 -10 L 305 250 L 270 360" stroke="#cccccc" strokeWidth="14" fill="none" strokeLinecap="round" />
      {/* river */}
      <path d="M 0 60 Q 180 100 320 80 T 600 110" stroke="#73e3ff" strokeWidth="10" fill="none" opacity=".6" strokeLinecap="round" />
      {/* labels */}
      <text x="80" y="160" fontFamily="Source Sans Pro" fontSize="11" fontWeight="600" fill="#666">Caulnes centre</text>
      <text x="430" y="200" fontFamily="Source Sans Pro" fontSize="11" fontWeight="600" fill="#666">D 766</text>
      <text x="200" y="320" fontFamily="Source Sans Pro" fontSize="11" fontWeight="600" fill="#666">Rue de la Hutte aux Renards</text>
      <text x="60" y="80" fontFamily="Source Sans Pro" fontSize="10" fontWeight="600" fill="#0050d7" opacity=".7">La Rance</text>
      {/* building blocks */}
      <rect x="350" y="140" width="80" height="56" rx="4" fill="#0050d7" opacity=".85" />
      <text x="390" y="172" textAnchor="middle" fontFamily="Source Sans Pro" fontSize="11" fontWeight="700" fill="#fff">GYMNASE</text>
      <text x="390" y="188" textAnchor="middle" fontFamily="Source Sans Pro" fontSize="9" fontWeight="600" fill="rgba(255,255,255,.8)">L. Pellan</text>
      <rect x="120" y="180" width="40" height="24" rx="2" fill="#999" />
      <rect x="160" y="180" width="28" height="24" rx="2" fill="#aaa" />
      <rect x="200" y="180" width="56" height="36" rx="2" fill="#bbb" />
      <rect x="450" y="100" width="40" height="28" rx="2" fill="#999" />
      <rect x="498" y="100" width="34" height="40" rx="2" fill="#aaa" />
      {/* pin */}
      <g transform="translate(390 132)">
        <path d="M0 0 C -14 -22 -18 -34 0 -50 C 18 -34 14 -22 0 0 Z" fill="#bf0020" />
        <circle cx="0" cy="-32" r="6" fill="#fff" />
      </g>
    </svg>
  </div>
);

// Photo placeholder
const PhotoTile = ({ tone = "primary", caption, height, style }) => {
  const toneMap = { primary: 'blue', info: 'cyan', success: 'green', warning: 'gold', critical: 'orange', neutral: 'mono' };
  const cls = `bc-photo bc-photo--${toneMap[tone] || 'blue'}`;
  return (
    <div className={cls} style={{ height, ...style }}>
      {caption && <div className="bc-photo__label">{caption}</div>}
    </div>
  );
};

// Tone helper used in news / events
const toneToBadge = (tone) => {
  // tone is one of: primary, info, success, warning
  return `ods-badge ods-badge--${tone === 'info' ? 'info' : tone}`;
};

// Capacity bar
const CapacityBar = ({ value, max, tone = 'primary' }) => {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const color = pct > 85 ? 'var(--ods-color-warning-500)'
              : pct > 60 ? 'var(--ods-color-primary-500)'
              : 'var(--ods-color-success-500)';
  return (
    <div className="ods-progress" style={{ height: 5 }}>
      <span className="ods-progress__fill" style={{ width: pct + '%', background: color }}></span>
    </div>
  );
};

// Format a date input value to display
const fmtDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split('-');
  const months = ['JAN','FÉV','MARS','AVR','MAI','JUIN','JUIL.','AOÛT','SEPT','OCT','NOV','DÉC'];
  return { d, m: months[parseInt(m,10)-1], iso };
};

Object.assign(window, {
  CaulnesWord, BcLogo, LogoHero, ShuttlecockHero, MapMock, PhotoTile, LOGO_SRC,
  toneToBadge, CapacityBar, fmtDate,
});
