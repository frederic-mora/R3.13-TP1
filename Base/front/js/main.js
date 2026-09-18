/**
 * Page « Catalogue ».
 *
 * Enchaînement : on demande une page de films à l'API, qui renvoie les films
 * ainsi que les réglages qu'elle a appliqués. On construit ensuite l'affichage
 * à partir de cette réponse.
 *
 * Au chargement de la page, on ne précise aucun réglage : le front ne se
 * souvient de rien. Ensuite, le tri et le nombre de films par page sont
 * réinjectés dans l'URL à chaque requête — et perdus au rechargement suivant.
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
 *
 * tri et parPage sont facultatifs : sans eux, le serveur applique ses propres
 * valeurs par défaut.
 */
async function afficherCatalogue(page, tri, parPage) {
    const barreOutils = document.querySelector('#barre-outils');
    const grille      = document.querySelector('#grille');
    const pagination  = document.querySelector('#pagination');

    try {
        effacerMessage();

        const reponse = await chargerFilms(page, tri, parPage);

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
            surPage:    (numero) => afficherCatalogue(numero, reponse.tri, reponse.parPage),
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
 *
 * Le catalogue est demandé avec les réglages que le serveur confirme avoir
 * enregistrés, et non avec ceux que l'on vient de lui envoyer.
 */
async function changerPreference(preferences) {
    try {
        const enregistrees = await enregistrerPreferences(preferences);
        await afficherCatalogue(1, enregistrees.tri, enregistrees.parPage);
    } catch (erreur) {
        afficherErreur(`Enregistrement impossible : ${erreur.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialiserBoutonTheme();
    afficherCatalogue(1);
});
