<?php

declare(strict_types=1);

namespace App\Core;

/**
 * Représente la requête HTTP entrante.
 *
 * ATTENTION — cette classe n'expose volontairement PAS les cookies.
 * Un framework les encapsulerait derrière une méthode $requete->cookie('tri'),
 * ce qui masquerait le mécanisme que ce TP cherche justement à vous faire voir.
 * Vous lirez donc $_COOKIE directement dans les contrôleurs.
 */
final class Request
{
    private function __construct(
        private readonly string $methode,
        private readonly string $chemin,
        private readonly array  $parametres,
        private readonly array  $corps,
    ) {
    }

    /**
     * Construit la requête à partir des variables du serveur.
     */
    public static function depuisGlobals(): self
    {
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';

        // L'application est déployée dans un sous-dossier de htdocs, donc l'URL
        // reçue ressemble à /tp-cookies/api/films. On ne conserve que la partie
        // qui nous concerne, à partir du marqueur /api/.
        $position = strpos($uri, '/api/');
        $chemin   = $position === false ? '/' : substr($uri, $position);

        $corps = [];
        if (in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            $brut    = file_get_contents('php://input') ?: '';
            $decode  = json_decode($brut, true);
            $corps   = is_array($decode) ? $decode : [];
        }

        return new self(
            strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET'),
            $chemin,
            $_GET,
            $corps,
        );
    }

    public function methode(): string
    {
        return $this->methode;
    }

    public function chemin(): string
    {
        return $this->chemin;
    }

    /**
     * Un paramètre de la chaîne de requête (?page=2).
     */
    public function parametre(string $cle, ?string $defaut = null): ?string
    {
        $valeur = $this->parametres[$cle] ?? null;

        return is_string($valeur) ? $valeur : $defaut;
    }

    /**
     * Le corps JSON de la requête, décodé en tableau associatif.
     */
    public function corps(): array
    {
        return $this->corps;
    }

    /**
     * Identifiant de route, par exemple « GET /api/films ».
     */
    public function signature(): string
    {
        return $this->methode . ' ' . $this->chemin;
    }
}
