<?php

declare(strict_types=1);

namespace App\Controller;

use App\Core\Request;
use App\Core\Response;
use App\Model\FilmModel;

/**
 * Liste paginée et triée du catalogue.
 */
final class CatalogueController
{
    /**
     * Liste blanche des tris autorisés.
     *
     * La clé vient du client, la valeur est écrite par nous. Le client ne choisit
     * donc jamais un nom de colonne : il choisit une entrée dans un tableau que
     * nous contrôlons entièrement.
     *
     * Pourquoi ne pas simplement lier le nom de colonne avec PDO ? Parce qu'un
     * paramètre lié protège une VALEUR, jamais un IDENTIFIANT. Écrire
     * « ORDER BY :colonne » puis bindValue(':colonne', 'titre') produit
     * « ORDER BY 'titre' » : une chaîne constante, identique pour toutes les
     * lignes. Le tri ne trie plus rien, et aucune erreur n'est levée.
     */
    private const TRIS = [
        'titre' => 'film.titre ASC',
        'annee' => 'film.annee DESC',
        'note'  => 'film.note_moyenne DESC',
        'genre' => 'genre.libelle ASC',
    ];

    private const PAR_PAGE_AUTORISES = [12, 24, 48];

    /** Le modèle qui interroge la base, fourni à la construction. */
    private FilmModel $films;

    public function __construct(FilmModel $films)
    {
        $this->films = $films;
    }

    public function index(Request $requete): void
    {
        // -------------------------------------------------------------------
        // TP · Phase 4 — Ces deux réglages sont figés.
        //
        // Ils devront être lus depuis les préférences envoyées par le navigateur,
        // de façon à ce qu'un choix de l'utilisateur survive au rechargement.
        // La liste blanche ci-dessus et la validation ci-dessous sont déjà là :
        // il ne manque que la source des valeurs.
        // -------------------------------------------------------------------
        $tri     = 'titre';
        $parPage = 12;

        // Validation : on n'accepte que ce qui figure dans nos listes.
        $ordre   = self::TRIS[$tri] ?? self::TRIS['titre'];
        $parPage = in_array($parPage, self::PAR_PAGE_AUTORISES, true) ? $parPage : 12;

        $total       = $this->films->compter();
        $pagesTotal  = max(1, (int) ceil($total / $parPage));
        $page        = (int) ($requete->parametre('page', '1') ?? '1');
        $page        = max(1, min($page, $pagesTotal));

        $films = $this->films->lister($ordre, $parPage, ($page - 1) * $parPage);

        Response::json([
            'films' => $films,
            // Le front n'a pas besoin de lire les cookies : l'API lui rappelle
            // les réglages effectivement appliqués.
            'tri'        => $tri,
            'parPage'    => $parPage,
            'page'       => $page,
            'pagesTotal' => $pagesTotal,
            'total'      => $total,
        ]);
    }
}
