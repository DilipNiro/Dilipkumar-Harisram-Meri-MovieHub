// recharge les films populaires (état par défaut)
async function chargerPopulaires(conteneur) {
  try {
    const data = await obtenirFilmsPopulaires();
    const filmsParId = Object.fromEntries(data.results.map((f) => [f.id, f]));
    afficherFilms(data.results, conteneur, filmsParId);
  } catch (erreur) {
    conteneur.innerHTML = '<p class="erreur">Impossible de charger les films.</p>';
    console.error(erreur);
  }
}

// gère la recherche et l'affichage de la page catalogue
async function initCatalogue() {
  const formulaire = document.getElementById('form-recherche');
  const conteneur = document.getElementById('resultats');
  if (!formulaire || !conteneur) return;

  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    const requete = document.getElementById('champ-recherche').value.trim();

    if (!requete) {
      chargerPopulaires(conteneur);
      return;
    }

    try {
      const data = await rechercherFilms(requete);
      const filmsParId = Object.fromEntries(data.results.map((f) => [f.id, f]));
      afficherFilms(data.results, conteneur, filmsParId, `Aucun résultat pour "${requete}".`);
    } catch (erreur) {
      conteneur.innerHTML = '<p class="erreur">Erreur lors de la recherche.</p>';
      console.error(erreur);
    }
  });

  chargerPopulaires(conteneur);
}

document.addEventListener('DOMContentLoaded', initCatalogue);
