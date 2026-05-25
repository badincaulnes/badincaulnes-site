// Shared static content for the BadinCaulnes site.
// News and events are loaded separately at runtime from /content/*.json
// (which is where the Decap CMS publishes).
window.BC_DATA = {
  club: {
    name: "BadinCaulnes",
    short: "BC",
    tagline: "Le club de badminton de Caulnes",
    city: "Caulnes",
    department: "Côtes-d'Armor",
    founded: 2008,
    members: 43,
    courts: 7,
    venue: {
      name: "Complexe sportif Léon Pellan",
      address: "Rue de la Hutte aux Renards, 22350 Caulnes",
      hours: "Lundi · Jeudi · Dimanche",
    },
    contact: {
      email: "contact@badincaulnes.fr",
      phone: "+33 2 96 88 51 04",
      facebook: "badincaulnes",
      instagram: "@badincaulnes",
    },
    season: "2025 – 2026",
  },

  // Stats for hero / about
  stats: [
    { value: "43",  label: "Licenciés"        },
    { value: "7",   label: "Terrains"         },
  ],

  team: [
    { name: "Hélène Marchand",  role: "Présidente",       since: "2022", initials: "HM", tone: "primary" },
    { name: "Karim Benoît",      role: "Vice-président",   since: "2024", initials: "KB", tone: "info" },
    { name: "Pauline Riou",      role: "Trésorière",       since: "2023", initials: "PR", tone: "success" },
    { name: "Mathilde Le Goff",  role: "Responsable jeunes (BE2)", since: "2020", initials: "ML", tone: "warning" },
    { name: "Yann Tanguy",       role: "Capitaine équipe 1", since: "2021", initials: "YT", tone: "primary" },
    { name: "Sophie Quéré",      role: "Secrétaire",       since: "2024", initials: "SQ", tone: "info" },
  ],

  slots: [
    { day: "Lundi",    start: "19:00", end: "22:00", level: "Loisir adulte",                       coach: "Encadrement bénévole", courts: 7, tone: "info"    },
    { day: "Jeudi",    start: "19:00", end: "22:00", level: "Loisir adulte",                       coach: "Animateur OIS de 19:30 à 20:30", courts: 7, tone: "primary" },
    { day: "Dimanche", start: "10:00", end: "12:00", level: "Loisir — séance dominicale",           coach: "Encadrement bénévole", courts: 7, tone: "warning" },
  ],

  pricing: [
    {
      id: "p1",
      title: "Cotisation Loisir",
      sub: "Adulte — saison complète",
      price: 50,
      tone: "primary",
      perks: [
        "Accès aux 3 séances de la semaine",
        "Prêt de raquette pour les premières séances",
        "Tarif réduit à 25 € à partir de la mi-saison",
      ],
      cta: "S'inscrire",
      featured: true,
    },
  ],

  gallery: [
    { id: "g1", caption: "Finale du tournoi interne 2025",      tone: "primary"  },
    { id: "g2", caption: "Stage jeunes — vacances de printemps", tone: "success"  },
    { id: "g3", caption: "Interclubs vs Lannion",                tone: "info"     },
    { id: "g4", caption: "Forum des associations 2025",          tone: "warning"  },
    { id: "g5", caption: "Soirée club — décembre",                tone: "neutral"  },
    { id: "g6", caption: "Demi-finale double mixte",              tone: "primary"  },
    { id: "g7", caption: "Initiation parents-enfants",            tone: "success"  },
    { id: "g8", caption: "Tournoi régional — Dinan",              tone: "info"     },
    { id: "g9", caption: "L'équipe 1, saison 2025-2026",          tone: "primary"  },
  ],

  faq: [
    { q: "Faut-il son propre matériel ?",
      a: "Non, le club prête raquettes et volants pour les premières séances. N'hésitez pas à venir essayer." },
    { q: "Y a-t-il un tarif réduit en cours de saison ?",
      a: "Oui — à partir de la mi-saison, la cotisation passe de 50 € à 25 €. Idéal si vous voulez nous rejoindre en cours d'année." },
    { q: "Puis-je venir essayer avant de m'inscrire ?",
      a: "Oui, la première séance est libre et gratuite. Passez simplement à l'un des créneaux de la semaine, le matériel est prêté." },
    { q: "Le club organise-t-il des tournois ?",
      a: "Oui, nous organisons un tournoi interne en fin de saison et plusieurs séances conviviales tout au long de l'année." },
  ],

  // News and events are loaded asynchronously — see content-loader.js
  news: [],
  events: [],
};
