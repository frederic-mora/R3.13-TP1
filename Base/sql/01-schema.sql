-- ---------------------------------------------------------------------------
-- TP Cookies — structure de la base
--
-- Import depuis phpMyAdmin, ou en ligne de commande :
--     mysql -u root -p < sql/01-schema.sql
-- ---------------------------------------------------------------------------

-- Le jeu de caractères de la connexion est fixé explicitement : sans cela,
-- un client configuré en latin1 enregistrerait les accents en double encodage
-- et « Comédie » deviendrait « ComÃ©die » à la lecture par l'application.
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS tp_cookies;

CREATE DATABASE tp_cookies
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE tp_cookies;

-- ---------------------------------------------------------------------------
-- Genres
-- ---------------------------------------------------------------------------
CREATE TABLE genre (
    id      TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    libelle VARCHAR(40)      NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uq_genre_libelle (libelle)
) ENGINE = InnoDB;

-- ---------------------------------------------------------------------------
-- Films
--
-- Les index sur annee et note_moyenne ne sont pas décoratifs : le catalogue
-- sera trié sur ces colonnes, et un tri sans index impose à MySQL de parcourir
-- puis d'ordonner toute la table.
-- ---------------------------------------------------------------------------
CREATE TABLE film (
    id            SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    titre         VARCHAR(160)      NOT NULL,
    realisateur   VARCHAR(120)      NOT NULL,
    annee         SMALLINT UNSIGNED NOT NULL,
    duree_minutes SMALLINT UNSIGNED NOT NULL,
    note_moyenne  DECIMAL(3,1)      NOT NULL,
    genre_id      TINYINT UNSIGNED  NOT NULL,

    PRIMARY KEY (id),
    KEY idx_film_titre (titre),
    KEY idx_film_annee (annee),
    KEY idx_film_note  (note_moyenne),
    KEY idx_film_genre (genre_id),

    CONSTRAINT fk_film_genre
        FOREIGN KEY (genre_id) REFERENCES genre (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE = InnoDB;
