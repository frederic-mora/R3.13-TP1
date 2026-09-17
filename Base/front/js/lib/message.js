/**
 * Affichage des messages d'information et d'erreur, partagé par les deux pages.
 */

const ELEMENT = () => document.getElementById('message');

export function afficherErreur(texte) {
    afficher(texte, 'message--erreur');
}

export function afficherSucces(texte) {
    afficher(texte, 'message--succes');
}

export function effacerMessage() {
    const element = ELEMENT();

    if (element !== null) {
        element.hidden = true;
        element.textContent = '';
    }
}

function afficher(texte, modificateur) {
    const element = ELEMENT();

    if (element === null) {
        return;
    }

    element.className   = `message ${modificateur}`;
    element.textContent = texte;
    element.hidden      = false;
}
