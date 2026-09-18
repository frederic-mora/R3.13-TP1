import { requeteJson } from './client.js';

/**
 * Une page du catalogue.
 *
 * Le tri et le nombre de films par page ne sont ajoutés à l'URL que s'ils sont
 * fournis. Sans eux, c'est le serveur qui décide de ce qu'il applique.
 *
 * La réponse contient les films, mais aussi les réglages réellement appliqués
 * par le serveur : tri, parPage, page, pagesTotal, total. Le front n'a donc
 * jamais besoin de lire lui-même les préférences.
 */
export function chargerFilms(page, tri, parPage) {
    let url = `films?page=${page}`;

    if (tri !== undefined) {
        url += `&tri=${tri}&parPage=${parPage}`;
    }

    return requeteJson(url);
}
