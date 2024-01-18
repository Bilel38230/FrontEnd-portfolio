async function getData(url) {
    const reponse = await fetch(url);
    const works = await reponse.json();
    return works;
}

async function getCategories(url) {
    const reponse = await fetch(url)
    const categories = await reponse.json()
    return categories
}

async function postData(url, chargeUtile) {
    const reponse = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    })
    if (reponse.status === 404) {
        document.querySelector(".error").innerHTML = `L'email saisi est inconnu`
        viderInput()
    }
    if (reponse.status === 401) {
        document.querySelector(".error").innerHTML = `Le mot de passe saisi ne correspond pas`
        viderInput()
    }
    const tokenData = await reponse.json()
    return tokenData
}

async function deleteData(url) {
    const reponse = await fetch(url, {
        method: "delete",
        headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") }
    })
}

async function upload(donneesFormulaire) {
    try {
        
        const reponse = await fetch(BASE_URL, {
            method: "post",
            headers: {'Authorization': 'Bearer '  + sessionStorage.getItem("token")},
            body: donneesFormulaire
        });
        console.log(reponse);
        const resultat = await reponse.json();
        console.log("Réussite :", resultat);
    } catch (erreur) {
        console.error("Erreur :", erreur);
    }
}

