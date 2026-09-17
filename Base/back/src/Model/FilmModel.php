<?php

declare(strict_types=1);

namespace App\Model;

use PDO;

/**
 * Accès aux données du catalogue.
 *
 * Cette couche ne contient aucune règle métier et ne décide de rien :
 * elle exécute les requêtes qu'on lui demande et renvoie des tableaux.
 */
final class FilmModel
{
    public function __construct(private readonly PDO $pdo)
    {
    }

    /**
     * Nombre total de films du catalogue.
     */
    public function compter(): int
    {
        return (int) $this->pdo->query('SELECT COUNT(*) FROM film')->fetchColumn();
    }

    /**
     * Une page du catalogue.
     *
     * @param string $ordre  Fragment SQL de tri, par exemple « film.titre ».
     *                       ATTENTION : ce fragment est inséré tel quel dans la
     *                       requête. Il ne doit JAMAIS provenir directement de
     *                       l'utilisateur — voir la liste blanche du contrôleur.
     * @param int    $limite Nombre de films à renvoyer.
     * @param int    $decalage Nombre de films à sauter (pagination).
     */
    public function lister(string $ordre, int $limite, int $decalage): array
    {
        $sql = "SELECT film.id,
                       film.titre,
                       film.realisateur,
                       film.annee,
                       film.duree_minutes,
                       film.note_moyenne,
                       genre.libelle AS genre
                  FROM film
            INNER JOIN genre ON genre.id = film.genre_id
              ORDER BY {$ordre}, film.id
                 LIMIT :limite OFFSET :decalage";

        $requete = $this->pdo->prepare($sql);

        // Les valeurs, elles, sont bien liées : c'est le rôle des paramètres.
        $requete->bindValue(':limite',   $limite,   PDO::PARAM_INT);
        $requete->bindValue(':decalage', $decalage, PDO::PARAM_INT);
        $requete->execute();

        return $requete->fetchAll();
    }

    /**
     * Statistiques globales du catalogue, pour la zone d'administration.
     *
     * Fournie avec le squelette : la phase 5 porte sur le contrôle d'accès,
     * pas sur l'écriture de requêtes d'agrégation.
     */
    public function statistiques(): array
    {
        $global = $this->pdo->query(
            'SELECT COUNT(*)           AS total,
                    AVG(note_moyenne)  AS note_moyenne,
                    AVG(duree_minutes) AS duree_moyenne
               FROM film'
        )->fetch();

        $parGenre = $this->pdo->query(
            'SELECT genre.libelle AS genre,
                    COUNT(*)      AS nombre
               FROM film
         INNER JOIN genre ON genre.id = film.genre_id
           GROUP BY genre.libelle
           ORDER BY nombre DESC, genre.libelle ASC'
        )->fetchAll();

        return [
            'total'        => (int) $global['total'],
            'noteMoyenne'  => round((float) $global['note_moyenne'], 1),
            'dureeMoyenne' => (int) round((float) $global['duree_moyenne']),
            'parGenre'     => array_map(
                static fn (array $ligne): array => [
                    'genre'  => $ligne['genre'],
                    'nombre' => (int) $ligne['nombre'],
                ],
                $parGenre,
            ),
        ];
    }
}
