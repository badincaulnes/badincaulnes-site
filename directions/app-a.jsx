// Direction A — Sportif & dynamique
// Multi-page React mini-app. Pages live in state; admin form mutates the
// shared news/events arrays in component state.

const { useState, useMemo } = React;
const D = window.BC_DATA;

/* -----------------------------------------------------------------
   Top navigation
----------------------------------------------------------------- */
const PAGES = [
  ["home",     "Accueil"],
  ["news",     "Actualités"],
  ["agenda",   "Agenda"],
  ["about",    "Le club"],
  ["training", "Créneaux"],
  ["pricing",  "Inscription"],
  ["gallery",  "Galerie"],
  ["contact",  "Contact"],
];

function TopBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu after navigating + lock scroll while open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (k) => {
    setPage(k);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  };

  // External link to the bureau CMS — same tab, leaves the React app.
  const openBureau = () => { window.location.href = '/admin/'; };

  return (
    <header className="a-topbar">
      <div onClick={() => go("home")} role="button">
        <BcLogo />
      </div>
      <nav className="a-nav">
        {PAGES.map(([k, label]) => (
          <button key={k} aria-current={page === k ? "page" : undefined} onClick={() => go(k)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="a-cta">
        <button className="ods-btn ods-btn--primary-ghost ods-btn--sm" onClick={openBureau} title="Accès réservé aux bénévoles du bureau">
          <i className="ods-icon ods-icon--lock-close"></i>
          Espace bureau
        </button>
        <button className="ods-btn ods-btn--sm" onClick={() => go("pricing")}>
          <i className="ods-icon ods-icon--user-full"></i>
          Inscription
        </button>
        <button
          className="a-burger"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="a-mobile-nav" role="dialog" aria-label="Menu de navigation">
          <div className="a-mobile-nav__head">
            <BcLogo />
            <button
              className="a-burger a-burger--close"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
            >
              <span></span><span></span>
            </button>
          </div>
          <nav className="a-mobile-nav__links">
            {PAGES.map(([k, label]) => (
              <button key={k} aria-current={page === k ? "page" : undefined} onClick={() => go(k)}>
                {label}
                <i className="ods-icon ods-icon--arrow-right"></i>
              </button>
            ))}
            <button className="a-mobile-nav__admin" onClick={() => { setMenuOpen(false); openBureau(); }}>
              <i className="ods-icon ods-icon--lock-close"></i>
              Espace bureau
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -----------------------------------------------------------------
   Reusable bits
----------------------------------------------------------------- */
function StatStrip({ items, light }) {
  return (
    <div className="a-hero-strap">
      {items.map((s, i) => (
        <div key={i}>
          <div className="bc-stat-num num" style={light ? { color: '#fff' } : undefined}>{s.value}</div>
          <div className="bc-stat-lab lab" style={light ? { color: 'rgba(255,255,255,.6)' } : undefined}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function PageHero({ crumb, title, lead }) {
  return (
    <section className="a-page-hero">
      <div className="crumb">{crumb}</div>
      <h1 style={{ marginTop: 12 }}>{title}</h1>
      {lead && <p>{lead}</p>}
    </section>
  );
}

function NewsCard({ n, feature, onClick }) {
  return (
    <article className={"a-news-card" + (feature ? " a-news-card--feature" : "")} onClick={onClick}>
      <PhotoTile
        tone={n.categoryTone}
        caption={null}
        style={{ borderRadius: 0 }}
        height={feature ? 280 : 160}
      />
      <div className="a-news-body">
        <div className="a-news-meta">
          <span className={"a-chip bc-tone-" + n.categoryTone}>{n.category}</span>
          <span>·</span><span>{n.date}</span>
        </div>
        <h3 className="a-news-title">{n.title}</h3>
        <p className="a-news-excerpt">{n.excerpt}</p>
        <div className="a-news-foot">
          <span>Par {n.author}</span>
          <span><i className="ods-icon ods-icon--eye" style={{ fontSize: 11, marginRight: 4 }}></i>{n.reads}</span>
        </div>
      </div>
    </article>
  );
}

function EventCard({ e }) {
  return (
    <article className="a-event">
      <div className="a-event__date">
        <span className="d">{e.date.d}</span>
        <span className="m">{e.date.m}</span>
      </div>
      <div className="a-event__body">
        <span className={"a-chip bc-tone-" + e.kindTone} style={{ alignSelf: 'flex-start' }}>{e.kind}</span>
        <div className="a-event__title">{e.title}</div>
        <div className="a-event__meta">
          <span><i className="ods-icon ods-icon--clock-rotate-left"></i> {e.time}</span>
          <span><i className="ods-icon ods-icon--location"></i> {e.place}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--ods-color-neutral-700)', marginTop: 6, lineHeight: 1.45 }}>
          {e.description}
        </p>
        {e.capacity > 0 && (
          <div className="a-event__cap">
            <div className="a-event__cap-row">
              <span>{e.participants} inscrits</span>
              <span>{e.capacity} places</span>
            </div>
            <CapacityBar value={e.participants} max={e.capacity} />
          </div>
        )}
      </div>
    </article>
  );
}

/* -----------------------------------------------------------------
   PAGE — Home
----------------------------------------------------------------- */
function HomePage({ news, events, setPage }) {
  const featured = news[0];
  const rest = news.slice(1, 3);

  return (
    <>
      <section className="a-hero bc-on-dark">
        <div className="a-hero-inner">
          <div className="a-hero-col">
            <div className="a-hero-eyebrow">Saison {D.club.season} · {D.club.department}</div>
            <h1>
              Le badminton<br />
              à <CaulnesWord>Caulnes</CaulnesWord>,<br />
              sport loisir ouvert à tous.
            </h1>
            <p className="lead">
              43 licenciés, 7 terrains, et une seule règle&nbsp;: la convivialité. Du loisir
              du vendredi soir à l'interclubs régional — rejoignez le club et tapez votre
              premier volant cette semaine.
            </p>
            <div className="a-hero-ctas">
              <button className="ods-btn ods-btn--md" onClick={() => setPage("pricing")}>
                S'inscrire — saison 2026/27
                <i className="ods-icon ods-icon--arrow-right"></i>
              </button>
              <button className="ods-btn ods-btn--md ods-btn--primary-outline" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={() => setPage("training")}>
                Voir les créneaux
              </button>
            </div>
            <StatStrip items={D.stats} light />
          </div>
        </div>
      </section>

      {/* News */}
      <section className="a-section">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">À la une</div>
            <h2 style={{ marginTop: 10 }}>Les dernières actualités du club</h2>
          </div>
          <button className="a-link-arrow" onClick={() => setPage("news")}>
            Toutes les actualités <i className="ods-icon ods-icon--arrow-right"></i>
          </button>
        </div>
        <div className="a-news-grid">
          <NewsCard n={featured} feature />
          {rest.map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>

      {/* Events */}
      <section className="a-section a-section--alt">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">Agenda</div>
            <h2 style={{ marginTop: 10 }}>Les prochains rendez-vous</h2>
            <p className="sub">Tournois, interclubs, soirées : tout ce qui se passe au gymnase Léon Pellan dans les semaines qui viennent.</p>
          </div>
          <button className="a-link-arrow" onClick={() => setPage("agenda")}>
            Voir tout l'agenda <i className="ods-icon ods-icon--arrow-right"></i>
          </button>
        </div>
        <div className="a-events">
          {events.slice(0, 3).map(e => <EventCard key={e.id} e={e} />)}
        </div>
      </section>

      {/* Inscription teaser */}
      <section className="a-section">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">Inscription</div>
            <h2 style={{ marginTop: 10 }}>Une cotisation, trois séances par semaine, 50 €.</h2>
          </div>
          <button className="a-link-arrow" onClick={() => setPage("pricing")}>
            Tout savoir sur l'inscription <i className="ods-icon ods-icon--arrow-right"></i>
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24, maxWidth: 920 }}>
          {D.pricing.map(p => (
            <div key={p.id} onClick={() => setPage("pricing")} style={{ cursor: 'pointer' }}>
              <PriceCard p={p} />
            </div>
          ))}
          <div style={{
            background: 'var(--ods-color-neutral-025)',
            border: '1px dashed var(--ods-color-neutral-200)',
            borderRadius: 14,
            padding: 32,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ fontSize: 22, color: 'var(--ods-color-primary-800)', marginBottom: 8 }}>Venir essayer avant de s'inscrire ?</h3>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ods-color-neutral-700)' }}>
                Vos deux premières séances sont libres et gratuites. Le matériel est prêté.
                Passez simplement à l'un des créneaux de la semaine.
              </p>
            </div>
            <button className="ods-btn ods-btn--md ods-btn--primary-outline" onClick={() => setPage("training")}>
              Voir les créneaux <i className="ods-icon ods-icon--arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <CTAStrip setPage={setPage} />
    </>
  );
}

function PriceCard({ p }) {
  return (
    <article className={"a-price" + (p.featured ? " a-price--featured" : "")}>
      {p.featured && <span className="badge-feat">Le plus populaire</span>}
      <div>
        <h3>{p.title}</h3>
        <div className="sub">{p.sub}</div>
      </div>
      <div className="price">{p.price}€ <small>/ saison</small></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {p.perks.map((perk, i) => (
          <span key={i} className="perk">
            <i className="ods-icon ods-icon--check"></i>
            <span>{perk}</span>
          </span>
        ))}
      </div>
      <button
        className={"ods-btn ods-btn--sm" + (p.featured ? "" : " ods-btn--primary-outline")}
        style={p.featured ? { background: 'var(--a-accent)', color: 'var(--ods-color-primary-900)', borderColor: 'var(--a-accent)' } : undefined}
      >
        {p.cta} <i className="ods-icon ods-icon--arrow-right"></i>
      </button>
    </article>
  );
}

function CTAStrip({ setPage }) {
  return (
    <section className="bc-on-dark" style={{
      background: 'var(--a-deep)', color: '#fff',
      padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40
    }}>
      <div>
        <div style={{ color: 'var(--a-accent)', fontWeight: 700, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          Journée portes ouvertes
        </div>
        <h2 style={{ color: '#fff', fontSize: 36, marginTop: 8, letterSpacing: '-.02em' }}>
          Samedi 14 juin · venez essayer une raquette.
        </h2>
        <p style={{ color: 'rgba(255,255,255,.78)', marginTop: 8, fontSize: 16 }}>
          Matériel prêté, encadrement assuré par Mathilde et l'équipe. De 10h à 18h.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
        <button className="ods-btn ods-btn--md" style={{ background: 'var(--a-accent)', color: 'var(--ods-color-primary-900)', borderColor: 'var(--a-accent)' }} onClick={() => setPage("agenda")}>
          Réserver mon créneau
        </button>
        <button className="ods-btn ods-btn--md ods-btn--primary-outline" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={() => setPage("contact")}>
          Demander un renseignement
        </button>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   PAGE — News (all)
----------------------------------------------------------------- */
function NewsPage({ news, setPage }) {
  const [filter, setFilter] = useState("Tous");
  const cats = ["Tous", ...Array.from(new Set(news.map(n => n.category)))];
  const filtered = filter === "Tous" ? news : news.filter(n => n.category === filter);
  return (
    <>
      <PageHero
        crumb="Accueil · Actualités"
        title="Actualités du club"
        lead="Toute la vie de BadinCaulnes au fil des semaines — communiqués officiels, résultats sportifs, vie associative."
      />
      <section className="a-section">
        <div className="ods-toggle" style={{ marginBottom: 28 }}>
          {cats.map(c => (
            <button key={c} className={"ods-toggle__btn" + (filter === c ? " ods-toggle__btn--active" : "")} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="a-news-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {filtered.map(n => <NewsCard key={n.id} n={n} />)}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Agenda
----------------------------------------------------------------- */
function AgendaPage({ events }) {
  const [kindFilter, setKindFilter] = useState("Tous");
  const kinds = ["Tous", ...Array.from(new Set(events.map(e => e.kind)))];
  const filtered = kindFilter === "Tous" ? events : events.filter(e => e.kind === kindFilter);
  return (
    <>
      <PageHero
        crumb="Accueil · Agenda"
        title="Les événements à venir"
        lead="Tournois, interclubs, stages, événements conviviaux : retrouvez l'ensemble des rendez-vous de la saison."
      />
      <section className="a-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div className="ods-toggle">
            {kinds.map(k => (
              <button key={k} className={"ods-toggle__btn" + (kindFilter === k ? " ods-toggle__btn--active" : "")} onClick={() => setKindFilter(k)}>
                {k}
              </button>
            ))}
          </div>
          <div className="ods-row" style={{ gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--ods-color-neutral-600)' }}>{filtered.length} événement{filtered.length > 1 ? 's' : ''}</span>
            <button className="ods-btn ods-btn--sm ods-btn--primary-outline">
              <i className="ods-icon ods-icon--download"></i>
              Exporter en .ics
            </button>
          </div>
        </div>
        <div className="a-events">
          {filtered.map(e => <EventCard key={e.id} e={e} />)}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — About / club
----------------------------------------------------------------- */
function AboutPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero
        crumb="Accueil · Le club"
        title="Un club, une famille, une passion."
        lead="Fondé en 2008 par une poignée d'enthousiastes, BadinCaulnes rassemble aujourd'hui 43 licenciés autour d'une même idée : pratiquer un badminton exigeant et chaleureux."
      />
      <section className="a-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="bc-eyebrow">Notre histoire</div>
            <h2 style={{ marginTop: 12, fontSize: 36, letterSpacing: '-.02em' }}>De six joueurs à six terrains pleins.</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
              C'est dans la petite salle annexe du complexe sportif que tout a commencé en 2008. Six amis, deux poteaux,
              quatre raquettes prêtées. Dix-huit ans plus tard, le club déploie ses sept terrains chaque séance et réunit
              une communauté fidèle autour d'un badminton convivial et accessible à tous.
            </p>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>
              Ce qui n'a pas changé : on s'y retrouve d'abord pour le plaisir de jouer ensemble.
            </p>
            <div className="a-hero-strap" style={{ borderColor: 'var(--ods-color-neutral-100)' }}>
              <div>
                <div className="bc-stat-num" style={{ color: 'var(--a-deep)' }}>2008</div>
                <div className="bc-stat-lab" style={{ color: 'var(--ods-color-neutral-600)' }}>Année de création</div>
              </div>
              <div>
                <div className="bc-stat-num" style={{ color: 'var(--a-deep)' }}>4</div>
                <div className="bc-stat-lab" style={{ color: 'var(--ods-color-neutral-600)' }}>Bénévoles encadrants</div>
              </div>
              <div>
                <div className="bc-stat-num" style={{ color: 'var(--a-deep)' }}>2</div>
                <div className="bc-stat-lab" style={{ color: 'var(--ods-color-neutral-600)' }}>Équipes en interclubs</div>
              </div>
            </div>
          </div>
          <PhotoTile tone="primary" caption="L'équipe BC1 — saison 2025-2026" height={420} />
        </div>
      </section>

      <section className="a-section a-section--alt">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">Le bureau</div>
            <h2 style={{ marginTop: 10 }}>L'équipe qui fait tourner le club</h2>
          </div>
        </div>
        <div className="a-team-grid">
          {D.team.map((m, i) => (
            <div key={i} className="a-team-card">
              <div className="a-team-av" style={{ background: 'var(--ods-color-' + (m.tone === 'info' ? 'primary-400' : m.tone === 'success' ? 'success-500' : m.tone === 'warning' ? 'warning-500' : 'primary-700') + ')' }}>
                {m.initials}
              </div>
              <div className="a-team-name">{m.name}</div>
              <div className="a-team-role">{m.role}</div>
              <div style={{ fontSize: 11, color: 'var(--ods-color-neutral-500)', marginTop: 6 }}>au club depuis {m.since}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="a-section">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">Questions fréquentes</div>
            <h2 style={{ marginTop: 10 }}>Tout ce qu'il faut savoir avant de venir</h2>
          </div>
        </div>
        <div className="ods-accordion" style={{ maxWidth: 920 }}>
          {D.faq.map((f, i) => (
            <div key={i} className={"ods-accordion__item" + (open === i ? " ods-accordion__item--open" : "")}>
              <button className="ods-accordion__trigger" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <i className="ods-icon ods-icon--chevron-down"></i>
              </button>
              <div className="ods-accordion__content">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Training schedule
----------------------------------------------------------------- */
function TrainingPage() {
  return (
    <>
      <PageHero
        crumb="Accueil · Créneaux"
        title="Les créneaux d'entraînement"
        lead="Trois séances par semaine — lundi soir, jeudi soir et dimanche matin. Toutes les séances sont en jeu libre, ouvertes à tous les niveaux. Le jeudi de 19h30 à 20h30, un animateur de l'OIS est présent pour encadrer."
      />
      <section className="a-section">
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <span className="ods-badge ods-badge--md bc-tone-info">Loisir — jeu libre</span>
          <span className="ods-badge ods-badge--md bc-tone-primary">Séance encadrée OIS</span>
        </div>
        <div className="a-week">
          <table>
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Jour</th>
                <th style={{ width: '14%' }}>Horaire</th>
                <th>Public</th>
                <th>Encadrement</th>
                <th style={{ width: '10%' }}>Terrains</th>
                <th style={{ width: '16%' }}>Catégorie</th>
              </tr>
            </thead>
            <tbody>
              {D.slots.map((s, i) => (
                <tr key={i}>
                  <td className="day">{s.day}</td>
                  <td className="time">{s.start} — {s.end}</td>
                  <td>{s.level}</td>
                  <td>{s.coach}</td>
                  <td>{s.courts}/7</td>
                  <td><span className={"a-chip bc-tone-" + s.tone}>
                    {s.tone === 'primary' ? 'Encadré' : s.tone === 'warning' ? 'Famille' : 'Loisir'}
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--ods-color-neutral-600)' }}>
          <i className="ods-icon ods-icon--circle-info" style={{ marginRight: 6, color: 'var(--ods-color-primary-500)' }}></i>
          En cas d'affluence, l'accès aux terrains se fait par rotation (10 min de jeu, puis on change). Pensez au tableau d'inscription à l'entrée.
        </p>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Pricing / Inscription
----------------------------------------------------------------- */
function PricingPage() {
  const offer = D.pricing[0];
  return (
    <>
      <PageHero
        crumb="Accueil · Inscription"
        title="Une cotisation, trois séances par semaine."
        lead="Une formule unique pour adhérer au club, simple et claire. À partir de la mi-saison, la cotisation passe à 25 €."
      />
      <section className="a-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'flex-start' }}>

          {/* Offer card — left column */}
          <div style={{ position: 'sticky', top: 96 }}>
            <article className="a-price a-price--featured" style={{ padding: 32 }}>
              <span className="badge-feat">Saison 2026 / 27</span>
              <div>
                <h3 style={{ fontSize: 28 }}>{offer.title}</h3>
                <div className="sub">{offer.sub}</div>
              </div>
              <div className="price" style={{ fontSize: 64 }}>
                {offer.price}€ <small style={{ fontSize: 16 }}>/ saison</small>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {offer.perks.map((perk, i) => (
                  <span key={i} className="perk">
                    <i className="ods-icon ods-icon--check"></i>
                    <span>{perk}</span>
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.16)', fontSize: 13, color: 'rgba(255,255,255,.78)', lineHeight: 1.5 }}>
                <i className="ods-icon ods-icon--circle-info" style={{ marginRight: 6 }}></i>
                Tarif unique pour la saison complète. À partir de la mi-saison, la cotisation passe à 25 €.
              </div>
            </article>

            <div className="ods-message ods-message--info" style={{ padding: 18, alignItems: 'flex-start', borderRadius: 12, marginTop: 24 }}>
              <i className="ods-icon ods-icon--lightbulb" style={{ fontSize: 18 }}></i>
              <div>
                <div className="ods-message__title" style={{ fontSize: 14, marginBottom: 4 }}>Venir essayer avant</div>
                <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                  Vous pouvez passer une première séance gratuitement, matériel prêté.
                </p>
              </div>
            </div>
          </div>

          {/* Inscription form — right column */}
          <InscriptionForm />
        </div>
      </section>
    </>
  );
}

function InscriptionForm() {
  const [f, setF] = useState({
    firstName: '', lastName: '', birthDate: '', email: '', phone: '',
    level: '', referral: '', comment: '', gdprAccepted: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setF((prev) => ({ ...prev, [k]: v }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const r = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      if (!r.ok) {
        const txt = await r.text();
        let parsed;
        try { parsed = JSON.parse(txt); } catch { parsed = { error: txt }; }
        throw new Error(parsed.error || 'Erreur inconnue');
      }
      setStatus('sent');
    } catch (err) {
      setErrorMsg(err.message || 'Erreur réseau');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ background: '#fff', border: '1px solid var(--ods-color-neutral-100)', borderRadius: 12, padding: 40 }}>
        <div className="ods-message ods-message--success" style={{ padding: 24, alignItems: 'flex-start' }}>
          <i className="ods-icon ods-icon--circle-check" style={{ fontSize: 28 }}></i>
          <div>
            <div className="ods-message__title" style={{ fontSize: 18, marginBottom: 8 }}>Demande d'inscription envoyée</div>
            <p style={{ fontSize: 15, lineHeight: 1.55 }}>
              Merci {f.firstName} ! Votre demande est arrivée chez le bureau. Nous vous recontacterons par email à <strong>{f.email}</strong> dans les prochains jours pour finaliser votre inscription (règlement, certificat médical, etc.).
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 12, color: 'var(--ods-color-neutral-700)' }}>
              En attendant, vous pouvez <strong>venir essayer une séance librement</strong> aux horaires d'entraînement.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', border: '1px solid var(--ods-color-neutral-100)', borderRadius: 12, padding: 32 }}>
      <h3 style={{ fontSize: 24, letterSpacing: '-.01em', marginBottom: 4 }}>Formulaire d'inscription</h3>
      <p style={{ fontSize: 14, color: 'var(--ods-color-neutral-600)', marginBottom: 24 }}>
        Remplissez ce formulaire et le bureau vous recontactera pour finaliser l'inscription.
      </p>
      {status === 'error' && (
        <div className="ods-message ods-message--critical" style={{ marginBottom: 20 }}>
          <i className="ods-icon ods-icon--circle-exclamation"></i>
          <div>
            <div className="ods-message__title">Une erreur s'est produite</div>
            <p>{errorMsg}. Réessayez ou contactez-nous par email.</p>
          </div>
        </div>
      )}
      <form onSubmit={submit} className="a-formgrid">
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Nom</label>
          <input className="ods-input" required value={f.lastName} onChange={update('lastName')} placeholder="Tanguy" />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Prénom</label>
          <input className="ods-input" required value={f.firstName} onChange={update('firstName')} placeholder="Camille" />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Date de naissance</label>
          <input className="ods-input" type="date" required value={f.birthDate} onChange={update('birthDate')} />
        </div>
        <div className="ods-field">
          <label className="ods-field__label">Niveau de pratique</label>
          <select className="ods-input" value={f.level} onChange={update('level')}>
            <option value="">Sélectionner —</option>
            <option>Débutant</option>
            <option>Loisir occasionnel</option>
            <option>Loisir régulier</option>
            <option>Intermédiaire</option>
            <option>Confirmé / compétiteur</option>
          </select>
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Email</label>
          <input className="ods-input" type="email" required value={f.email} onChange={update('email')} placeholder="vous@email.com" />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Téléphone</label>
          <input className="ods-input" type="tel" required value={f.phone} onChange={update('phone')} placeholder="06 12 34 56 78" />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label">Comment avez-vous connu le club ?</label>
          <input className="ods-input" value={f.referral} onChange={update('referral')} placeholder="Bouche-à-oreille, forum des associations, recherche internet…" />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label">Commentaire libre</label>
          <textarea className="ods-textarea" rows={3} value={f.comment} onChange={update('comment')} placeholder="Allergies, besoins particuliers, questions…" />
        </div>
        <div className="full ods-row" style={{ alignItems: 'flex-start', padding: 14, background: 'var(--ods-color-neutral-025)', borderRadius: 8, marginTop: 4 }}>
          <input className="ods-checkbox" type="checkbox" id="gdpr" required checked={f.gdprAccepted} onChange={update('gdprAccepted')} />
          <label htmlFor="gdpr" className="ods-check-label" style={{ fontSize: 13, lineHeight: 1.5 }}>
            J'accepte que mes données soient utilisées par BadinCaulnes pour traiter ma demande d'inscription.
            Elles sont conservées uniquement le temps nécessaire à la gestion de votre adhésion et ne sont ni
            revendues ni partagées avec des tiers.
          </label>
        </div>
        <div className="full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)' }}>
            <i className="ods-icon ods-icon--lock-close" style={{ marginRight: 4 }}></i>
            Vos données sont envoyées de manière sécurisée.
          </span>
          <button type="submit" className="ods-btn ods-btn--md" disabled={status === 'sending'}>
            {status === 'sending' ? (
              <>
                <i className="ods-icon ods-icon--spinner"></i>
                Envoi en cours…
              </>
            ) : (
              <>
                <i className="ods-icon ods-icon--check"></i>
                Envoyer ma demande d'inscription
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -----------------------------------------------------------------
   PAGE — Gallery
----------------------------------------------------------------- */
function GalleryPage({ gallery }) {
  const items = (gallery && gallery.length) ? gallery : D.gallery || [];
  return (
    <>
      <PageHero
        crumb="Accueil · Galerie"
        title="La galerie photo"
        lead="Souvenirs des tournois, des stages, des soirées et des moments du club. Une photo manque ? Envoyez-la nous via le formulaire de contact."
      />
      <section className="a-section">
        <div className="a-gallery">
          {items.map((g, i) => (
            g.image
              ? (
                  <div key={g.id} className="bc-photo" style={{ background: '#000' }}>
                    <img src={g.image} alt={g.caption || ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    {g.caption && <div className="bc-photo__label">{g.caption}</div>}
                  </div>
                )
              : <PhotoTile key={g.id} tone={g.tone} caption={g.caption} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <button className="ods-btn ods-btn--md ods-btn--primary-outline">Charger davantage de photos</button>
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Contact
----------------------------------------------------------------- */
function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Renseignement général', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg('');
    // Netlify Forms expects URL-encoded form data on the site root.
    const body = new URLSearchParams({
      'form-name': 'contact',
      ...form,
    }).toString();
    try {
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!r.ok) throw new Error('Erreur ' + r.status);
      setSent(true);
    } catch (err) {
      setErrorMsg(err.message || 'Erreur réseau');
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <PageHero
        crumb="Accueil · Contact"
        title="Nous écrire, venir nous voir"
        lead="Le bureau répond sous 48 h en moyenne. Pour les questions urgentes, n'hésitez pas à passer un soir d'entraînement."
      />
      <section className="a-section">
        <div className="a-contact">
          <div>
            <MapMock />
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--ods-color-neutral-600)' }}>
              <i className="ods-icon ods-icon--location" style={{ marginRight: 6 }}></i>
              48° 16′ 53″ N · 02° 09′ 38″ W — entrée par la rue de la Hutte aux Renards
            </p>
          </div>
          <div className="a-contact-info">
            <div className="a-info-row">
              <i className="ods-icon ods-icon--building"></i>
              <div>
                <strong>Complexe sportif Léon Pellan</strong>
                <span>Rue de la Hutte aux Renards<br />22350 Caulnes</span>
              </div>
            </div>
            <div className="a-info-row">
              <i className="ods-icon ods-icon--email"></i>
              <div>
                <strong>Par email</strong>
                <span>{D.club.contact.email}</span>
              </div>
            </div>
            <div className="a-info-row">
              <i className="ods-icon ods-icon--phone"></i>
              <div>
                <strong>Par téléphone</strong>
                <span>{D.club.contact.phone}<br /><span style={{ color: 'var(--ods-color-neutral-500)' }}>Aux heures de bureau</span></span>
              </div>
            </div>
            <div className="a-info-row">
              <i className="ods-icon ods-icon--calendar"></i>
              <div>
                <strong>Aux heures d'entraînement</strong>
                <span>{D.club.venue.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 56, background: '#fff', border: '1px solid var(--ods-color-neutral-100)', borderRadius: 12, padding: 32, maxWidth: 760 }}>
          <h3 style={{ fontSize: 24, marginBottom: 4 }}>Envoyez-nous un message</h3>
          <p style={{ fontSize: 14, color: 'var(--ods-color-neutral-600)', marginBottom: 20 }}>
            Une question, une demande d'essai, un partenariat ? On vous répond rapidement.
          </p>
          {sent ? (
            <div className="ods-message ods-message--success">
              <i className="ods-icon ods-icon--circle-check"></i>
              <div>
                <div className="ods-message__title">Message envoyé</div>
                <p>Merci {form.name || ''} ! Nous reviendrons vers vous très vite.</p>
              </div>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={submit}
              className="a-formgrid"
            >
              {/* Required by Netlify Forms to identify this form. */}
              <input type="hidden" name="form-name" value="contact" />
              {/* Spam honeypot — hidden from real users, but bots fill it. */}
              <p style={{ display: 'none' }}>
                <label>Ne pas remplir : <input name="bot-field" /></label>
              </p>
              {errorMsg && (
                <div className="ods-message ods-message--critical full" style={{ marginBottom: 4 }}>
                  <i className="ods-icon ods-icon--circle-exclamation"></i>
                  <div>
                    <div className="ods-message__title">Erreur d'envoi</div>
                    <p>{errorMsg}. Vous pouvez nous écrire directement à <a href={"mailto:" + D.club.contact.email}>{D.club.contact.email}</a>.</p>
                  </div>
                </div>
              )}
              <div className="ods-field">
                <label className="ods-field__label ods-field__label--required">Nom et prénom</label>
                <input className="ods-input" name="name" placeholder="Ex. Camille Tanguy" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="ods-field">
                <label className="ods-field__label ods-field__label--required">Email</label>
                <input className="ods-input" name="email" type="email" placeholder="vous@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="ods-field full">
                <label className="ods-field__label">Sujet</label>
                <select className="ods-input" name="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  <option>Renseignement général</option>
                  <option>Demande d'essai</option>
                  <option>Inscription saison 2026/27</option>
                  <option>Partenariat / sponsoring</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="ods-field full">
                <label className="ods-field__label ods-field__label--required">Votre message</label>
                <textarea className="ods-textarea" name="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <div className="full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)' }}>
                  <i className="ods-icon ods-icon--lock-close" style={{ marginRight: 4 }}></i>
                  Le bureau reçoit votre message par email.
                </span>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="submit" className="ods-btn ods-btn--md" disabled={sending}>
                    {sending ? (
                      <><i className="ods-icon ods-icon--spinner"></i> Envoi en cours…</>
                    ) : (
                      <>Envoyer le message<i className="ods-icon ods-icon--arrow-right"></i></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   Footer
----------------------------------------------------------------- */
function Footer({ setPage }) {
  return (
    <footer className="a-footer">
      <div className="a-footer__grid">
        <div>
          <BcLogo inverse />
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,.65)', fontSize: 14, lineHeight: 1.55, maxWidth: 340 }}>
            Club de badminton de Caulnes — association loi 1901.<br />
            Saison {D.club.season}.
          </p>
        </div>
        <div>
          <h5>Le club</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <li><a onClick={() => setPage("about")}>Présentation</a></li>
            <li><a onClick={() => setPage("about")}>Le bureau</a></li>
            <li><a onClick={() => setPage("training")}>Créneaux</a></li>
            <li><a onClick={() => setPage("pricing")}>Inscription</a></li>
          </ul>
        </div>
        <div>
          <h5>Vie du club</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <li><a onClick={() => setPage("news")}>Actualités</a></li>
            <li><a onClick={() => setPage("agenda")}>Agenda</a></li>
            <li><a onClick={() => setPage("gallery")}>Galerie</a></li>
            <li><a onClick={() => setPage("contact")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Pratique</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <li><a href="#">Dossier d'inscription</a></li>
            <li><a href="#">Règlement intérieur</a></li>
            <li><a href="#">Plan d'accès</a></li>
            <li><a href="#">Mairie de Caulnes</a></li>
          </ul>
        </div>
        <div>
          <h5>Nous écrire</h5>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 14, lineHeight: 1.5 }}>
            {D.club.venue.name}<br />
            {D.club.venue.address}
          </p>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: 14, marginTop: 10 }}>
            <a href={"mailto:" + D.club.contact.email}>{D.club.contact.email}</a><br />
            <a href={"tel:" + D.club.contact.phone}>{D.club.contact.phone}</a>
          </p>
        </div>
      </div>
      <div className="a-footer__strip">
        <span>© 2026 BadinCaulnes · Association loi 1901</span>
        <span style={{ display: 'flex', gap: 16 }}>
          <a href="#">Mentions légales</a>
          <a href="#">RGPD</a>
          <a href="#">Crédits</a>
        </span>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------------
   App root
----------------------------------------------------------------- */
function App() {
  const [page, setPage] = useState("home");
  const [news, setNews] = useState(D.news || []);
  const [events, setEvents] = useState(D.events || []);
  const [gallery, setGallery] = useState(D.gallery || []);
  const [loaded, setLoaded] = useState(!!(D.news && D.news.length));

  // Pull news + events + gallery from /content/*.json on mount.
  React.useEffect(() => {
    if (window.BC_DATA_READY) {
      window.BC_DATA_READY.then((data) => {
        setNews(data.news || []);
        setEvents(data.events || []);
        setGallery(data.gallery || []);
        setLoaded(true);
      });
    } else {
      setLoaded(true);
    }
  }, []);

  const addNews    = (n) => setNews(prev => [n, ...prev]);
  const removeNews = (id) => setNews(prev => prev.filter(n => n.id !== id));
  const addEvent   = (e) => setEvents(prev => [e, ...prev]);
  const removeEvent= (id) => setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div className="a-app" data-screen-label={"Direction A · " + (PAGES.find(p => p[0] === page)?.[1] || page)}>
      <TopBar page={page} setPage={setPage} />
      {page === "home"     && <HomePage     news={news} events={events} setPage={setPage} />}
      {page === "news"     && <NewsPage     news={news} setPage={setPage} />}
      {page === "agenda"   && <AgendaPage   events={events} />}
      {page === "about"    && <AboutPage />}
      {page === "training" && <TrainingPage />}
      {page === "pricing"  && <PricingPage />}
      {page === "gallery"  && <GalleryPage gallery={gallery} />}
      {page === "contact"  && <ContactPage />}
      <Footer setPage={setPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
