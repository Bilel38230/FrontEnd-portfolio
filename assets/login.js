async function saveToken(chargeUtile) {
    const tokenData = await postData(LOGIN_URL, chargeUtile)
    if (tokenData.token !== undefined) {
        window.sessionStorage.setItem('token', tokenData.token)
        window.location.href = "index.html"
    }
}
function viderInput() {
    document.getElementById("email").value = null
    document.getElementById("password").value = null
}

const formulaireLogin = document.querySelector("#contact form")
formulaireLogin.addEventListener("submit", function (event) {
    try {
        event.preventDefault()
        const emailSaisi = document.getElementById("email").value
        validerMail(emailSaisi)
        const passwordSaisi = document.getElementById("password").value
        validerPassword(passwordSaisi)
        const login = {
            "email": emailSaisi,
            "password": passwordSaisi
        }
        const chargeUtile = JSON.stringify(login)
        saveToken(chargeUtile)
    } catch (error) {
        document.querySelector(".error").innerHTML = error.message
        viderInput()
    }
})


