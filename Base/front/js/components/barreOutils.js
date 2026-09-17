/**
 * Barre de réglages du catalogue : critère de tri et nombre de films par page.
 *
 * Le composant ne décide de rien : il reçoit les valeurs courantes et une
 * fonction à appeler quand l'utilisateur change quelque chose.
 */

const TRIS = [
    { valeur: 'titre', libelle: 'Titre (A → Z)' },
    { valeur: 'annee', libelle: 'Année (récents d\'abord)' },
    { valeur: 'note',  libelle: 'Note (meilleurs d\'abord)' },
    { valeur: 'genre', libelle: 'Genre' },
];

const PAR_PAGE = [12, 24, 48];

function creerSelect(identifiant, etiquette, options, valeurCourante, surChangement) {
    const conteneur = document.createElement('div');
    conteneur.className = 'champ';

    const label = document.createElement('label');
    label.className   = 'champ__etiquette';
    label.htmlFor     = identifiant;
    label.textContent = etiquette;

    const select = document.createElement('select');
    select.className = 'champ__controle';
    select.id        = identifiant;

    for (const option of options) {
        const element = document.createElement('option');
        element.value       = String(option.valeur);
        element.textContent = option.libelle;
        element.selected    = String(option.valeur) === String(valeurCourante);
        select.append(element);
    }

    select.addEventListener('change', () => surChangement(select.value));

    conteneur.append(label, select);
    return conteneur;
}

/**
 * @param {{tri: string, parPage: number, total: number,
 *          surTri: (valeur: string) => void,
 *          surParPage: (valeur: number) => void}} options
 * @returns {HTMLElement}
 */
export function creerBarreOutils(options) {
    const barre = document.createElement('div');
    barre.className = 'barre-outils';

    barre.append(
        creerSelect('tri', 'Trier par', TRIS, options.tri, options.surTri),
        creerSelect(
            'par-page',
            'Films par page',
            PAR_PAGE.map((n) => ({ valeur: n, libelle: `${n} films` })),
            options.parPage,
            (valeur) => options.surParPage(Number(valeur)),
        ),
    );

    const resultat = document.createElement('span');
    resultat.className   = 'barre-outils__resultat';
    resultat.textContent = `${options.total} films au catalogue`;
    barre.append(resultat);

    return barre;
}
