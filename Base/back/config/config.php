<?php

declare(strict_types=1);

/**
 * Configuration de l'application.
 *
 * Les quatre valeurs ci-dessous sont à compléter : ce sont les identifiants de
 * VOTRE base de données, celle dans laquelle vous avez importé sql/import.sql.
 * Tant qu'elles ne sont pas renseignées, le catalogue restera vide.
 *
 * Sous XAMPP ou WAMP, l'utilisateur par défaut est « root », sans mot de passe.
 */

return [
    'bdd' => [
        'hote'        => 'localhost',
        'port'        => 3306,
        'base'        => 'a_completer',
        'utilisateur' => 'a_completer',
        'motdepasse'  => 'a_completer',
    ],

    // En développement, les erreurs sont détaillées dans la réponse JSON.
    // À passer à false en production.
    'debug' => true,
];
