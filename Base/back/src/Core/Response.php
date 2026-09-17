<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Émission de la réponse HTTP.
 *
 * Cette API ne renvoie que du JSON : aucune page HTML n'est produite ici.
 * Le front est constitué de fichiers statiques servis depuis front/.
 */
final class Response
{
    /**
     * Envoie une réponse JSON et termine le script.
     */
    public static function json(array $donnees, int $statut = 200): void
    {
        http_response_code($statut);
        header('Content-Type: application/json; charset=utf-8');

        echo json_encode(
            $donnees,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT
        );

        exit;
    }

    /**
     * Envoie une erreur au format JSON.
     */
    public static function erreur(string $message, int $statut = 400): void
    {
        self::json(['erreur' => $message], $statut);
    }
}
