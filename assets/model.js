async function getData(url) {
    const reponse = await fetch(url);
    const works = await reponse.json();
    return works;
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
        headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("token")}
    })
    console.log(reponse)
}