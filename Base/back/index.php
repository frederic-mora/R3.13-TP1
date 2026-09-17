<?php

declare(strict_types=1);

/**
 * Point d'entrée unique de l'API.
 *
 * Toutes les requêtes commençant par /api/ aboutissent ici, redirigées par le
 * fichier .htaccess situé à la racine du projet.
 *
 * Ce fichier ne contient aucune logique métier : il assemble les pièces et
 * confie la requête au routeur.
 */

use App\Core\Database;
use App\Core\Request;
use App\Core\Response;
use App\Core\Router;
use App\Controller\CatalogueController;
use App\Controller\PreferencesController;
use App\Model\FilmModel;

// --- Chargement automatique des classes ------------------------------------
// App\Core\Router  ->  back/src/Core/Router.php
spl_autoload_register(static function (string $classe): void {
    $prefixe = 'App\\';

    if (!str_starts_with($classe, $prefixe)) {
        return;
    }

    $relatif = substr($classe, strlen($prefixe));
    $fichier = __DIR__ . '/src/' . str_replace('\\', '/', $relatif) . '.php';

    if (is_file($fichier)) {
        require $fichier;
    }
});

$config = require __DIR__ . '/config/config.php';

// --- Affichage des erreurs --------------------------------------------------
// En développement, une erreur PHP brute casserait le JSON attendu par le front.
// On les capture pour toujours répondre un document exploitable.
error_reporting(E_ALL);
ini_set('display_errors', '0');

try {
    $pdo = Database::connexion($config['bdd']);

    // --- Assemblage ---------------------------------------------------------
    // Les dépendances sont créées explicitement : le modèle reçoit la connexion,
    // le contrôleur reçoit le modèle. Aucune magie, tout est lisible ici.
    $controleurs = [
        CatalogueController::class   => new CatalogueController(new FilmModel($pdo)),
        PreferencesController::class => new PreferencesController(),

        // -------------------------------------------------------------------
        // TP · Phase 5 — Authentification.
        // Décommentez après avoir créé les contrôleurs correspondants, et
        // décommentez également les routes dans back/src/routes.php.
        // -------------------------------------------------------------------
        // AuthController::class  => new AuthController(),
        // StatsController::class => new StatsController(new FilmModel($pdo)),
    ];

    $routes = require __DIR__ . '/src/routes.php';

    (new Router($routes, $controleurs))->traiter(Request::depuisGlobals());
} catch (Throwable $e) {
    Response::json(
        [
            'erreur' => $config['debug']
                ? $e->getMessage()
                : 'Une erreur interne est survenue.',
            'fichier' => $config['debug'] ? $e->getFile() . ':' . $e->getLine() : null,
        ],
        500,
    );
}
