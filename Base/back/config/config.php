<?php

declare(strict_types=1);

/**
 * Configuration de l'application.
 *
 * Adaptez les identifiants à votre installation locale.
 * Sous XAMPP et WAMP, l'utilisateur par défaut est « root » sans mot de passe.
 */

return [
    'bdd' => [
        'hote'        => 'localhost',
        'port'        => 3306,
        'base'        => 'tp_cookies',
        'utilisateur' => 'root',
        'motdepasse'  => '',
    ],

    // En développement, les erreurs sont détaillées dans la réponse JSON.
    // À passer à false en production.
    'debug' => true,
];
