<?php

declare(strict_types=1);

namespace App\Controller;

use App\Core\Request;
use App\Core\Response;

/**
 * Préférences d'affichage du catalogue : critère de tri et nombre de films
 * par page.
 *
 * Ces deux réglages conditionnent la requête SQL, le serveur doit donc les
 * connaître. C'est tout l'objet de ce TP.
 *
 * Note : la préférence de thème clair/sombre, elle, n'intéresse jamais le
 * serveur. Elle est gérée en localStorage côté front — voir front/js/lib/theme.js.
 */
final class PreferencesController
{
    private const TRIS_AUTORISES     = ['titre', 'annee', 'note', 'genre'];
    private const PAR_PAGE_AUTORISES = [12, 24, 48];

    private const TRI_DEFAUT      = 'titre';
    private const PAR_PAGE_DEFAUT = 12;

    /**
     * GET /api/preferences — renvoie les préférences de l'utilisateur.
     */
    public function show(): void
    {
        // -------------------------------------------------------------------
        // TP · Phases 0 à 3 — Les préférences sont ici codées en dur.
        //
        // Elles devront provenir de ce que le navigateur a envoyé avec la
        // requête. Pensez à valider : le contenu reçu vient du client.
        // -------------------------------------------------------------------
        $tri     = self::TRI_DEFAUT;
        $parPage = self::PAR_PAGE_DEFAUT;

        Response::json(['tri' => $tri, 'parPage' => $parPage]);
    }

    /**
     * POST /api/preferences — enregistre les préférences de l'utilisateur.
     */
    public function update(Request $requete): void
    {
        $corps = $requete->corps();

        $tri     = (string) ($corps['tri'] ?? self::TRI_DEFAUT);
        $parPage = (int)    ($corps['parPage'] ?? self::PAR_PAGE_DEFAUT);

        if (!in_array($tri, self::TRIS_AUTORISES, true)) {
            Response::erreur("Critère de tri inconnu : {$tri}", 400);
        }

        if (!in_array($parPage, self::PAR_PAGE_AUTORISES, true)) {
            Response::erreur("Nombre de films par page non autorisé : {$parPage}", 400);
        }

        // -------------------------------------------------------------------
        // TP · Phases 1 à 3 — L'enregistrement manque.
        //
        // Les valeurs sont validées mais rien ne les conserve : au rechargement
        // suivant, show() ne les retrouvera pas. C'est ici que tout se joue.
        // -------------------------------------------------------------------

        Response::json(['tri' => $tri, 'parPage' => $parPage]);
    }
}
