import { requeteJson } from './client.js';

/**
 * Une page du catalogue.
 *
 * La réponse contient les films, mais aussi les réglages réellement appliqués
 * par le serveur : tri, parPage, page, pagesTotal, total. Le front n'a donc
 * jamais besoin de lire lui-même les préférences.
 */
export function chargerFilms(page = 1) {
    return requeteJson(`films?page=${page}`);
}
