import { requeteJson } from './client.js';

/**
 * Authentification et zone d'administration.
 *
 * Les routes correspondantes sont à créer côté serveur pendant la phase 5.
 * Tant qu'elles n'existent pas, l'API répond 404 et la page d'administration
 * l'indique explicitement.
 */

export function seConnecter(login, motDePasse) {
    return requeteJson('login', {
        methode: 'POST',
        corps:   { login, mdp: motDePasse },
    });
}

/**
 * Attend une réponse de la forme :
 *   { total: 60, noteMoyenne: 8.2, dureeMoyenne: 121,
 *     parGenre: [ { genre: 'Drame', nombre: 11 }, ... ] }
 */
export function chargerStatistiques() {
    return requeteJson('admin/stats');
}
