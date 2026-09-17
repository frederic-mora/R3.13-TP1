/**
 * Page « Administration ».
 *
 * Cette page est la cible de la phase 5. Tant que les routes d'authentification
 * n'existent pas côté serveur, l'API répond 404 et la page l'indique.
 */

import { seConnecter, chargerStatistiques } from './api/auth.js';
import { creerFormulaireConnexion }         from './components/formulaireConnexion.js';
import { creerStatistiques }                from './components/statistiques.js';
import { initialiserBoutonTheme }           from './lib/theme.js';
import { afficherErreur, afficherSucces, effacerMessage } from './lib/message.js';

/**
 * Tente d'afficher les statistiques. Le résultat dépend de ce que le serveur
 * décide : 200 si l'accès est accordé, 401 ou 403 sinon.
 */
async function afficherStatistiques() {
    const conteneur = document.getElementById('statistiques');

    try {
        const donnees = await chargerStatistiques();
        conteneur.replaceChildren(creerStatistiques(donnees));
        effacerMessage();
    } catch (erreur) {
        conteneur.replaceChildren();

        if (erreur.statut === 404) {
            afficherErreur(
                'La route GET /api/admin/stats n\'existe pas encore. '
                + 'Elle est à créer pendant la phase 5 du TP.',
            );
            return;
        }

        if (erreur.statut === 401) {
            afficherErreur('Vous n\'êtes pas connecté.');
            return;
        }

        if (erreur.statut === 403) {
            afficherErreur('Accès réservé aux administrateurs.');
            return;
        }

        afficherErreur(erreur.message);
    }
}

async function tenterConnexion(login, motDePasse) {
    try {
        const reponse = await seConnecter(login, motDePasse);
        afficherSucces(`Connecté en tant que ${login}.`);

        // Le serveur a répondu : s'il a posé quelque chose côté navigateur, la
        // requête suivante le transportera automatiquement.
        await afficherStatistiques();

        return reponse;
    } catch (erreur) {
        if (erreur.statut === 404) {
            afficherErreur(
                'La route POST /api/login n\'existe pas encore. '
                + 'Elle est à créer pendant la phase 5 du TP.',
            );
            return null;
        }

        afficherErreur(erreur.message);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initialiserBoutonTheme();

    document.getElementById('connexion').replaceChildren(
        creerFormulaireConnexion({ surConnexion: tenterConnexion }),
    );

    afficherStatistiques();
});
