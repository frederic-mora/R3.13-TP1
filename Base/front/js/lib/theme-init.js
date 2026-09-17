/**
 * Application du thème, avant le premier affichage de la page.
 *
 * Ce fichier n'est PAS un module : il est chargé par une balise <script>
 * ordinaire placée dans le <head>. Le navigateur interrompt l'analyse du
 * document pour l'exécuter, donc la classe est posée avant que quoi que ce soit
 * ne soit dessiné. Un module aurait été différé, et la page serait apparue une
 * fraction de seconde dans le mauvais thème.
 *
 * Le thème est conservé en localStorage et non dans un cookie : le serveur n'en
 * a jamais besoin. C'est précisément le contre-exemple des préférences de tri
 * et de pagination, qui, elles, doivent parvenir jusqu'à la requête SQL.
 */
(function () {
    'use strict';

    var theme = 'clair';

    try {
        theme = window.localStorage.getItem('theme') || 'clair';
    } catch (e) {
        // localStorage peut être indisponible (navigation privée très stricte,
        // stockage désactivé). On retombe alors sur le thème clair.
    }

    if (theme === 'sombre') {
        document.documentElement.classList.add('theme-dark');
    }
})();
