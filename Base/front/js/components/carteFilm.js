import { formaterDuree, formaterNote, teinteDepuisTexte } from '../lib/format.js';

/**
 * Construit la carte d'un film et renvoie l'élément correspondant.
 *
 * @param {{titre: string, realisateur: string, annee: number,
 *          duree_minutes: number, note_moyenne: string, genre: string}} film
 * @returns {HTMLElement}
 */
export function creerCarteFilm(film) {
    const article = document.createElement('article');
    article.className = 'carte';
    article.style.setProperty('--teinte', String(teinteDepuisTexte(film.titre)));

    const visuel = document.createElement('div');
    visuel.className = 'carte__visuel';

    const genre = document.createElement('span');
    genre.className = 'carte__genre';
    genre.textContent = film.genre;
    visuel.append(genre);

    const corps = document.createElement('div');
    corps.className = 'carte__corps';

    const titre = document.createElement('h2');
    titre.className = 'carte__titre';
    titre.textContent = film.titre;

    const realisateur = document.createElement('p');
    realisateur.className = 'carte__realisateur';
    realisateur.textContent = film.realisateur;

    const details = document.createElement('div');
    details.className = 'carte__details';

    const note = document.createElement('span');
    note.className = 'carte__note';
    note.textContent = formaterNote(film.note_moyenne);

    const annee = document.createElement('span');
    annee.textContent = String(film.annee);

    const duree = document.createElement('span');
    duree.textContent = formaterDuree(film.duree_minutes);

    details.append(note, annee, duree);
    corps.append(titre, realisateur, details);
    article.append(visuel, corps);

    return article;
}
