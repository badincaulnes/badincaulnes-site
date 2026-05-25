// Loads /content/news.json and /content/events.json then exposes them
// via window.BC_DATA. Returns a promise the app can await before rendering.
// Works both locally (preview) and on Netlify in production — paths are
// resolved relative to THIS script's location, not to the current page.
(function () {
  const here = new URL('.', document.currentScript.src);
  const base = new URL('content/', here);

  // Map a news category to a visual "tone" used by the badges.
  const NEWS_TONES = {
    'Compétition': 'primary',
    'Club':        'info',
    'Jeunes':      'success',
    'Pratique':    'warning',
  };

  // Map an event kind to a visual tone.
  const EVENT_TONES = {
    'Tournoi':    'primary',
    'Interclubs': 'info',
    'Découverte': 'success',
    'Convivial':  'warning',
    'Officiel':   'primary',
  };

  // Build the shorthand date { d, m, iso } objects the UI expects.
  function makeShortDate(iso) {
    if (!iso) return { d: '—', m: '', iso: '' };
    const [y, m, d] = iso.split('-');
    const months = ['JAN','FÉV','MARS','AVR','MAI','JUIN','JUIL.','AOÛT','SEPT','OCT','NOV','DÉC'];
    return { d, m: months[parseInt(m, 10) - 1] || '', iso };
  }

  // Format a "2026-05-12" string into "12 mai 2026" for the news date line.
  function makeLongDate(iso) {
    if (!iso) return '';
    const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    const [y, m, d] = iso.split('-');
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  }

  function decorateNews(arr) {
    return (arr || []).map((n) => ({
      ...n,
      categoryTone: NEWS_TONES[n.category] || 'info',
      // Provide a human-readable date in case Decap stored the ISO form.
      date: n.date && n.date.match(/^\d{4}-\d{2}-\d{2}$/) ? makeLongDate(n.date) : n.date,
      reads: typeof n.reads === 'number' ? n.reads : 0,
    }));
  }

  function decorateEvents(arr) {
    return (arr || []).map((e) => ({
      ...e,
      kindTone: EVENT_TONES[e.kind] || 'info',
      // The UI needs a { d, m, iso } shape — build it from the ISO date.
      date: typeof e.date === 'string' ? makeShortDate(e.date) : (e.date || { d: '?', m: '', iso: '' }),
      participants: typeof e.participants === 'number' ? e.participants : 0,
      capacity:     typeof e.capacity     === 'number' ? e.capacity     : 0,
    }));
  }

  // Fetch, with a small fallback if the file isn't reachable yet
  // (e.g. before first publication). Decap CMS writes the file as
  // { "items": [ ... ] } so we unwrap that here.
  function loadJSON(name) {
    return fetch(new URL(name, base).toString(), { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((data) => Array.isArray(data) ? data : (data.items || []))
      .catch(() => []);
  }

  // Promise other scripts can await before rendering.
  window.BC_DATA_READY = Promise.all([
    loadJSON('news.json'),
    loadJSON('events.json'),
    loadJSON('gallery.json'),
  ]).then(([news, events, gallery]) => {
    // Sort: newest news first, soonest events first.
    const sortedNews = decorateNews(news).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    const sortedEvents = decorateEvents(events).sort((a, b) => (a.date.iso || '').localeCompare(b.date.iso || ''));
    window.BC_DATA.news = sortedNews;
    window.BC_DATA.events = sortedEvents;
    window.BC_DATA.gallery = gallery || [];
    return window.BC_DATA;
  });
})();
