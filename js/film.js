// construit et injecte le HTML du détail d'un film
function afficherDetailFilm(film, conteneur) {
  const favori = estFavori(film.id);
  const genres = (film.genres || []).map((g) => g.name).join(', ');

  conteneur.innerHTML = `
    <div class="detail-affiche">
      <img src="${urlAffiche(film.poster_path, 'w780')}" alt="Affiche de ${film.title}">
    </div>
    <div class="detail-infos">
      <h1>${film.title}</h1>
      <p class="meta">${film.release_date || ''} · ${genres} · ${film.runtime || '?'} min</p>
      <p class="note">⭐ ${film.vote_average ? film.vote_average.toFixed(1) : 'N/A'} / 10</p>
      <p class="synopsis">${film.overview || 'Aucun synopsis disponible.'}</p>
      <button id="bouton-favori-detail" class="bouton-favori-large ${favori ? 'actif' : ''}">
        ${favori ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris'}
      </button>
    </div>`;

  const bouton = document.getElementById('bouton-favori-detail');
  bouton.addEventListener('click', () => {
    // on garde que les champs utiles pour une carte, pas tout l'objet TMDB
    const estAjoute = basculerFavori({
      id: film.id,
      title: film.title,
      poster_path: film.poster_path,
      release_date: film.release_date,
      vote_average: film.vote_average,
    });
    bouton.classList.toggle('actif', estAjoute);
    bouton.textContent = estAjoute ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris';
    document.dispatchEvent(new CustomEvent('favoris-modifie'));
  });
}

// récupère l'id du film dans l'url et charge ses détails
async function initFilmDetail() {
  const conteneur = document.getElementById('detail-film');
  if (!conteneur) return;

  const id = Number(new URLSearchParams(window.location.search).get('id')); // récupère le ?id=... de l'url
  if (!id) {
    conteneur.innerHTML = '<p class="erreur">Film introuvable.</p>';
    return;
  }

  try {
    const film = await obtenirDetailsFilm(id);
    afficherDetailFilm(film, conteneur);
  } catch (erreur) {
    conteneur.innerHTML = '<p class="erreur">Impossible de charger ce film.</p>';
    console.error(erreur);
  }
}

document.addEventListener('DOMContentLoaded', initFilmDetail);
