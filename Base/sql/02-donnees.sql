-- ---------------------------------------------------------------------------
-- TP Cookies — jeu de données
--
-- 60 films répartis sur 8 genres : de quoi remplir 5 pages de 12, 3 pages de 24
-- ou 2 pages de 48, et rendre le tri visible à l'œil nu.
--
--     mysql -u root -p < sql/02-donnees.sql
-- ---------------------------------------------------------------------------

-- Le jeu de caractères de la connexion est fixé explicitement : sans cela,
-- un client configuré en latin1 enregistrerait les accents en double encodage
-- et « Comédie » deviendrait « ComÃ©die » à la lecture par l'application.
SET NAMES utf8mb4;

USE tp_cookies;

INSERT INTO genre (id, libelle) VALUES
    (1, 'Animation'),
    (2, 'Aventure'),
    (3, 'Comédie'),
    (4, 'Documentaire'),
    (5, 'Drame'),
    (6, 'Horreur'),
    (7, 'Policier'),
    (8, 'Science-fiction');

INSERT INTO film (titre, realisateur, annee, duree_minutes, note_moyenne, genre_id) VALUES
    ('2001, l''Odyssée de l''espace',            'Stanley Kubrick',        1968, 149, 8.9, 8),
    ('Alien',                                    'Ridley Scott',           1979, 117, 8.4, 6),
    ('Apocalypse Now',                           'Francis Ford Coppola',   1979, 147, 8.5, 5),
    ('Blade Runner',                             'Ridley Scott',           1982, 117, 8.3, 8),
    ('Brazil',                                   'Terry Gilliam',          1985, 142, 7.9, 8),
    ('Dans la peau de John Malkovich',           'Spike Jonze',            1999, 112, 7.7, 3),
    ('Dune',                                     'Denis Villeneuve',       2021, 155, 8.0, 8),
    ('Fargo',                                    'Joel Coen',              1996,  98, 8.1, 7),
    ('Gravity',                                  'Alfonso Cuarón',         2013,  91, 7.7, 8),
    ('Her',                                      'Spike Jonze',            2013, 126, 8.0, 8),
    ('Intouchables',                             'Olivier Nakache',        2011, 112, 8.5, 3),
    ('Jurassic Park',                            'Steven Spielberg',       1993, 127, 8.2, 2),
    ('La Cité de Dieu',                          'Fernando Meirelles',     2002, 130, 8.6, 5),
    ('La Haine',                                 'Mathieu Kassovitz',      1995,  98, 8.0, 5),
    ('La Marche de l''empereur',                 'Luc Jacquet',            2005,  85, 7.5, 4),
    ('Là-haut',                                  'Pete Docter',            2009,  96, 8.2, 1),
    ('Le Château ambulant',                      'Hayao Miyazaki',         2004, 119, 8.2, 1),
    ('Le Cercle rouge',                          'Jean-Pierre Melville',   1970, 140, 7.9, 7),
    ('Le Dictateur',                             'Charlie Chaplin',        1940, 125, 8.4, 3),
    ('Le Fabuleux Destin d''Amélie Poulain',     'Jean-Pierre Jeunet',     2001, 122, 8.3, 3),
    ('Le Fils de Saul',                          'László Nemes',           2015, 107, 7.5, 5),
    ('Le Grand Bleu',                            'Luc Besson',             1988, 132, 7.6, 2),
    ('Le Labyrinthe de Pan',                     'Guillermo del Toro',     2006, 118, 8.2, 2),
    ('Le Mépris',                                'Jean-Luc Godard',        1963, 103, 7.6, 5),
    ('Le Parrain',                               'Francis Ford Coppola',   1972, 175, 9.2, 5),
    ('Le Roi Lion',                              'Roger Allers',           1994,  88, 8.5, 1),
    ('Le Silence des agneaux',                   'Jonathan Demme',         1991, 118, 8.6, 6),
    ('Le Tombeau des lucioles',                  'Isao Takahata',          1988,  89, 8.5, 1),
    ('Le Voyage de Chihiro',                     'Hayao Miyazaki',         2001, 125, 8.6, 1),
    ('Les Affranchis',                           'Martin Scorsese',        1990, 145, 8.7, 7),
    ('Les Dents de la mer',                      'Steven Spielberg',       1975, 124, 8.1, 6),
    ('Les Quatre Cents Coups',                   'François Truffaut',      1959,  99, 8.1, 5),
    ('Les Sept Samouraïs',                       'Akira Kurosawa',         1954, 207, 8.6, 2),
    ('Les Temps modernes',                       'Charlie Chaplin',        1936,  87, 8.5, 3),
    ('Mad Max : Fury Road',                      'George Miller',          2015, 120, 8.1, 2),
    ('Matrix',                                   'Lana et Lilly Wachowski',1999, 136, 8.7, 8),
    ('Mon oncle',                                'Jacques Tati',           1958, 117, 7.9, 3),
    ('Mon voisin Totoro',                        'Hayao Miyazaki',         1988,  86, 8.1, 1),
    ('Nuit et brouillard',                       'Alain Resnais',          1956,  32, 8.4, 4),
    ('Océans',                                   'Jacques Perrin',         2009, 104, 7.8, 4),
    ('Old Boy',                                  'Park Chan-wook',         2003, 120, 8.3, 7),
    ('Parasite',                                 'Bong Joon-ho',           2019, 132, 8.5, 5),
    ('Playtime',                                 'Jacques Tati',           1967, 124, 7.9, 3),
    ('Premier Contact',                          'Denis Villeneuve',       2016, 116, 7.9, 8),
    ('Princesse Mononoké',                       'Hayao Miyazaki',         1997, 134, 8.3, 1),
    ('Pulp Fiction',                             'Quentin Tarantino',      1994, 154, 8.9, 7),
    ('Ran',                                      'Akira Kurosawa',         1985, 162, 8.2, 5),
    ('Retour vers le futur',                     'Robert Zemeckis',        1985, 116, 8.5, 8),
    ('Roma',                                     'Alfonso Cuarón',         2018, 135, 7.7, 5),
    ('Rosemary''s Baby',                         'Roman Polanski',         1968, 137, 8.0, 6),
    ('Sans soleil',                              'Chris Marker',           1983, 100, 7.9, 4),
    ('Seven',                                    'David Fincher',          1995, 127, 8.6, 7),
    ('Shining',                                  'Stanley Kubrick',        1980, 146, 8.4, 6),
    ('Spider-Man : New Generation',              'Bob Persichetti',        2018, 117, 8.4, 1),
    ('Stalker',                                  'Andreï Tarkovski',       1979, 161, 8.1, 8),
    ('Sueurs froides',                           'Alfred Hitchcock',       1958, 128, 8.3, 7),
    ('The Thing',                                'John Carpenter',         1982, 109, 8.2, 6),
    ('Un prophète',                              'Jacques Audiard',        2009, 155, 7.9, 7),
    ('Wall-E',                                   'Andrew Stanton',         2008,  98, 8.4, 1),
    ('Whiplash',                                 'Damien Chazelle',        2014, 106, 8.5, 5);
