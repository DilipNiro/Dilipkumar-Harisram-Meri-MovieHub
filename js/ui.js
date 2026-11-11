function creerCarteFilm(film) {
  const favori = estFavori(film.id);
  const annee = film.release_date ? film.release_date.slice(0, 4) : '';
  return `
    <article class="carte-film" data-id="${film.id}">
      <a href="/pages/film.html?id=${film.id}">
        <img src="${urlAffiche(film.poster_path)}" alt="Affiche de ${film.title}" loading="lazy">
        <h3>${film.title}</h3>
        <p class="annee">${annee}</p>
      </a>
      <button class="bouton-favori ${favori ? 'actif' : ''}" data-id="${film.id}" aria-label="Ajouter aux favoris">
        ${favori ? '♥' : '♡'}
      </button>
    </article>`;
}

// affiche une liste de films dans un conteneur, sous forme de grille de cartes
function afficherFilms(films, conteneur, filmsParId, messageVide = 'Aucun film trouvé.') {
  if (!films.length) {
    conteneur.innerHTML = `<p class="vide">${messageVide}</p>`;
    return;
  }

  conteneur.innerHTML = films.map(creerCarteFilm).join('');

  // les cartes sont recréées à chaque appel, faut réattacher les listeners
  conteneur.querySelectorAll('.bouton-favori').forEach((bouton) => {
    bouton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = Number(bouton.dataset.id);
      const film = filmsParId[id];
      const estAjoute = basculerFavori(film);
      bouton.classList.toggle('actif', estAjoute);
      bouton.textContent = estAjoute ? '♥' : '♡';
      document.dispatchEvent(new CustomEvent('favoris-modifie')); // prévient favorisPage.js
    });
  });
}