// fetch() sur un fichier local marche pas en ouvrant juste le HTML (file://),
// faut un serveur local (Live Server, python -m http.server...)

// va chercher un fragment HTML et l'injecte dans l'élément ciblé
async function chargerPartial(url, idPlaceholder) {
    try {
        const reponse = await fetch(url);
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
        document.getElementById(idPlaceholder).innerHTML = await reponse.text();
    } catch (erreur) {
        console.error(`Impossible de charger ${url}`, erreur);
    }
}

// surligne le lien de la page courante dans le menu
function marquerPageActive() {
    const page = document.body.dataset.page;
    if (!page) return;
    const lien = document.querySelector(`nav a[data-page="${page}"]`);
    if (lien) lien.classList.add('active');
}

// ouvre/ferme le menu burger en mobile
function initMenuMobile() {
    const bouton = document.getElementById('navToggle');
    const nav = document.querySelector('.main-nav');
    if (!bouton || !nav) return;
    bouton.addEventListener('click', () => {
        const ouvert = nav.classList.toggle('open');
        bouton.setAttribute('aria-expanded', ouvert);
    });
}

// charge le header et le footer, puis initialise le menu
async function initHeaderFooter() {
    await Promise.all([
        chargerPartial('/partials/header.html', 'header-placeholder'),
        chargerPartial('/partials/footer.html', 'footer-placeholder'),
    ]);
    marquerPageActive();
    initMenuMobile();
}

document.addEventListener('DOMContentLoaded', initHeaderFooter);