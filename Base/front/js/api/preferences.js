import { requeteJson } from './client.js';

/**
 * Les préférences d'affichage de l'utilisateur.
 */
export function chargerPreferences() {
    return requeteJson('preferences');
}

/**
 * Enregistre les préférences d'affichage.
 *
 * @param {{tri: string, parPage: number}} preferences
 */
export function enregistrerPreferences(preferences) {
    return requeteJson('preferences', { methode: 'POST', corps: preferences });
}
