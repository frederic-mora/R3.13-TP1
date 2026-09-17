<?php

declare(strict_types=1);

namespace App\Core;

use RuntimeException;

/**
 * Associe une requête entrante au contrôleur chargé de la traiter.
 *
 * Les routes sont déclarées dans back/src/routes.php sous la forme :
 *     'GET /api/films' => [CatalogueController::class, 'index']
 */
final class Router
{
    /**
     * @param array<string, array{0:string, 1:string}> $routes
     * @param array<string, object>                    $controleurs Instances indexées par nom de classe
     */
    public function __construct(
        private readonly array $routes,
        private readonly array $controleurs,
    ) {
    }

    public function traiter(Request $requete): void
    {
        foreach ($this->routes as $declaration => [$classe, $methode]) {
            if (self::normaliser($declaration) !== $requete->signature()) {
                continue;
            }

            $controleur = $this->controleurs[$classe] ?? null;

            if ($controleur === null) {
                throw new RuntimeException(
                    "Le contrôleur {$classe} n'est pas enregistré dans back/index.php."
                );
            }

            $controleur->$methode($requete);
            return;
        }

        Response::erreur('Route inconnue : ' . $requete->signature(), 404);
    }

    /**
     * « GET   /api/films » et « GET /api/films » désignent la même route :
     * on réduit les espaces multiples pour permettre un alignement lisible
     * dans le fichier de déclaration.
     */
    private static function normaliser(string $declaration): string
    {
        return preg_replace('/\s+/', ' ', trim($declaration)) ?? $declaration;
    }
}
