# BadinCaulnes — site internet du club

Site statique HTML/CSS/JS du club de badminton de Caulnes.
Édition des actualités et de l'agenda via Decap CMS, hébergé gratuitement sur Netlify.

## Pour modifier le contenu

### Le plus simple : via l'interface Decap CMS
Une fois le site déployé sur Netlify, les bénévoles autorisés peuvent
publier en se connectant sur **`votresite.netlify.app/admin/`**.

### Pour les contenus "statiques" (présentation du club, équipe, tarifs, etc.)
Éditer le fichier `data.js` à la racine du projet, puis re-pousser sur GitHub.

| Fichier | Contenu |
|---|---|
| `data.js` | Infos du club, statistiques, équipe, créneaux, tarifs, FAQ |
| `content/news.json` | Liste des actualités (gérée par le CMS) |
| `content/events.json` | Liste des événements à venir (gérée par le CMS) |

## Architecture

- `index.html` — page d'accueil (charge le site dans un iframe)
- `directions/direction-a.html` — application React principale (toutes les pages)
- `directions/app-a.jsx` — code des pages
- `directions/shared-bits.jsx` — composants partagés
- `ds/` — design system (ODS OVHcloud) + charte BadinCaulnes
- `assets/` — logos, images
- `admin/` — interface CMS (Decap)
- `content/` — données éditables via le CMS
- `netlify.toml` — config Netlify

## Mise en ligne

Voir le guide pas-à-pas envoyé séparément. En résumé :
1. Pousser le code sur GitHub
2. Importer le dépôt dans Netlify
3. Activer Netlify Identity + Git Gateway
4. Inviter les bénévoles par email
