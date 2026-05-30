// BadinCaulnes — site vitrine statique.
// Pages : Accueil · Agenda · Créneaux · Contact. Tout le contenu vient de data.js.

const { useState } = React;
const D = window.BC_DATA;

/* -----------------------------------------------------------------
   Navigation
----------------------------------------------------------------- */
const PAGES = [
  ["home",     "Accueil"],
  ["agenda",   "Agenda"],
  ["training", "Créneaux"],
  ["contact",  "Contact"],
];

function TopBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (k) => {
    setPage(k);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

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
        <button className="ods-btn ods-btn--sm" onClick={() => go("contact")}>
          <i className="ods-icon ods-icon--email"></i>
          Nous contacter
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
          </nav>
        </div>
      )}
    </header>
  );
}

/* -----------------------------------------------------------------
   Reusable bits
----------------------------------------------------------------- */
function PageHero({ crumb, title, lead }) {
  return (
    <section className="a-page-hero">
      <div className="crumb">{crumb}</div>
      <h1 style={{ marginTop: 12 }}>{title}</h1>
      {lead && <p>{lead}</p>}
    </section>
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
        {e.kind && <span className={"a-chip bc-tone-" + (e.kindTone || 'primary')} style={{ alignSelf: 'flex-start' }}>{e.kind}</span>}
        <div className="a-event__title">{e.title}</div>
        <div className="a-event__meta">
          {e.time &&  <span><i className="ods-icon ods-icon--clock-rotate-left"></i> {e.time}</span>}
          {e.place && <span><i className="ods-icon ods-icon--location"></i> {e.place}</span>}
        </div>
        {e.description && (
          <p style={{ fontSize: 13, color: 'var(--ods-color-neutral-700)', marginTop: 6, lineHeight: 1.45 }}>
            {e.description}
          </p>
        )}
      </div>
    </article>
  );
}

// Social icons — inline SVG so they render reliably (the ODS font has no brand glyphs).
const IconFacebook = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"/>
  </svg>
);
const IconInstagram = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

/* -----------------------------------------------------------------
   PAGE — Accueil
----------------------------------------------------------------- */
function HomePage({ events, setPage }) {
  const upcoming = (events || []).slice(0, 3);
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
              7 terrains, et une seule règle&nbsp;: la convivialité. Club loisir,
              rejoignez le club et tapez votre premier volant cette semaine.
            </p>
            <div className="a-hero-ctas">
              <button className="ods-btn ods-btn--md" title="Inscriptions bientôt ouvertes">
                S'inscrire
                <i className="ods-icon ods-icon--arrow-right"></i>
              </button>
              <button className="ods-btn ods-btn--md ods-btn--primary-outline" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={() => setPage("training")}>
                Voir les créneaux
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Créneaux teaser */}
      <section className="a-section">
        <div className="a-section-head">
          <div>
            <div className="bc-eyebrow">Quand jouer ?</div>
            <h2 style={{ marginTop: 10 }}>Trois séances par semaine</h2>
            <p className="sub">Lundi et jeudi en soirée, dimanche en matinée — au complexe sportif Léon Pellan.</p>
          </div>
          <button className="a-link-arrow" onClick={() => setPage("training")}>
            Voir le détail des créneaux <i className="ods-icon ods-icon--arrow-right"></i>
          </button>
        </div>
        <div className="a-events">
          {D.slots.map((s, i) => (
            <article key={i} className="a-event">
              <div className="a-event__date">
                <span className="d">{s.day.slice(0, 3)}</span>
                <span className="m">{s.start.replace(':', 'h')}</span>
              </div>
              <div className="a-event__body">
                <span className={"a-chip bc-tone-" + s.tone} style={{ alignSelf: 'flex-start' }}>
                  {s.tone === 'primary' ? 'Séance encadrée' : 'Jeu libre'}
                </span>
                <div className="a-event__title">{s.day} · {s.start} – {s.end}</div>
                <div className="a-event__meta">
                  <span><i className="ods-icon ods-icon--location"></i> {s.level}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Agenda teaser — only when there are events */}
      {upcoming.length > 0 && (
        <section className="a-section a-section--alt">
          <div className="a-section-head">
            <div>
              <div className="bc-eyebrow">Agenda</div>
              <h2 style={{ marginTop: 10 }}>Les prochains rendez-vous</h2>
            </div>
            <button className="a-link-arrow" onClick={() => setPage("agenda")}>
              Voir tout l'agenda <i className="ods-icon ods-icon--arrow-right"></i>
            </button>
          </div>
          <div className="a-events">
            {upcoming.map(e => <EventCard key={e.id} e={e} />)}
          </div>
        </section>
      )}

      <FollowBand />

      <ClosingStrip setPage={setPage} />
    </>
  );
}

function FollowBand() {
  const c = D.club.contact;
  return (
    <section className="a-section a-follow">
      <div className="a-section-head">
        <div>
          <div className="bc-eyebrow">Restez connectés</div>
          <h2 style={{ marginTop: 10 }}>Suivez le club au quotidien</h2>
          <p className="sub">Résultats, photos, annonces de dernière minute : toute la vie du club se passe sur nos réseaux.</p>
        </div>
      </div>
      <div className="a-follow-grid">
        <a className="a-follow-card a-follow-card--fb" href={c.facebook} target="_blank" rel="noopener">
          <span className="a-follow-card__ic"><IconFacebook size={28} /></span>
          <div className="a-follow-card__txt">
            <strong>Facebook</strong>
            <span>@badincaulnes</span>
          </div>
          <i className="ods-icon ods-icon--arrow-right a-follow-card__go"></i>
        </a>
        <a className="a-follow-card a-follow-card--ig" href={c.instagram} target="_blank" rel="noopener">
          <span className="a-follow-card__ic"><IconInstagram size={28} /></span>
          <div className="a-follow-card__txt">
            <strong>Instagram</strong>
            <span>@badincaulnes</span>
          </div>
          <i className="ods-icon ods-icon--arrow-right a-follow-card__go"></i>
        </a>
      </div>
    </section>
  );
}

function ClosingStrip({ setPage }) {
  return (
    <section className="bc-on-dark" style={{
      background: 'var(--a-deep)', color: '#fff',
      padding: '48px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap'
    }}>
      <div>
        <div style={{ color: 'var(--a-accent)', fontWeight: 700, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          Envie d'essayer ?
        </div>
        <h2 style={{ color: '#fff', fontSize: 32, marginTop: 8, letterSpacing: '-.02em' }}>
          Votre première séance est gratuite.
        </h2>
        <p style={{ color: 'rgba(255,255,255,.78)', marginTop: 8, fontSize: 16, maxWidth: 520 }}>
          Matériel prêté, ambiance conviviale. Passez à l'un de nos créneaux ou écrivez-nous.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
        <button className="ods-btn ods-btn--md" style={{ background: 'var(--a-accent)', color: 'var(--ods-color-primary-900)', borderColor: 'var(--a-accent)' }} onClick={() => setPage("training")}>
          Voir les créneaux
        </button>
        <button className="ods-btn ods-btn--md ods-btn--primary-outline" style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.4)' }} onClick={() => setPage("contact")}>
          Nous contacter
        </button>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------
   PAGE — Agenda
----------------------------------------------------------------- */
function AgendaPage({ events }) {
  const list = events || [];
  return (
    <>
      <PageHero
        crumb="Accueil · Agenda"
        title="Les événements à venir"
      />
      <section className="a-section">
        {list.length > 0 ? (
          <div className="a-events">
            {list.map(e => <EventCard key={e.id} e={e} />)}
          </div>
        ) : (
          <div style={{
            background: 'var(--ods-color-neutral-025)',
            border: '1px dashed var(--ods-color-neutral-200)',
            borderRadius: 14, padding: '56px 32px', textAlign: 'center',
          }}>
            <i className="ods-icon ods-icon--calendar" style={{ fontSize: 32, color: 'var(--bc-teal)' }}></i>
            <h3 style={{ fontSize: 22, color: 'var(--ods-color-primary-800)', marginTop: 16 }}>
              L'agenda de la saison arrive bientôt
            </h3>
            <p style={{ fontSize: 15, color: 'var(--ods-color-neutral-700)', marginTop: 8, maxWidth: 480, marginInline: 'auto', lineHeight: 1.55 }}>
              Les prochains rendez-vous seront publiés ici. En attendant, suivez notre actualité
              au jour le jour sur nos réseaux sociaux.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
              <a className="ods-btn ods-btn--md" href={D.club.contact.facebook} target="_blank" rel="noopener" style={{ background: '#1877f2', borderColor: '#1877f2', color: '#fff' }}>
                <IconFacebook size={18} /> Facebook
              </a>
              <a className="ods-btn ods-btn--md" href={D.club.contact.instagram} target="_blank" rel="noopener" style={{ background: 'linear-gradient(45deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)', borderColor: 'transparent', color: '#fff' }}>
                <IconInstagram size={18} /> Instagram
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Créneaux
----------------------------------------------------------------- */
function TrainingPage() {
  return (
    <>
      <PageHero
        crumb="Accueil · Créneaux"
        title="Les créneaux d'entraînement"
        lead="Trois séances par semaine, en jeu libre et ouvertes à tous les niveaux. Le jeudi de 19h30 à 20h30, un animateur de l'OIS est présent pour encadrer."
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
                <th style={{ width: '14%' }}>Jour</th>
                <th style={{ width: '18%' }}>Horaire</th>
                <th>Séance</th>
                <th>Encadrement</th>
                <th style={{ width: '16%' }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {D.slots.map((s, i) => (
                <tr key={i}>
                  <td className="day">{s.day}</td>
                  <td className="time">{s.start} — {s.end}</td>
                  <td>{s.level}</td>
                  <td>{s.coach}</td>
                  <td>
                    <span className={"a-chip bc-tone-" + s.tone}>
                      {s.tone === 'primary' ? 'Séance encadrée' : 'Jeu libre'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 24, fontSize: 13, color: 'var(--ods-color-neutral-600)' }}>
          <i className="ods-icon ods-icon--circle-info" style={{ marginRight: 6, color: 'var(--ods-color-primary-500)' }}></i>
          En cas d'affluence, l'accès aux terrains se fait par rotation. Le club prête raquettes et volants pour vos premières séances.
        </p>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Contact
----------------------------------------------------------------- */
function ContactPage() {
  const c = D.club.contact;
  return (
    <>
      <PageHero
        crumb="Accueil · Contact"
        title="Nous écrire, venir nous voir"
        lead="Une question, une envie d'essayer ? Écrivez-nous ou suivez le club sur les réseaux."
      />
      <section className="a-section">
        <div className="a-contact-cards">
          {/* Email */}
          <a className="a-contact-card" href={"mailto:" + c.email}>
            <span className="a-contact-card__ic"><i className="ods-icon ods-icon--email"></i></span>
            <div>
              <strong>Par email</strong>
              <span>{c.email}</span>
            </div>
            <i className="ods-icon ods-icon--arrow-right a-contact-card__go"></i>
          </a>

          {/* Adresse / map */}
          <a className="a-contact-card" href={c.mapUrl} target="_blank" rel="noopener">
            <span className="a-contact-card__ic"><i className="ods-icon ods-icon--location"></i></span>
            <div>
              <strong>{D.club.venue.name}</strong>
              <span>Rue de la Hutte aux Renards, 22350 Caulnes<br />Voir l'itinéraire sur Google Maps</span>
            </div>
            <i className="ods-icon ods-icon--arrow-right a-contact-card__go"></i>
          </a>

          {/* Facebook */}
          <a className="a-contact-card" href={c.facebook} target="_blank" rel="noopener">
            <span className="a-contact-card__ic a-contact-card__ic--fb"><IconFacebook /></span>
            <div>
              <strong>Facebook</strong>
              <span>Toute l'actualité du club au jour le jour</span>
            </div>
            <i className="ods-icon ods-icon--arrow-right a-contact-card__go"></i>
          </a>

          {/* Instagram */}
          <a className="a-contact-card" href={c.instagram} target="_blank" rel="noopener">
            <span className="a-contact-card__ic a-contact-card__ic--ig"><IconInstagram /></span>
            <div>
              <strong>Instagram</strong>
              <span>Photos et moments du club</span>
            </div>
            <i className="ods-icon ods-icon--arrow-right a-contact-card__go"></i>
          </a>
        </div>

        <div className="a-contact-hours">
          <i className="ods-icon ods-icon--clock-rotate-left"></i>
          <div>
            <strong>Quand nous trouver au gymnase</strong>
            <span>{D.club.venue.hours} — voir les horaires détaillés dans la rubrique Créneaux.</span>
          </div>
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   Footer
----------------------------------------------------------------- */
function Footer({ setPage }) {
  const c = D.club.contact;
  return (
    <footer className="a-footer">
      <div className="a-footer__grid">
        <div>
          <BcLogo inverse />
          <p style={{ marginTop: 16, color: 'rgba(255,255,255,.65)', fontSize: 14, lineHeight: 1.55, maxWidth: 340 }}>
            Club de badminton loisir de Caulnes — association loi 1901.<br />
            Complexe sportif Léon Pellan, 22350 Caulnes.
          </p>
          <div className="a-footer__social">
            <a href={c.facebook} target="_blank" rel="noopener" aria-label="Facebook"><IconFacebook size={18} /></a>
            <a href={c.instagram} target="_blank" rel="noopener" aria-label="Instagram"><IconInstagram size={18} /></a>
          </div>
        </div>
        <div>
          <h5>Le site</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <li><a onClick={() => setPage("home")}>Accueil</a></li>
            <li><a onClick={() => setPage("agenda")}>Agenda</a></li>
            <li><a onClick={() => setPage("training")}>Créneaux</a></li>
            <li><a onClick={() => setPage("contact")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Nous suivre</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <li><a href={c.facebook} target="_blank" rel="noopener">Facebook</a></li>
            <li><a href={c.instagram} target="_blank" rel="noopener">Instagram</a></li>
            <li><a href={"mailto:" + c.email}>{c.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="a-footer__strip">
        <span>© 2026 BadinCaulnes · Association loi 1901</span>
        <span>Caulnes, Côtes-d'Armor</span>
      </div>
    </footer>
  );
}

/* -----------------------------------------------------------------
   App root
----------------------------------------------------------------- */
function App() {
  const [page, setPage] = useState("home");
  const events = D.events || [];

  return (
    <div className="a-app" data-screen-label={"BadinCaulnes · " + (PAGES.find(p => p[0] === page)?.[1] || page)}>
      <TopBar page={page} setPage={setPage} />
      {page === "home"     && <HomePage     events={events} setPage={setPage} />}
      {page === "agenda"   && <AgendaPage   events={events} />}
      {page === "training" && <TrainingPage />}
      {page === "contact"  && <ContactPage />}
      <Footer setPage={setPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
