const CLE_STOCKAGE = 'moviehub_favoris';

// lit la liste des favoris stockée en localStorage
function obtenirFavoris() {
  try {
    const donnees = localStorage.getItem(CLE_STOCKAGE);
    return donnees ? JSON.parse(donnees) : [];
  } catch (erreur) {
    console.error('Lecture des favoris impossible', erreur);
    return [];
  }
}

// vérifie si un film est déjà en favori
function estFavori(id) {
  return obtenirFavoris().some((film) => film.id === id);
}

// ajoute un film aux favoris (pas de doublon)
function ajouterFavori(film) {
  const favoris = obtenirFavoris();
  if (favoris.some((f) => f.id === film.id)) return;
  favoris.push(film);
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
}

// retire un film des favoris
function retirerFavori(id) {
  const favoris = obtenirFavoris().filter((film) => film.id !== id);
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(favoris));
}

// true si ajouté, false si retiré
function basculerFavori(film) {
  if (estFavori(film.id)) {
    retirerFavori(film.id);
    return false;
  }
  ajouterFavori(film);
  return true;
}
