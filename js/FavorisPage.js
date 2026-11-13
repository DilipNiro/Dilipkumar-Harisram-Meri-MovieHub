function initFavorisPage() {
  const conteneur = document.getElementById('resultats-favoris');
  if (!conteneur) return;

  const favoris = obtenirFavoris();
  const filmsParId = Object.fromEntries(favoris.map((f) => [f.id, f]));
  afficherFilms(favoris, conteneur, filmsParId, 'Aucun favori pour le moment. Ajoutez-en depuis le catalogue !');
}

document.addEventListener('DOMContentLoaded', initFavorisPage);
document.addEventListener('favoris-modifie', initFavorisPage); // se recharge si on retire un favori ici