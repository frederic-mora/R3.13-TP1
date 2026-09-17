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
 *
 * C'est une erreur JavaScript ordinaire, à laquelle on ajoute un champ
 * « statut ». L'intérêt : la page d'administration a besoin de distinguer un
 * 401 d'un 403 ou d'un 404 pour afficher le bon message, et un message texte ne
 * permettrait pas ce test. On la lève avec throw et on l'attrape avec catch,
 * comme n'importe quelle autre erreur.
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
    // Réglages de l'appel, avec leurs valeurs par défaut.
    const methode = options.methode ?? 'GET';
    const corps   = options.corps   ?? null;

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
        // L'API décrit ses erreurs dans un champ « erreur ». Si la réponse n'en
        // contient pas, on se rabat sur le code de statut HTTP.
        let message = `Erreur ${reponse.status}`;

        if (donnees !== null && donnees.erreur) {
            message = donnees.erreur;
        }

        throw new ErreurApi(message, reponse.status);
    }

    return donnees;
}
