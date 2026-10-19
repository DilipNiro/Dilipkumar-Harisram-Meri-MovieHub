# MovieHub — Projet TI504N / TI504NB

Site HTML5 / CSS3 / JavaScript vanilla (aucun framework) permettant de rechercher des
films via l'API [TMDB](https://www.themoviedb.org), de consulter leurs détails et de
les ajouter à une liste de favoris stockée en `localStorage`.

## Mise en route

1. Crée un compte gratuit et récupère une clé API sur
   https://www.themoviedb.org/settings/api
2. Remplace `VOTRE_CLE_API_TMDB` dans `js/api.js` par ta clé.
3. Lance un serveur local **à la racine du projet** (obligatoire : le header/footer
   et les appels à l'API utilisent `fetch`, qui est bloqué en `file://`) :
   - VS Code : extension "Live Server" → clic droit sur `index.html` → *Open with
     Live Server*.
   - ou en terminal : `python3 -m http.server 5500`
4. Ouvre `http://localhost:5500`.

## Structure

```
index.html              Accueil
pages/apropos.html      À propos / équipe
pages/catalogue.html    Recherche de films
pages/film.html         Détail d'un film (?id=...)
pages/favoris.html      Films favoris
partials/               Header et footer injectés en JS
css/                    style.css (global) + un fichier par page
js/
  api.js                Appels à l'API TMDB
  favorisStore.js        Gestion des favoris (localStorage)
  ui.js                  Rendu des cartes de films (partagé)
  headerFooter.js         Injection du header/footer + menu mobile
  accueil.js / catalogue.js / film.js / favorisPage.js   Scripts par page
img/placeholder.svg      Affiche de secours si poster manquant
```

## Remarques

- Les liens et chemins de fichiers sont en racine absolue (`/css/style.css`,
  `/pages/catalogue.html`, etc.) : le site doit être servi depuis la racine du
  dossier. En cas de déploiement GitHub Pages en sous-dossier
  (`utilisateur.github.io/depot/`), adapter les chemins.
- Penser à valider chaque page avec le validateur W3C HTML et CSS avant le rendu.
- Compléter `pages/apropos.html` avec les vrais membres de l'équipe.
