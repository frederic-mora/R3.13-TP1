# Contexte du projet — R3.13-TP1

## De quoi il s'agit

Support de TP pour le module **R3.13 (développement web)**, BUT MMI. Deux séances
de 2 h à une semaine d'intervalle :

- **TP 1 — les cookies** (en cours de finalisation)
- **TP 2 — les sessions PHP**, qui prend directement la suite (à écrire)

`Base/` est le **squelette de départ distribué aux étudiants**. Ce n'est pas une
application à faire évoluer : c'est un support pédagogique. Toute modification
doit être évaluée à l'aune d'une seule question — est-ce que ça aide un étudiant
à comprendre les cookies, ou est-ce que ça ajoute du bruit ?

## Niveau des étudiants

Ils savent développer un front simple qui consomme une API PHP en trois couches
(routage / contrôleur / modèle) au-dessus de MySQL, et utilisent PDO avec des
paramètres liés. Ils **ne connaissent pas** : les attributs `data-*`, les
patterns de state management, l'hyperscript, les frameworks front.

Conséquence directe : **ne jamais introduire une notion étrangère aux objectifs
du TP**, même si elle améliorerait le code. Le coût cognitif se paie sur
l'acquisition des cookies.

## Contraintes d'environnement

- Apache sous XAMPP / WAMP, projet déposé dans `htdocs`, réécriture par `.htaccess`
- PHP 8.x, MySQL
- **Aucune** étape de build, aucun Composer, aucun npm
- **Aucune** dépendance réseau : pas d'image externe, pas de CDN, pas de webfont
- Modules ES natifs, servis par Apache

## Architecture

```
Base/
├── .htaccess          /api/... vers le back, le reste vers le front
├── sql/import.sql     un seul import, à passer dans la base de l'étudiant
├── front/             deux pages HTML statiques + CSS + modules ES
└── back/              API stricte, ne renvoie QUE du JSON
    ├── index.php      point d'entrée : assemble les dépendances, délègue
    └── src/{Core,Controller,Model}, routes.php
```

### Base de données

Les étudiants ont déjà une base et ne peuvent pas en créer : l'import ne fait
que **créer deux tables préfixées**, `r313_film` et `r313_genre`, dans la base
qu'ils ont sélectionnée dans phpMyAdmin. Pas de `CREATE DATABASE`, pas de `USE`.

Le préfixe est confiné aux clauses `FROM` / `JOIN` du modèle, où un alias
rétablit aussitôt les noms courts (`FROM r313_film AS film`). Le reste du SQL —
notamment la liste blanche `TRIS` du `CatalogueController`, que les étudiants
lisent en phase 4 — ignore complètement le préfixe. Ne pas le propager ailleurs.

### Front — niveau volontairement bas

Un module par responsabilité, et **des fonctions ordinaires qui construisent et
renvoient du DOM**. Un composant reçoit ses données en paramètre et renvoie un
élément ; il ne va jamais les chercher lui-même.

Navigation entre catalogue et admin : **deux pages HTML reliées par des liens
`<a>` ordinaires**. Le rechargement complet est un avantage ici — chaque
navigation est une vraie requête HTTP, donc une occasion d'observer l'en-tête
`Cookie` dans l'onglet Réseau.

## Choix délibérés qui ressemblent à des erreurs

Ne pas « corriger » les points suivants sans en parler :

- **Les cookies ne sont pas encapsulés.** `Request` n'expose pas les cookies,
  `Response` n'a pas de `withCookie()`. Les étudiants écrivent `$_COOKIE` et
  `setcookie()` directement dans les contrôleurs. Une abstraction masquerait
  exactement le mécanisme que le TP veut rendre visible.
- **La page d'administration n'a aucune protection côté front.** Formulaire et
  zone de statistiques toujours dans le DOM. Le contrôle d'accès est l'affaire du
  serveur, et le TP doit le démontrer.
- **`back/config/config.php` est versionné** avec `root` / mot de passe vide,
  pour que les étudiants démarrent sans configuration.
- **Le thème clair/sombre est en `localStorage`, pas en cookie.** C'est un
  contre-exemple assumé : le serveur n'en a jamais besoin. Les préférences de tri
  et de pagination, elles, conditionnent la requête SQL. Cette opposition est le
  cœur de la phase 4.
- **`GET /api/films` renvoie les réglages appliqués** (`tri`, `parPage`, `page`,
  `pagesTotal`, `total`) en plus des films. Cela permet au front de ne jamais
  lire les cookies en JavaScript, et donc de les passer en `httponly` — ce que
  les étudiants font en phase 3.
- **La page courante voyage dans l'URL** (`?page=2`), le tri et la pagination
  dans les cookies. Choix ponctuel contre réglage durable.

## Pistes explicitement rejetées

Ne pas les réintroduire :

- Un shell HTML généré par PHP (`View/shell.php`) — le back doit rester une API
  strictement JSON
- Un store réactif, un `h()` hyperscript, un routeur front avec `pushState`
- Le thème comme exercice du TP (`localStorage` est la bonne réponse pour lui,
  ça affaiblissait la démonstration)
- Un compteur artificiel comme accroche de la phase 0
- Les attributs `data-*` : le thème s'applique via une classe `.theme-dark`

## Deux pièges techniques validés par le test

- **`SET NAMES utf8mb4;` en tête du fichier SQL est indispensable.** Sans
  lui, un client MySQL configuré en latin1 produit un double encodage : la base
  contient `C383C2A9` au lieu de `C3A9`, et PDO lit `ComÃ©die` alors que le
  client MySQL affiche correctement. Bug très déroutant, vérifié et corrigé.
- **`bindValue()` sur un identifiant ne fonctionne pas et n'échoue pas.**
  `ORDER BY :colonne` lié à `'annee'` produit `ORDER BY 'annee'` — une chaîne
  littérale, donc un tri inopérant, sans la moindre erreur. D'où la liste blanche
  `TRIS` dans `CatalogueController`. C'est un encadré de l'énoncé, testé.

## Ce que les étudiants complètent

Marqueurs `TP · Phase N` dans le code. Tout le reste fonctionne dès l'import.

| Fichier | Phase |
|---|---|
| `back/src/Controller/PreferencesController.php` | 0 à 3 |
| `back/src/Controller/CatalogueController.php` | 4 |
| `back/src/routes.php` **et** `back/index.php` (blocs « Phase 5 ») | 5 |

## Déroulé du TP 1 (120 min)

0. **L'amnésie du serveur** (10) — le catalogue oublie tri et pagination ;
   observer que deux requêtes successives sont indiscernables
1. **Un cookie n'est qu'un en-tête** (20) — `header()` écrit à la main, puis
   `$_COOKIE`, puis `setcookie()`. Cet ordre est le point pédagogique.
2. **Mémoriser, et le piège du décalage** (15) — `setcookie()` puis lecture de
   `$_COOKIE` dans la même requête ne donne rien
3. **Les attributs** (25) — `expires`, suppression, `path`, `httponly` ;
   `secure` et `samesite` en démonstration (non observables en local)
4. **Cookie, localStorage ou BDD ?** (25) — brancher le catalogue, puis constater
   que la valeur du thème n'apparaît dans aucun en-tête réseau
5. **Le cookie de trop** (20) — authentification naïve avec `role` en cookie,
   puis élévation de privilège en deux clics dans les DevTools
6. **Synthèse et rendu** (5)

La phase 5 laisse la question ouverte, et le TP 2 y répond.

## État d'avancement

- `Base/` : complet, testé de bout en bout (MySQL réel, 60 films, scénario de la
  phase 5 validé : 403 → édition du cookie → 200)
- Énoncé du TP 1 : rédigé, en page HTML autonome avec coloration syntaxique
- Corrigé enseignant : à faire
- TP 2 (sessions) : à écrire
