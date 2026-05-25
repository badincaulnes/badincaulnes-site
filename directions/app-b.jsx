// Direction B — Communauté & éditorial
// Same data, very different vocabulary: masthead, magazine grid, drop caps,
// quote pull-outs, two columns of running text.

const { useState } = React;
const D = window.BC_DATA;

const B_PAGES = [
  ["home",     "Accueil"],
  ["news",     "Le journal"],
  ["agenda",   "Agenda"],
  ["about",    "Le club"],
  ["training", "Créneaux"],
  ["pricing",  "Tarifs"],
  ["gallery",  "Galerie"],
  ["contact",  "Contact"],
];

/* -----------------------------------------------------------------
   Top — Masthead
----------------------------------------------------------------- */
function BTopBar({ page, setPage }) {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <header className="b-topbar">
      <div className="b-mast">
        <div className="b-mast-meta">{today.charAt(0).toUpperCase() + today.slice(1)} — Caulnes, Côtes-d'Armor</div>
        <div className="b-mast-logo" onClick={() => setPage("home")}>
          <span className="b-mast-mark"><img src={LOGO_SRC} alt="" /></span>
          <span>
            <span className="b-mast-logo-name">Badin<CaulnesWord>Caulnes</CaulnesWord></span>
            <span className="b-mast-logo-sub">Le journal du club</span>
          </span>
        </div>
        <div className="b-mast-meta b-mast-meta--right">Numéro 18 · Saison 25 / 26</div>
      </div>
      <nav className="b-nav">
        {B_PAGES.map(([k, label]) => (
          <button key={k} aria-current={page === k ? "page" : undefined} onClick={() => setPage(k)}>
            {label}
          </button>
        ))}
        <button onClick={() => setPage("admin")} aria-current={page === "admin" ? "page" : undefined} style={{ color: 'var(--b-accent)' }}>
          Espace bureau
        </button>
      </nav>
    </header>
  );
}

/* -----------------------------------------------------------------
   PAGE — Home
----------------------------------------------------------------- */
function BHomePage({ news, events, setPage }) {
  return (
    <>
      <section className="b-hero">
        <div>
          <div className="b-hero-meta">
            <span className="b-hero-meta-num">Édition 18</span>
            <span>Mai 2026</span>
          </div>
          <h1>
            Un club,<br />
            six terrains,<br />
            <em>cent quarante-deux histoires</em>.
          </h1>
          <p className="b-hero-lead">
            Depuis 2008, BadinCaulnes fait du badminton un prétexte pour bien d'autres choses :
            se retrouver le vendredi soir, transmettre quelque chose aux plus jeunes, voyager
            le week-end en interclubs. Voici le club.
          </p>
          <div className="b-hero-ctas">
            <button className="ods-btn ods-btn--md" onClick={() => setPage("pricing")}>
              Rejoindre le club
            </button>
            <button className="b-link-arrow" onClick={() => setPage("agenda")}>
              Ou voir l'agenda <i className="ods-icon ods-icon--arrow-right"></i>
            </button>
          </div>
          <div className="b-hero-byline">
            <div className="b-byline-av">HM</div>
            <div className="b-byline-meta">
              <b>Hélène Marchand</b><br />
              Présidente du club, en poste depuis 2022
            </div>
          </div>
        </div>
        <div className="b-hero-art">
          <PhotoTile tone="primary" caption={null} height="100%" />
          <div className="b-caption">Finale du tournoi interne, juin 2025 — au premier plan : Yann Tanguy et Mathilde Le Goff.</div>
        </div>
      </section>

      <div className="b-issue">
        <span>À la une — semaine 20</span>
        <span>↓ Trois articles</span>
      </div>

      <section className="b-section">
        <div className="b-articles">
          {news.slice(0, 3).map((n, i) => (
            <article key={n.id} className={"b-article" + (i === 0 ? " b-article--feature" : "")}>
              <div className="b-article__photo"><PhotoTile tone={n.categoryTone} caption={null} height="100%" /></div>
              <div className={"b-article__cat b-article__cat--" + n.categoryTone}>{n.category} · {n.date}</div>
              <h3 className="b-article__title">{n.title}</h3>
              <p className="b-article__excerpt">{n.excerpt}</p>
              <div className="b-article__byline">par {n.author}</div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
          <button className="b-link-arrow" onClick={() => setPage("news")}>
            Lire toutes les chroniques <i className="ods-icon ods-icon--arrow-right"></i>
          </button>
        </div>
      </section>

      <div className="b-rule"></div>

      <section className="b-section b-section--paper">
        <div className="b-carnet">
          <div>
            <div className="b-eyebrow-b">Carnet de bord</div>
            <h2 className="b-display" style={{ marginTop: 16, fontSize: 48 }}>
              Ce qui<br />nous attend.
            </h2>
            <p className="b-lead" style={{ marginTop: 16 }}>
              Six rendez-vous d'ici la fin de la saison. Les portes ouvertes du 14 juin sont
              ouvertes aux non-licenciés — n'hésitez pas à passer.
            </p>
            <div style={{ marginTop: 24 }}>
              <button className="b-link-arrow" onClick={() => setPage("agenda")}>
                L'agenda complet <i className="ods-icon ods-icon--arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="b-carnet-list">
            {events.slice(0, 4).map(e => (
              <div key={e.id} className="b-carnet-item">
                <div className="b-carnet-date">
                  {e.date.d}
                  <small>{e.date.m}</small>
                </div>
                <div className="b-carnet-info">
                  <h3>{e.title}</h3>
                  <div className="meta">{e.time} · {e.place}</div>
                  <p>{e.description}</p>
                </div>
                <span className="b-carnet-kind">{e.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="b-section b-section--narrow" style={{ borderTop: '1px solid var(--ods-color-neutral-200)' }}>
        <div className="b-quote-wrap">
          <div className="b-byline-av" style={{ width: 180, height: 180, fontSize: 64, borderRadius: '50%' }}>YT</div>
          <div>
            <div className="b-eyebrow-b" style={{ marginBottom: 20 }}>Portrait</div>
            <blockquote className="b-quote">
              On vient pour jouer.<br />
              On reste pour <em>les copains</em>.
            </blockquote>
            <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, color: 'var(--ods-color-neutral-700)' }}>
              Yann Tanguy joue à BadinCaulnes depuis 2014. Capitaine de l'équipe 1 depuis quatre saisons,
              il a vu le club doubler ses effectifs et accueillir sa première école de jeunes.
            </p>
            <div className="b-quote-attribution">
              Yann Tanguy <span>· Capitaine équipe 1 · membre depuis 2014</span>
            </div>
          </div>
        </div>
      </section>

      <div className="b-rule"></div>

      <section className="b-section">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div className="b-eyebrow-b">Rejoindre le club</div>
            <h2 className="b-display" style={{ marginTop: 16, fontSize: 48 }}>Quatre formules.</h2>
          </div>
          <p style={{ maxWidth: 380, fontSize: 15, lineHeight: 1.55, color: 'var(--ods-color-neutral-700)' }}>
            La licence FFBaD est incluse dans tous les tarifs. Possibilité de régler en 1, 2 ou 3 fois
            sans frais. Pass'Sport et coupons sport acceptés.
          </p>
        </div>
        <div className="b-pricing">
          {D.pricing.map(p => <BPrice key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}

function BPrice({ p }) {
  return (
    <div className={"b-price" + (p.featured ? " b-price--featured" : "")}>
      {p.featured && <span className="b-price-ribbon"></span>}
      {p.featured && <span className="b-price-tag">Recommandé</span>}
      <div>
        <h3>{p.title}</h3>
        <div className="sub">{p.sub}</div>
      </div>
      <div className="price">{p.price}€ <small>/ an</small></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
        {p.perks.map((perk, i) => <span key={i} className="perk">{perk}</span>)}
      </div>
      <button className="ods-btn ods-btn--sm ods-btn--primary-outline" style={{ marginTop: 'auto' }}>
        {p.cta}
      </button>
    </div>
  );
}

/* -----------------------------------------------------------------
   PAGE — News (journal)
----------------------------------------------------------------- */
function BNewsPage({ news }) {
  const [filter, setFilter] = useState("Tous");
  const cats = ["Tous", ...Array.from(new Set(news.map(n => n.category)))];
  const filtered = filter === "Tous" ? news : news.filter(n => n.category === filter);
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Le journal — chroniques du club</div>
        <h1>Le journal de <em>BadinCaulnes</em>.</h1>
        <p>Compétitions, vie du club, vie pratique. Toutes les semaines, un compte-rendu de ce qui se passe au gymnase Léon Pellan, écrit par les bénévoles du bureau.</p>
      </section>
      <section className="b-section">
        <div style={{ display:'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} className={"b-pill" + (filter === c ? " is-active" : "")} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56 }}>
          {filtered.map(n => (
            <article key={n.id} className="b-article">
              <div className="b-article__photo" style={{ height: 240 }}><PhotoTile tone={n.categoryTone} caption={null} height="100%" /></div>
              <div className={"b-article__cat b-article__cat--" + n.categoryTone}>{n.category} · {n.date}</div>
              <h3 className="b-article__title">{n.title}</h3>
              <p className="b-article__excerpt">{n.excerpt}</p>
              <div className="b-article__byline">par {n.author} · {n.reads} lectures</div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Agenda
----------------------------------------------------------------- */
function BAgendaPage({ events }) {
  const [kindFilter, setKindFilter] = useState("Tous");
  const kinds = ["Tous", ...Array.from(new Set(events.map(e => e.kind)))];
  const filtered = kindFilter === "Tous" ? events : events.filter(e => e.kind === kindFilter);
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Agenda — saison 2025 / 26</div>
        <h1>Le carnet des <em>prochains rendez-vous</em>.</h1>
        <p>Tournois, interclubs, événements festifs : tout ce qui anime le club d'ici à la fin de saison. Les portes ouvertes sont accessibles aux non-licenciés.</p>
      </section>
      <section className="b-section">
        <div style={{ display:'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display:'flex', gap: 10, flexWrap: 'wrap' }}>
            {kinds.map(k => (
              <button key={k} className={"b-pill" + (kindFilter === k ? " is-active" : "")} onClick={() => setKindFilter(k)}>{k}</button>
            ))}
          </div>
          <button className="b-link-arrow">
            <i className="ods-icon ods-icon--download"></i> Exporter au format .ics
          </button>
        </div>
        <div className="b-carnet-list" style={{ borderTop: '2px solid var(--b-rule)' }}>
          {filtered.map(e => (
            <div key={e.id} className="b-carnet-item" style={{ gridTemplateColumns: '100px 1fr 200px auto' }}>
              <div className="b-carnet-date">
                {e.date.d}<small>{e.date.m}</small>
              </div>
              <div className="b-carnet-info">
                <h3>{e.title}</h3>
                <div className="meta">{e.time} · {e.place}</div>
                <p>{e.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
                {e.capacity > 0 && <>
                  <div style={{ fontSize: 11, color: 'var(--ods-color-neutral-600)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                    {e.participants} / {e.capacity} inscrits
                  </div>
                  <CapacityBar value={e.participants} max={e.capacity} />
                </>}
              </div>
              <span className="b-carnet-kind">{e.kind}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — About
----------------------------------------------------------------- */
function BAboutPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Le club — saison 2025 / 26</div>
        <h1>Histoire d'un club <em>du bout du monde</em>.</h1>
        <p>BadinCaulnes a 18 ans cette année. Voici comment on est passés de six joueurs et une salle annexe à six terrains pleins quatre soirs par semaine.</p>
      </section>

      <section className="b-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'flex-start' }}>
          <div>
            <PhotoTile tone="primary" caption="Première saison du club — septembre 2008" height={500} />
          </div>
          <div>
            <div className="b-eyebrow-b">L'histoire</div>
            <h2 className="b-display" style={{ marginTop: 16, fontSize: 44 }}>De six joueurs <em style={{ color: 'var(--b-accent)', fontStyle: 'italic', fontWeight: 400 }}>à six terrains pleins</em>.</h2>
            <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.65 }} className="b-drop">
              Tout a commencé en 2008, dans la petite salle annexe du complexe sportif Léon Pellan, avec six amis,
              deux poteaux et quatre raquettes prêtées. Le club s'appelait alors « les Volants caulnais ».
            </p>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65 }}>
              Dix-huit ans plus tard, BadinCaulnes déploie ses six terrains tous les soirs de semaine
              (sauf le mardi et le jeudi), accueille une école de jeunes labellisée FFBaD, et fait vivre
              deux équipes en interclubs régional. Ce qui n'a pas changé : on s'y retrouve d'abord
              pour le plaisir de jouer ensemble.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--ods-color-neutral-200)' }}>
              <div>
                <div className="b-stat-num-light">2008</div>
                <div style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)', marginTop: 4, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Année de création</div>
              </div>
              <div>
                <div className="b-stat-num-light">142</div>
                <div style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)', marginTop: 4, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Licenciés en 25/26</div>
              </div>
              <div>
                <div className="b-stat-num-light">2</div>
                <div style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)', marginTop: 4, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Équipes interclubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="b-rule"></div>

      <section className="b-section b-section--paper">
        <div className="b-eyebrow-b">Les bénévoles</div>
        <h2 className="b-display" style={{ marginTop: 16, fontSize: 44, marginBottom: 56 }}>L'équipe qui fait <em style={{ color: 'var(--b-accent)', fontStyle: 'italic', fontWeight: 400 }}>tourner</em> le club.</h2>
        <div className="b-team">
          {D.team.map((m, i) => (
            <div key={i} className="b-team-card">
              <div className="b-team-av">{m.initials}</div>
              <div className="b-team-info">
                <h4>{m.name}</h4>
                <div className="b-team-role">{m.role}</div>
                <div className="b-team-since">au club depuis {m.since}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="b-section b-section--narrow">
        <div className="b-eyebrow-b">Questions fréquentes</div>
        <h2 className="b-display" style={{ marginTop: 16, fontSize: 36, marginBottom: 40 }}>Avant de venir.</h2>
        <div className="ods-accordion" style={{ borderTop: '2px solid var(--b-rule)' }}>
          {D.faq.map((f, i) => (
            <div key={i} className={"ods-accordion__item" + (open === i ? " ods-accordion__item--open" : "")}>
              <button className="ods-accordion__trigger" onClick={() => setOpen(open === i ? -1 : i)} style={{ padding: '20px 0' }}>
                {f.q}
                <i className="ods-icon ods-icon--chevron-down"></i>
              </button>
              <div className="ods-accordion__content" style={{ padding: '0 0 20px', fontSize: 15, lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Training
----------------------------------------------------------------- */
function BTrainingPage() {
  const catLabel = (tone) => tone === 'success' ? 'Jeunes' : tone === 'info' ? 'Loisir' : tone === 'primary' ? 'Compétition' : 'Famille';
  const catBg = (tone) => ({
    success: { background: 'var(--ods-color-success-100)', color: 'var(--ods-color-success-800)' },
    info:    { background: 'var(--ods-color-primary-050)', color: 'var(--b-deep)' },
    primary: { background: 'var(--ods-color-primary-100)', color: 'var(--ods-color-primary-800)' },
    warning: { background: 'var(--ods-color-warning-100)', color: 'var(--ods-color-warning-800)' },
  })[tone];
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Pratique — créneaux d'entraînement</div>
        <h1>Quand <em>jouer</em>, et avec qui.</h1>
        <p>Quatre soirs par semaine plus le samedi matin. Sept créneaux, six terrains chacun, et un encadrement pour les jeunes et les compétiteurs.</p>
      </section>
      <section className="b-section">
        <div className="b-schedule">
          <div className="b-schedule-head">
            <span>Jour</span>
            <span>Horaire</span>
            <span>Public</span>
            <span>Encadrement</span>
            <span style={{ textAlign: 'center' }}>Cat.</span>
          </div>
          {D.slots.map((s, i) => (
            <div key={i} className="b-schedule-row">
              <span className="b-schedule-day">{s.day}</span>
              <span className="b-schedule-time">{s.start} → {s.end}</span>
              <span className="b-schedule-level">
                {s.level}
                <em>{s.courts}/6 terrains réservés</em>
              </span>
              <span className="b-schedule-coach">{s.coach}</span>
              <span className="b-schedule-cat" style={catBg(s.tone)}>{catLabel(s.tone)}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 40, fontSize: 15, lineHeight: 1.6, maxWidth: 720, color: 'var(--ods-color-neutral-700)', fontStyle: 'italic' }}>
          Un mot du bureau — en cas d'affluence sur les créneaux loisir, les terrains tournent toutes
          les dix minutes : pensez à inscrire votre paire sur le tableau à l'entrée.
        </p>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Pricing
----------------------------------------------------------------- */
function BPricingPage() {
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Pratique — tarifs et inscription</div>
        <h1>Quatre formules, <em>une seule passion</em>.</h1>
        <p>Les tarifs incluent la licence FFBaD et l'assurance fédérale. Paiement en 1, 2 ou 3 fois sans frais — Pass'Sport et coupons ANCV bienvenus.</p>
      </section>
      <section className="b-section">
        <div className="b-pricing">
          {D.pricing.map(p => <BPrice key={p.id} p={p} />)}
        </div>

        <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <div className="b-eyebrow-b">La marche à suivre</div>
            <h2 className="b-display" style={{ marginTop: 16, fontSize: 36 }}>Trois étapes,<br />dix minutes.</h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24, borderLeft: '2px solid var(--ods-color-neutral-200)' }}>
              {[
                ["01", "Le dossier d'inscription", "Téléchargez et complétez le formulaire FFBaD (1 page recto-verso)."],
                ["02", "Le certificat médical", "Obligatoire pour les compétiteurs. Pour les autres, le questionnaire santé suffit."],
                ["03", "Le dépôt", "Au gymnase un soir d'entraînement ou par voie postale. Règlement par chèque, espèces ou virement."],
              ].map(([n, title, t]) => (
                <li key={n} style={{ paddingLeft: 24, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: -2, top: 0, width: 4, height: 4, borderRadius: 50, background: 'var(--b-accent)', transform: 'translateX(-1px)' }}></span>
                  <div style={{ fontSize: 11, color: 'var(--b-accent)', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>Étape {n}</div>
                  <h4 style={{ marginTop: 4, fontSize: 18, color: 'var(--ods-color-primary-800)', fontWeight: 700 }}>{title}</h4>
                  <p style={{ marginTop: 6, fontSize: 15, lineHeight: 1.55, color: 'var(--ods-color-neutral-700)' }}>{t}</p>
                </li>
              ))}
            </ol>
            <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
              <button className="ods-btn ods-btn--md">
                <i className="ods-icon ods-icon--download"></i> Dossier (.pdf)
              </button>
              <button className="ods-btn ods-btn--md ods-btn--primary-outline">Questionnaire santé</button>
            </div>
          </div>

          <div style={{ background: 'var(--b-paper)', padding: 40 }}>
            <div className="b-eyebrow-b">Le mot du bureau</div>
            <p style={{ marginTop: 16, fontSize: 19, lineHeight: 1.6, color: 'var(--ods-color-primary-800)' }} className="b-drop">
              Si jamais le tarif est un frein, n'hésitez pas à nous écrire en confidence. Le club a une enveloppe
              annuelle pour aider les familles à boucler le budget licence. C'est l'esprit de la maison.
            </p>
            <div style={{ marginTop: 24, fontSize: 13, color: 'var(--ods-color-neutral-700)', fontStyle: 'italic' }}>
              — Le bureau de BadinCaulnes
            </div>
            <hr style={{ border: 0, borderTop: '1px solid var(--ods-color-neutral-200)', margin: '32px 0' }} />
            <div className="b-eyebrow-b">Pass'Sport & ANCV</div>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: 'var(--ods-color-neutral-700)' }}>
              Le club est éligible au Pass'Sport de 70 € pour les jeunes 6-19 ans bénéficiaires. Nous acceptons aussi
              les coupons sport ANCV et les chèques vacances.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Gallery
----------------------------------------------------------------- */
function BGalleryPage() {
  const tiles = D.gallery;
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Galerie — souvenirs</div>
        <h1>La <em>mémoire</em> du club, en images.</h1>
        <p>Tournois, stages jeunes, interclubs, soirées du club : un fragment de chaque moment, classé par saison.</p>
      </section>
      <section className="b-section" style={{ padding: '40px 0' }}>
        <div className="b-gallery">
          <div className="b-gallery-tile b-gallery-tile--tall"><PhotoTile tone={tiles[0].tone} caption={tiles[0].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[1].tone} caption={tiles[1].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[2].tone} caption={tiles[2].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[3].tone} caption={tiles[3].caption} height="100%" /></div>
          <div className="b-gallery-tile b-gallery-tile--wide"><PhotoTile tone={tiles[4].tone} caption={tiles[4].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[5].tone} caption={tiles[5].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[6].tone} caption={tiles[6].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[7].tone} caption={tiles[7].caption} height="100%" /></div>
          <div className="b-gallery-tile"><PhotoTile tone={tiles[8].tone} caption={tiles[8].caption} height="100%" /></div>
        </div>
      </section>
      <section className="b-section" style={{ paddingTop: 40 }}>
        <button className="b-link-arrow">Voir l'archive 2024 / 25 <i className="ods-icon ods-icon--arrow-right"></i></button>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Contact
----------------------------------------------------------------- */
function BContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Renseignement général', message: '' });
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="b-page-hero">
        <div className="crumb">Contact — gymnase Léon Pellan</div>
        <h1>Nous écrire, <em>venir nous voir</em>.</h1>
        <p>Le bureau répond sous 48 h en moyenne. Pour les questions urgentes, n'hésitez pas à passer un soir d'entraînement.</p>
      </section>
      <section className="b-section">
        <div className="b-contact-grid">
          <div>
            <MapMock height={460} />
            <p style={{ marginTop: 16, fontSize: 12, fontStyle: 'italic', color: 'var(--ods-color-neutral-600)' }}>
              48° 16′ 53″ N · 02° 09′ 38″ W — entrée par la rue de la Hutte aux Renards
            </p>
          </div>
          <div>
            <div className="b-contact-info-row">
              <div className="b-contact-info-label">Adresse</div>
              <div className="b-contact-info-value">
                Complexe sportif Léon Pellan<br />
                Rue de la Hutte aux Renards<br />
                22350 Caulnes
              </div>
            </div>
            <div className="b-contact-info-row">
              <div className="b-contact-info-label">Email</div>
              <div className="b-contact-info-value"><a href={"mailto:" + D.club.contact.email}>{D.club.contact.email}</a></div>
            </div>
            <div className="b-contact-info-row">
              <div className="b-contact-info-label">Téléphone</div>
              <div className="b-contact-info-value">
                <a href={"tel:" + D.club.contact.phone}>{D.club.contact.phone}</a>
                <div style={{ fontSize: 13, color: 'var(--ods-color-neutral-600)', fontStyle: 'italic', marginTop: 4 }}>Aux heures de bureau</div>
              </div>
            </div>
            <div className="b-contact-info-row">
              <div className="b-contact-info-label">Sur place</div>
              <div className="b-contact-info-value">
                {D.club.venue.hours}
                <div style={{ fontSize: 13, color: 'var(--ods-color-neutral-600)', fontStyle: 'italic', marginTop: 4 }}>Aux horaires d'entraînement</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, padding: 48, background: 'var(--b-paper)', maxWidth: 880 }}>
          <div className="b-eyebrow-b">Formulaire</div>
          <h3 style={{ fontSize: 32, marginTop: 12, marginBottom: 8, letterSpacing: '-.01em', color: 'var(--ods-color-primary-800)', fontWeight: 800 }}>Envoyez-nous un mot.</h3>
          <p style={{ fontSize: 15, color: 'var(--ods-color-neutral-700)', marginBottom: 28, lineHeight: 1.55 }}>
            Une question, une demande d'essai, un partenariat ? Le bureau répond rapidement.
          </p>
          {sent ? (
            <div className="ods-message ods-message--success">
              <i className="ods-icon ods-icon--circle-check"></i>
              <div>
                <div className="ods-message__title">Message envoyé</div>
                <p>Merci {form.name || ''} — nous reviendrons vers vous très vite.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="b-formgrid">
              <div className="ods-field">
                <label className="ods-field__label ods-field__label--required">Nom et prénom</label>
                <input className="ods-input" placeholder="Ex. Camille Tanguy" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="ods-field">
                <label className="ods-field__label ods-field__label--required">Email</label>
                <input className="ods-input" type="email" placeholder="vous@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="ods-field full">
                <label className="ods-field__label">Sujet</label>
                <select className="ods-input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                  <option>Renseignement général</option>
                  <option>Demande d'essai</option>
                  <option>Inscription saison 2026/27</option>
                  <option>Partenariat / sponsoring</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="ods-field full">
                <label className="ods-field__label ods-field__label--required">Votre message</label>
                <textarea className="ods-textarea" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              </div>
              <div className="full" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button type="button" className="ods-btn ods-btn--md ods-btn--neutral-ghost">Annuler</button>
                <button type="submit" className="ods-btn ods-btn--md">Envoyer le message<i className="ods-icon ods-icon--arrow-right"></i></button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------
   PAGE — Admin
----------------------------------------------------------------- */
function BAdminPage({ news, events, addNews, addEvent, removeNews, removeEvent }) {
  const [tab, setTab] = useState("post-news");
  return (
    <section className="b-admin">
      <div className="b-eyebrow-b">Espace bureau</div>
      <h1 className="b-display" style={{ fontSize: 36, marginTop: 16, marginBottom: 40 }}>Publication & modération.</h1>

      <div className="b-admin-shell">
        <aside className="b-admin-side">
          <h4>Publication</h4>
          <button className={tab === "post-news" ? "is-active" : ""} onClick={() => setTab("post-news")}>
            <i className="ods-icon ods-icon--pen"></i> Nouvelle actualité
          </button>
          <button className={tab === "post-event" ? "is-active" : ""} onClick={() => setTab("post-event")}>
            <i className="ods-icon ods-icon--calendar"></i> Nouvel événement
          </button>
          <h4>Modération</h4>
          <button className={tab === "manage-news" ? "is-active" : ""} onClick={() => setTab("manage-news")}>
            <i className="ods-icon ods-icon--list"></i> Actualités · {news.length}
          </button>
          <button className={tab === "manage-events" ? "is-active" : ""} onClick={() => setTab("manage-events")}>
            <i className="ods-icon ods-icon--list"></i> Agenda · {events.length}
          </button>
          <h4>Paramètres</h4>
          <button><i className="ods-icon ods-icon--cog"></i> Préférences</button>
          <button><i className="ods-icon ods-icon--user"></i> Bureau</button>

          <div style={{ marginTop: 32, padding: 16, background: '#fff', border: '1px solid var(--ods-color-neutral-200)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="b-byline-av" style={{ width: 36, height: 36, fontSize: 12 }}>HM</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--ods-color-primary-800)' }}>Hélène Marchand</div>
              <div style={{ color: 'var(--ods-color-neutral-600)' }}>Présidente · admin</div>
            </div>
          </div>
        </aside>

        <main className="b-admin-main">
          {tab === "post-news" && <BAdminNewsForm addNews={addNews} />}
          {tab === "post-event" && <BAdminEventForm addEvent={addEvent} />}
          {tab === "manage-news" && <BAdminList items={news} onDelete={removeNews} type="news" />}
          {tab === "manage-events" && <BAdminList items={events} onDelete={removeEvent} type="event" />}
        </main>
      </div>
    </section>
  );
}

function BAdminNewsForm({ addNews }) {
  const [f, setF] = useState({ title: '', excerpt: '', category: 'Compétition', author: 'Hélène M.' });
  const [posted, setPosted] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const toneMap = { 'Compétition': 'primary', 'Club': 'info', 'Jeunes': 'success', 'Pratique': 'warning' };
    addNews({
      id: 'n-' + Date.now(),
      category: f.category,
      categoryTone: toneMap[f.category] || 'info',
      date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }),
      title: f.title,
      excerpt: f.excerpt,
      author: f.author,
      reads: 0,
    });
    setPosted(true);
    setF({ title: '', excerpt: '', category: 'Compétition', author: 'Hélène M.' });
    setTimeout(() => setPosted(false), 3500);
  };
  return (
    <>
      <h2 style={{ marginBottom: 8, fontWeight: 800, letterSpacing: '-.01em' }}>Publier une actualité</h2>
      <p style={{ fontSize: 14, color: 'var(--ods-color-neutral-600)', marginBottom: 24, fontStyle: 'italic' }}>
        L'article sera visible immédiatement sur la page d'accueil et dans le journal.
      </p>
      {posted && (
        <div className="ods-message ods-message--success" style={{ marginBottom: 20 }}>
          <i className="ods-icon ods-icon--circle-check"></i>
          <div>
            <div className="ods-message__title">Actualité publiée</div>
            <p>Vous pouvez la retrouver en tête du journal.</p>
          </div>
        </div>
      )}
      <form onSubmit={submit} className="b-formgrid">
        <div className="ods-field full">
          <label className="ods-field__label ods-field__label--required">Titre</label>
          <input className="ods-input" placeholder="Ex. Victoire de l'équipe 1 à Lannion" required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Rubrique</label>
          <select className="ods-input" value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
            <option>Compétition</option>
            <option>Club</option>
            <option>Jeunes</option>
            <option>Pratique</option>
          </select>
        </div>
        <div className="ods-field">
          <label className="ods-field__label">Signature</label>
          <input className="ods-input" value={f.author} onChange={(e) => setF({ ...f, author: e.target.value })} />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label ods-field__label--required">Chapô</label>
          <textarea className="ods-textarea" rows={3} placeholder="Deux à trois phrases qui résument l'article — c'est ce qui s'affiche en aperçu sur la page d'accueil." required value={f.excerpt} onChange={(e) => setF({ ...f, excerpt: e.target.value })} />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label">Photo de couverture</label>
          <div className="ods-file-upload">
            <div className="ods-file-upload__icon"><i className="ods-icon ods-icon--cloud-upload"></i></div>
            <div className="ods-file-upload__title">Déposez une image ou cliquez pour parcourir</div>
            <div className="ods-file-upload__sub">JPG ou PNG, 5 Mo max. Format 16:9 idéal.</div>
          </div>
        </div>
        <div className="full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ods-color-neutral-600)', fontStyle: 'italic' }}>
            Brouillon enregistré il y a 1 min
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <button type="button" className="ods-btn ods-btn--md ods-btn--neutral-ghost">Brouillon</button>
            <button type="submit" className="ods-btn ods-btn--md">
              <i className="ods-icon ods-icon--check"></i> Publier
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function BAdminEventForm({ addEvent }) {
  const [f, setF] = useState({ title: '', date: '2026-06-15', time: '19:00 – 22:00', place: 'Gymnase Léon Pellan', kind: 'Tournoi', description: '', capacity: 64 });
  const [posted, setPosted] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const toneMap = { 'Tournoi': 'primary', 'Interclubs': 'info', 'Découverte': 'success', 'Convivial': 'warning', 'Officiel': 'primary' };
    const d = fmtDate(f.date);
    addEvent({
      id: 'e-' + Date.now(),
      date: d,
      time: f.time,
      title: f.title,
      place: f.place,
      kind: f.kind,
      kindTone: toneMap[f.kind] || 'info',
      participants: 0,
      capacity: parseInt(f.capacity, 10) || 0,
      description: f.description,
    });
    setPosted(true);
    setF({ ...f, title: '', description: '' });
    setTimeout(() => setPosted(false), 3500);
  };
  return (
    <>
      <h2 style={{ marginBottom: 8, fontWeight: 800, letterSpacing: '-.01em' }}>Programmer un événement</h2>
      <p style={{ fontSize: 14, color: 'var(--ods-color-neutral-600)', marginBottom: 24, fontStyle: 'italic' }}>
        L'événement apparaîtra dans l'agenda et — si la date est proche — sur la page d'accueil.
      </p>
      {posted && (
        <div className="ods-message ods-message--success" style={{ marginBottom: 20 }}>
          <i className="ods-icon ods-icon--circle-check"></i>
          <div>
            <div className="ods-message__title">Événement programmé</div>
            <p>Vous pouvez le retrouver en tête de l'agenda.</p>
          </div>
        </div>
      )}
      <form onSubmit={submit} className="b-formgrid">
        <div className="ods-field full">
          <label className="ods-field__label ods-field__label--required">Titre</label>
          <input className="ods-input" placeholder="Ex. Tournoi de doubles, soirée galette…" required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Date</label>
          <input className="ods-input" type="date" required value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
        </div>
        <div className="ods-field">
          <label className="ods-field__label ods-field__label--required">Horaire</label>
          <input className="ods-input" placeholder="19:00 – 22:00" required value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} />
        </div>
        <div className="ods-field">
          <label className="ods-field__label">Type</label>
          <select className="ods-input" value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })}>
            <option>Tournoi</option>
            <option>Interclubs</option>
            <option>Découverte</option>
            <option>Convivial</option>
            <option>Officiel</option>
          </select>
        </div>
        <div className="ods-field">
          <label className="ods-field__label">Capacité</label>
          <input className="ods-input" type="number" min="0" value={f.capacity} onChange={(e) => setF({ ...f, capacity: e.target.value })} />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label">Lieu</label>
          <input className="ods-input" value={f.place} onChange={(e) => setF({ ...f, place: e.target.value })} />
        </div>
        <div className="ods-field full">
          <label className="ods-field__label ods-field__label--required">Description</label>
          <textarea className="ods-textarea" rows={3} required value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="Détails pratiques, format, à apporter…" />
        </div>
        <div className="full ods-row">
          <input className="ods-checkbox" type="checkbox" id="b-notify" defaultChecked />
          <label htmlFor="b-notify" className="ods-check-label">Notifier les adhérents par email à la publication</label>
        </div>
        <div className="full" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button type="button" className="ods-btn ods-btn--md ods-btn--neutral-ghost">Annuler</button>
          <button type="submit" className="ods-btn ods-btn--md">
            <i className="ods-icon ods-icon--calendar"></i> Programmer
          </button>
        </div>
      </form>
    </>
  );
}

function BAdminList({ items, onDelete, type }) {
  return (
    <>
      <h2 style={{ fontWeight: 800, letterSpacing: '-.01em', marginBottom: 20 }}>
        {type === 'news' ? 'Actualités publiées' : 'Événements à venir'}
      </h2>
      <div style={{ display:'flex', flexDirection: 'column', borderTop: '1px solid var(--ods-color-neutral-200)' }}>
        {items.map((it) => (
          <div key={it.id} style={{
            display:'grid', gridTemplateColumns: type === 'event' ? '60px 1fr auto' : '1fr auto',
            gap: 20, alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid var(--ods-color-neutral-200)',
          }}>
            {type === 'event' && (
              <div className="b-carnet-date" style={{ fontSize: 24 }}>
                {it.date.d}<small style={{ fontSize: 10 }}>{it.date.m}</small>
              </div>
            )}
            <div>
              <div style={{ fontWeight: 700, color: 'var(--ods-color-primary-800)', fontSize: 16 }}>{it.title}</div>
              <div style={{ fontSize: 13, color: 'var(--ods-color-neutral-600)', marginTop: 2, fontStyle: 'italic' }}>
                {type === 'news' ? `${it.category} · ${it.date} · par ${it.author}` : `${it.kind} · ${it.time} · ${it.place}`}
              </div>
            </div>
            <div style={{ display:'flex', gap: 6 }}>
              <button className="ods-btn ods-btn--sm ods-btn--neutral-ghost"><i className="ods-icon ods-icon--pen"></i></button>
              <button className="ods-btn ods-btn--sm ods-btn--critical-ghost" onClick={() => onDelete(it.id)}><i className="ods-icon ods-icon--trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* -----------------------------------------------------------------
   Footer
----------------------------------------------------------------- */
function BFooter({ setPage }) {
  return (
    <footer className="b-footer">
      <div className="b-footer__grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span className="b-mast-mark" style={{ width: 36, height: 36 }}><img src={LOGO_SRC} alt="" /></span>
            <span className="b-mast-logo-name" style={{ fontSize: 22 }}>Badin<CaulnesWord>Caulnes</CaulnesWord></span>
          </div>
          <p style={{ color: 'var(--ods-color-neutral-700)', fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
            Club de badminton affilié à la Fédération Française de Badminton. Saison {D.club.season}.
            Association loi 1901, fondée en 2008.
          </p>
        </div>
        <div>
          <h5>Le club</h5>
          <ul>
            <li><a onClick={() => setPage("about")}>Présentation</a></li>
            <li><a onClick={() => setPage("about")}>Le bureau</a></li>
            <li><a onClick={() => setPage("training")}>Créneaux</a></li>
            <li><a onClick={() => setPage("pricing")}>Tarifs</a></li>
          </ul>
        </div>
        <div>
          <h5>Vie du club</h5>
          <ul>
            <li><a onClick={() => setPage("news")}>Le journal</a></li>
            <li><a onClick={() => setPage("agenda")}>Agenda</a></li>
            <li><a onClick={() => setPage("gallery")}>Galerie</a></li>
            <li><a onClick={() => setPage("contact")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h5>Nous écrire</h5>
          <p style={{ color: 'var(--ods-color-neutral-700)', fontSize: 14, lineHeight: 1.55 }}>
            {D.club.venue.name}<br />
            {D.club.venue.address}
          </p>
          <p style={{ color: 'var(--ods-color-neutral-700)', fontSize: 14, marginTop: 10 }}>
            <a href={"mailto:" + D.club.contact.email}>{D.club.contact.email}</a><br />
            <a href={"tel:" + D.club.contact.phone}>{D.club.contact.phone}</a>
          </p>
        </div>
      </div>
      <div className="b-footer__strip">
        <span>© 2026 BadinCaulnes — Association loi 1901</span>
        <span style={{ display: 'flex', gap: 20 }}>
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
function BApp() {
  const [page, setPage] = useState("home");
  const [news, setNews] = useState(D.news);
  const [events, setEvents] = useState(D.events);

  const addNews    = (n) => setNews(prev => [n, ...prev]);
  const removeNews = (id) => setNews(prev => prev.filter(n => n.id !== id));
  const addEvent   = (e) => setEvents(prev => [e, ...prev]);
  const removeEvent= (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const label = page === 'admin' ? 'Espace bureau' : (B_PAGES.find(p => p[0] === page)?.[1] || page);
  return (
    <div className="b-app" data-screen-label={"Direction B · " + label}>
      <BTopBar page={page} setPage={setPage} />
      {page === "home"     && <BHomePage     news={news} events={events} setPage={setPage} />}
      {page === "news"     && <BNewsPage     news={news} />}
      {page === "agenda"   && <BAgendaPage   events={events} />}
      {page === "about"    && <BAboutPage />}
      {page === "training" && <BTrainingPage />}
      {page === "pricing"  && <BPricingPage />}
      {page === "gallery"  && <BGalleryPage />}
      {page === "contact"  && <BContactPage />}
      {page === "admin"    && <BAdminPage    news={news} events={events} addNews={addNews} addEvent={addEvent} removeNews={removeNews} removeEvent={removeEvent} />}
      <BFooter setPage={setPage} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BApp />);
