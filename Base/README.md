# TP Cookies — squelette de départ

Catalogue de films : une API PHP en trois couches et un front en JavaScript.
Le projet fonctionne dès l'installation. Les parties que vous compléterez pendant
la séance sont signalées par des commentaires `TP · Phase N`.

## Installation

1. Copiez le dossier `Base/` dans `htdocs` (XAMPP) ou `www` (WAMP).
2. Importez `sql/import.sql` **dans votre base existante**, depuis phpMyAdmin :
   sélectionnez votre base dans la colonne de gauche, puis ouvrez l'onglet
   « Importer ».

   Aucune base n'est créée : le script ajoute deux tables, `r313_film` et
   `r313_genre`, et les remplit. Le préfixe `r313_` évite tout conflit avec ce
   que votre base contient déjà.

3. Renseignez le nom de votre base et vos identifiants dans
   `back/config/config.php`.
4. Ouvrez <http://localhost/Base/>. Vous devez voir une grille de douze
   films.

## Si ça ne marche pas

| Symptôme | Cause probable |
|---|---|
| Un listing de dossiers au lieu de l'application | `mod_rewrite` désactivé, ou `AllowOverride All` absent |
| « Impossible de charger le catalogue » | nom de base ou identifiants de `config.php`, ou tables non importées |
| Page blanche, erreurs de module dans la console | le projet n'est pas servi par Apache, mais ouvert en `file://` |
| Accents transformés en `ComÃ©die` | tables importées avant l'ajout de `SET NAMES utf8mb4` : réimportez |

## Organisation

```
Base/
├── .htaccess          aiguillage : /api/... vers le back, le reste vers le front
│
├── front/             pages, styles et JavaScript — servis tels quels
│   ├── index.html     le catalogue
│   ├── admin.html     la zone d'administration
│   ├── css/           tokens.css (variables de thème) et app.css
│   └── js/
│       ├── main.js            point d'entrée du catalogue
│       ├── admin.js           point d'entrée de l'administration
│       ├── api/               appels à l'API, un module par domaine
│       ├── components/        une fonction par élément d'interface
│       └── lib/               thème, formatage, messages
│
├── back/              l'API — ne renvoie que du JSON
│   ├── index.php      point d'entrée unique : assemble et délègue
│   ├── config/
│   └── src/
│       ├── Core/      Router, Request, Response, Database
│       ├── Controller/ reçoit la requête, valide, orchestre
│       ├── Model/     accès aux données, ne décide de rien
│       └── routes.php table des routes
│
└── sql/import.sql     tables r313_film et r313_genre (60 films, 8 genres)
```

### Le back

Trois couches qui se lisent de haut en bas : le **routeur** détermine quel
contrôleur appeler, le **contrôleur** valide les entrées et orchestre, le
**modèle** parle à la base. Aucune couche ne saute par-dessus la suivante.

### Le front

Un module par responsabilité, et des fonctions ordinaires qui construisent du
DOM. Un composant est une fonction qui reçoit des données et **renvoie** un
élément ; il ne va jamais chercher ses données lui-même et ne modifie jamais
autre chose que ce qu'il construit. Les points d'entrée `main.js` et `admin.js`
font le lien entre l'API et les composants.

Les deux pages sont des documents HTML distincts, reliés par de simples liens :
chaque navigation est donc une vraie requête HTTP, visible dans l'onglet Réseau.

## L'API

| Route | Effet |
|---|---|
| `GET /api/films?page=2` | une page du catalogue, avec les réglages appliqués |
| `GET /api/preferences` | les préférences d'affichage de l'utilisateur |
| `POST /api/preferences` | enregistre `{ "tri": "note", "parPage": 24 }` |

Tris acceptés : `titre`, `annee`, `note`, `genre`.
Valeurs de `parPage` acceptées : `12`, `24`, `48`.

La réponse de `GET /api/films` contient les films **et** les réglages que le
serveur a réellement appliqués (`tri`, `parPage`, `page`, `pagesTotal`, `total`).
Le front n'a donc jamais besoin de lire les préférences lui-même.

## Trois choses à savoir avant de coder

**Les cookies ne sont pas encapsulés.** La classe `Request` expose la méthode, le
chemin, les paramètres et le corps — mais pas les cookies, et `Response` n'a pas
de méthode pour en poser. C'est délibéré : un framework masquerait ici le
mécanisme que ce TP cherche à vous faire voir. Vous écrirez `$_COOKIE` et
`setcookie()` directement dans les contrôleurs.

**Le back ne produit que du JSON.** Aucune page HTML n'est générée côté serveur.

**Le thème clair/sombre est déjà fait, et volontairement en `localStorage`.**
Le serveur n'a jamais besoin de connaître le thème. Les préférences de tri et de
pagination, elles, conditionnent la requête SQL : c'est toute la différence, et
c'est le sujet de la phase 4.

## Fichiers à compléter

| Fichier | Phase |
|---|---|
| `back/src/Controller/PreferencesController.php` | 0 à 3 |
| `back/src/Controller/CatalogueController.php` | 4 |
| `back/src/routes.php` et `back/index.php` (blocs « Phase 5 ») | 5 |

Tout le reste fonctionne et n'a pas à être modifié.
