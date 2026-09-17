/**
 * Gestion du thème clair / sombre après le chargement de la page.
 *
 * L'application initiale est faite par theme-init.js. Ce module ne s'occupe que
 * du bouton de bascule.
 */

const CLE = 'theme';

function themeCourant() {
    return document.documentElement.classList.contains('theme-dark') ? 'sombre' : 'clair';
}

function appliquer(theme) {
    document.documentElement.classList.toggle('theme-dark', theme === 'sombre');

    try {
        window.localStorage.setItem(CLE, theme);
    } catch (e) {
        // Stockage indisponible : le thème s'appliquera quand même, mais ne
        // survivra pas au rechargement.
    }
}

/**
 * Branche le bouton de bascule présent dans l'en-tête des deux pages.
 */
export function initialiserBoutonTheme() {
    const bouton = document.getElementById('bouton-theme');

    if (bouton === null) {
        return;
    }

    bouton.addEventListener('click', () => {
        appliquer(themeCourant() === 'sombre' ? 'clair' : 'sombre');
    });
}
