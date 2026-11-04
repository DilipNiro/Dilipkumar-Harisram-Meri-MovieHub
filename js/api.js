const TMDB_API_KEY = 'VOTRE_CLE_API_TMDB';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// recherche des films par mot-clé
async function rechercherFilms(requete, page = 1) {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(requete)}&page=${page}`;
  const reponse = await fetch(url);
  if (!reponse.ok) throw new Error(`Erreur API (${reponse.status})`); // fetch() throw pas tout seul sur un 404/500
  return reponse.json();
}

// films populaires du moment, utilisé sur l'accueil et le catalogue par défaut
async function obtenirFilmsPopulaires(page = 1) {
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;
  const reponse = await fetch(url);
  if (!reponse.ok) throw new Error(`Erreur API (${reponse.status})`);
  return reponse.json();
}

// infos complètes d'un film (synopsis, durée, genres...)
async function obtenirDetailsFilm(id) {
  const url = `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`;
  const reponse = await fetch(url);
  if (!reponse.ok) throw new Error(`Erreur API (${reponse.status})`);
  return reponse.json();
}

// TMDB renvoie juste un chemin ("/abc.jpg"), faut le préfixer avec leur CDN d'images
function urlAffiche(chemin, taille = 'w500') {
  return chemin ? `https://image.tmdb.org/t/p/${taille}${chemin}` : '/img/placeholder.svg';
}
