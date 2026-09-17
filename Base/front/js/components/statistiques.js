import { formaterDuree, formaterNote } from '../lib/format.js';

/**
 * Tableau de bord de la zone d'administration.
 *
 * @param {{total: number, noteMoyenne: number, dureeMoyenne: number,
 *          parGenre: Array<{genre: string, nombre: number}>}} donnees
 * @returns {HTMLElement}
 */
export function creerStatistiques(donnees) {
    const panneau = document.createElement('section');
    panneau.className = 'panneau';

    const titre = document.createElement('h2');
    titre.className   = 'panneau__titre';
    titre.textContent = 'Statistiques du catalogue';

    const grille = document.createElement('div');
    grille.className = 'stats';

    grille.append(
        creerIndicateur(String(donnees.total), 'films'),
        creerIndicateur(formaterNote(donnees.noteMoyenne), 'note moyenne'),
        creerIndicateur(formaterDuree(Math.round(donnees.dureeMoyenne)), 'durée moyenne'),
    );

    panneau.append(titre, grille);

    if (Array.isArray(donnees.parGenre) && donnees.parGenre.length > 0) {
        const liste = document.createElement('ul');
        liste.className = 'liste-genres';

        for (const ligne of donnees.parGenre) {
            const element = document.createElement('li');

            const nom = document.createElement('span');
            nom.textContent = ligne.genre;

            const nombre = document.createElement('strong');
            nombre.textContent = String(ligne.nombre);

            element.append(nom, nombre);
            liste.append(element);
        }

        panneau.append(liste);
    }

    return panneau;
}

function creerIndicateur(valeur, legende) {
    const bloc = document.createElement('div');
    bloc.className = 'stat';

    const chiffre = document.createElement('div');
    chiffre.className   = 'stat__valeur';
    chiffre.textContent = valeur;

    const texte = document.createElement('div');
    texte.className   = 'stat__legende';
    texte.textContent = legende;

    bloc.append(chiffre, texte);
    return bloc;
}
