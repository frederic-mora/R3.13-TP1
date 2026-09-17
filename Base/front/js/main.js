/**
 * Page « Catalogue ».
 *
 * Enchaînement : on demande une page de films à l'API, qui renvoie les films
 * ainsi que les réglages qu'elle a appliqués. On construit ensuite l'affichage
 * à partir de cette réponse.
 */

import { chargerFilms }             from './api/films.js';
import { enregistrerPreferences }   from './api/preferences.js';
import { creerBarreOutils }         from './components/barreOutils.js';
import { creerGrilleFilms }         from './components/grilleFilms.js';
import { creerPagination }          from './components/pagination.js';
import { initialiserBoutonTheme }   from './lib/theme.js';
import { afficherErreur, effacerMessage } from './lib/message.js';

/**
 * Demande une page du catalogue et met à jour l'affichage.
 */
async function afficherCatalogue(page = 1) {
    const barreOutils = document.querySelector('#barre-outils');
    const grille      = document.querySelector('#grille');
    const pagination  = document.querySelector('#pagination');

    try {
        effacerMessage();

        const reponse = await chargerFilms(page);

        barreOutils.replaceChildren(creerBarreOutils({
            tri:        reponse.tri,
            parPage:    reponse.parPage,
            total:      reponse.total,
            surTri:     (valeur) => changerPreference({ tri: valeur, parPage: reponse.parPage }),
            surParPage: (valeur) => changerPreference({ tri: reponse.tri, parPage: valeur }),
        }));

        grille.replaceChildren(creerGrilleFilms(reponse.films));

        pagination.replaceChildren(creerPagination({
            page:       reponse.page,
            pagesTotal: reponse.pagesTotal,
            surPage:    (numero) => afficherCatalogue(numero),
        }));

        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (erreur) {
        grille.replaceChildren();
        pagination.replaceChildren();
        afficherErreur(`Impossible de charger le catalogue : ${erreur.message}`);
    }
}

/**
 * Enregistre un nouveau réglage, puis recharge le catalogue depuis la première
 * page — changer de tri ou de pagination rend la page courante sans objet.
 */
async function changerPreference(preferences) {
    try {
        await enregistrerPreferences(preferences);
        await afficherCatalogue(1);
    } catch (erreur) {
        afficherErreur(`Enregistrement impossible : ${erreur.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialiserBoutonTheme();
    afficherCatalogue(1);
});
