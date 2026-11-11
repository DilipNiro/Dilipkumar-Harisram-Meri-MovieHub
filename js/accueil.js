// charge et affiche les films populaires sur la page d'accueil
async function initAccueil() {
    const conteneur = document.getElementById('films-vedette');
    if (!conteneur) return;

    try {
        const data = await obtenirFilmsPopulaires();
        const films = data.results.slice(0, 8); // juste les 8 premiers sur la home
        const filmsParId = Object.fromEntries(films.map((f) => [f.id, f]));
        afficherFilms(films, conteneur, filmsParId);
    } catch (erreur) {
        conteneur.innerHTML = '<p class="erreur">Impossible de charger les films (vérifiez votre clé API dans js/api.js).</p>';
        console.error(erreur);
    }
}

document.addEventListener('DOMContentLoaded', initAccueil);