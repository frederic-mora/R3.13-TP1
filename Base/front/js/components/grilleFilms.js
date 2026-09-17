import { creerCarteFilm } from './carteFilm.js';

/**
 * Construit la grille de cartes.
 *
 * @param {Array<object>} films
 * @returns {HTMLElement}
 */
export function creerGrilleFilms(films) {
    const grille = document.createElement('div');
    grille.className = 'grille';

    if (films.length === 0) {
        const vide = document.createElement('p');
        vide.textContent = 'Aucun film à afficher.';
        return vide;
    }

    for (const film of films) {
        grille.append(creerCarteFilm(film));
    }

    return grille;
}
