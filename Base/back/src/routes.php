<?php

declare(strict_types=1);

use App\Controller\CatalogueController;
use App\Controller\PreferencesController;

/**
 * Table des routes de l'API.
 *
 * Clé    : méthode HTTP et chemin, séparés par un ou plusieurs espaces.
 * Valeur : [classe du contrôleur, méthode à appeler].
 *
 * Toute instance de contrôleur utilisée ici doit également être enregistrée
 * dans back/index.php.
 */

return [
    'GET  /api/films'       => [CatalogueController::class,   'index'],

    'GET  /api/preferences' => [PreferencesController::class, 'show'],
    'POST /api/preferences' => [PreferencesController::class, 'update'],

    // -----------------------------------------------------------------------
    // TP · Phase 5 — Authentification.
    //
    // Décommentez ces deux routes, puis enregistrez les contrôleurs
    // correspondants dans back/index.php (bloc « Phase 5 » également).
    // -----------------------------------------------------------------------
    // 'POST /api/login'       => [AuthController::class,  'login'],
    // 'GET  /api/admin/stats' => [StatsController::class, 'index'],
];
