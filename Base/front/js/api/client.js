/**
 * Appels à l'API.
 *
 * Toutes les requêtes partent vers « api/... », en chemin relatif : le projet
 * est déployé dans un sous-dossier de htdocs, et un chemin absolu comme
 * « /api/films » désignerait la racine du serveur, pas celle du projet.
 *
 * Le front et l'API sont sur la même origine. Les cookies posés par le serveur
 * accompagnent donc automatiquement chaque requête, sans aucune option à
 * ajouter ici : c'est le navigateur qui s'en charge.
 */

/**
 * Erreur renvoyée par l'API, avec son code de statut HTTP.
 */
export class ErreurApi extends Error {
    constructor(message, statut) {
        super(message);
        this.name   = 'ErreurApi';
        this.statut = statut;
    }
}

/**
 * Envoie une requête et renvoie la réponse décodée.
 *
 * @param {string} chemin  Chemin relatif à l'API, par exemple « films?page=2 ».
 * @param {{methode?: string, corps?: object}} options
 */
export async function requeteJson(chemin, options = {}) {
    const { methode = 'GET', corps = null } = options;

    const parametres = {
        method:  methode,
        headers: { Accept: 'application/json' },
    };

    if (corps !== null) {
        parametres.headers['Content-Type'] = 'application/json';
        parametres.body = JSON.stringify(corps);
    }

    const reponse = await fetch(`api/${chemin}`, parametres);

    let donnees = null;
    try {
        donnees = await reponse.json();
    } catch (e) {
        throw new ErreurApi('Réponse illisible du serveur.', reponse.status);
    }

    if (!reponse.ok) {
        throw new ErreurApi(donnees?.erreur ?? `Erreur ${reponse.status}`, reponse.status);
    }

    return donnees;
}
