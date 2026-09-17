/**
 * Formulaire de connexion de la page d'administration.
 *
 * Le formulaire ne conserve rien lui-même : il transmet les identifiants saisis
 * à la fonction reçue en paramètre. C'est au serveur de décider ce qu'il fait de
 * la connexion — et c'est tout l'objet de la phase 5.
 */

/**
 * @param {{surConnexion: (login: string, motDePasse: string) => void}} options
 * @returns {HTMLElement}
 */
export function creerFormulaireConnexion(options) {
    const panneau = document.createElement('section');
    panneau.className = 'panneau';

    const titre = document.createElement('h2');
    titre.className   = 'panneau__titre';
    titre.textContent = 'Connexion';

    const formulaire = document.createElement('form');
    formulaire.className = 'formulaire';

    const champLogin = creerChamp('login', 'Identifiant', 'text');
    const champMdp   = creerChamp('mdp', 'Mot de passe', 'password');

    const bouton = document.createElement('button');
    bouton.type        = 'submit';
    bouton.className   = 'bouton bouton--principal';
    bouton.textContent = 'Se connecter';

    formulaire.addEventListener('submit', (evenement) => {
        // Sans cela, le navigateur rechargerait la page en envoyant le
        // formulaire de manière classique.
        evenement.preventDefault();

        options.surConnexion(
            champLogin.controle.value.trim(),
            champMdp.controle.value,
        );
    });

    formulaire.append(champLogin.element, champMdp.element, bouton);
    panneau.append(titre, formulaire);

    return panneau;
}

function creerChamp(identifiant, etiquette, type) {
    const element = document.createElement('div');
    element.className = 'champ';

    const label = document.createElement('label');
    label.className   = 'champ__etiquette';
    label.htmlFor     = identifiant;
    label.textContent = etiquette;

    const controle = document.createElement('input');
    controle.className    = 'champ__controle';
    controle.id           = identifiant;
    controle.name         = identifiant;
    controle.type         = type;
    controle.autocomplete = type === 'password' ? 'current-password' : 'username';

    element.append(label, controle);

    return { element, controle };
}
