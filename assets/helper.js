function createNode(element) {
    return document.createElement(element);
}
function append(parent, el) {
    return parent.appendChild(el);
}

function validerMail(chaine) {
    let regex = new RegExp("^[a-z.]+@[a-z]+[.]+[a-z]+$")
    let resultat = regex.test(chaine)
    if (resultat === false) {
        throw new Error(`Le format de l'email saisi est incorrect`)
    }
}

function validerPassword(chaine) {
    let regex = new RegExp("^[a-zA-Z0-9]+$")
    let resultat = regex.test(chaine)
    if (resultat === false) {
        throw new Error(`Le format du mot de passe saisi est incorret`)
    }
}