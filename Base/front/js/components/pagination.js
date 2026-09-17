/**
 * Navigation entre les pages du catalogue.
 *
 * La page courante est un choix ponctuel : elle voyage dans l'URL de la requête
 * (?page=2), et non dans les préférences. Le nombre de films par page, lui, est
 * un réglage durable.
 */

/**
 * @param {{page: number, pagesTotal: number,
 *          surPage: (page: number) => void}} options
 * @returns {HTMLElement}
 */
export function creerPagination(options) {
    const conteneur = document.createElement('nav');
    conteneur.className = 'pagination';

    const precedent = document.createElement('button');
    precedent.type        = 'button';
    precedent.className   = 'bouton';
    precedent.textContent = 'Précédent';
    precedent.disabled    = options.page <= 1;
    precedent.addEventListener('click', () => options.surPage(options.page - 1));

    const position = document.createElement('span');
    position.className   = 'pagination__position';
    position.textContent = `Page ${options.page} sur ${options.pagesTotal}`;

    const suivant = document.createElement('button');
    suivant.type        = 'button';
    suivant.className   = 'bouton';
    suivant.textContent = 'Suivant';
    suivant.disabled    = options.page >= options.pagesTotal;
    suivant.addEventListener('click', () => options.surPage(options.page + 1));

    conteneur.append(precedent, position, suivant);
    return conteneur;
}
