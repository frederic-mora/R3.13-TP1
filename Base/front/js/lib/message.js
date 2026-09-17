/**
 * Affichage des messages d'information et d'erreur, partagé par les deux pages.
 */

/**
 * La zone de message, commune aux deux pages. Elle est cherchée à chaque appel
 * plutôt que retenue une fois pour toutes : ce module est chargé avant que le
 * document ne soit complet.
 */
function zoneMessage() {
    return document.getElementById('message');
}

export function afficherErreur(texte) {
    afficher(texte, 'message--erreur');
}

export function afficherSucces(texte) {
    afficher(texte, 'message--succes');
}

export function effacerMessage() {
    const element = zoneMessage();

    if (element !== null) {
        element.hidden = true;
        element.textContent = '';
    }
}

function afficher(texte, modificateur) {
    const element = zoneMessage();

    if (element === null) {
        return;
    }

    element.className   = `message ${modificateur}`;
    element.textContent = texte;
    element.hidden      = false;
}
