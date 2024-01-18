async function genererChoixCategorie() {
    const selectCategorie = document.getElementById("categorie")
    console.log(selectCategorie.length);
    if (selectCategorie.length === 1) {
        const categories = await getCategories(CATEGORIES_URL)
        for (i = 0; i < categories.length; i++) {
            let option = createNode("option")
            option.value = categories[i].id
            option.text = categories[i].name
            selectCategorie.add(option)
        }
    }
}

function validFileType(file) {
    let fileTypes = ["image/jpeg", "image/png"];
    for (let i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}

function validFileSize(file) {
    fileSizeLimit = 4 * 1048576
    if (file.size <= fileSizeLimit) {
        return true;
    }
    return false;
}

function updateImageDisplay(curFiles) {
    const preview = document.querySelector(".preview")
    if (validFileType(curFiles[0]) && validFileSize(curFiles[0])) {
        testerMessageErreur()
        const selecteurImage = document.querySelector(".selecteur-image")
        selecteurImage.classList.add("cache")
        var image = createNode("img");
        image.src = window.URL.createObjectURL(curFiles[0]);
        append(preview, image);
    } else {
        testerMessageErreur()
        let para = createNode("p");
        para.textContent = "File name " + curFiles[0].name + ": Not a valid file type. Update your selection.";
        append(preview, para);
    }
}

async function uploadImage(donneesFormulaire) {
    await upload(donneesFormulaire);
    updateGallerys()
    reinitialiserModalsInsert()
    activerBtnEnvoyer()
    testerMessageErreur()
    const formulaire = document.querySelector(".formulaire")
    let para = createNode("p");
    para.classList.add("messageCorrect")
    para.textContent = "Le fichier " + donneesFormulaire.get("image").name + " a été correctement envoyé";
    append(formulaire, para);
}

function activerBtnEnvoyer() {
    const selectCategorie = document.getElementById("categorie")
    const titre = document.getElementById("titre")
    const btnEnvoyer = document.querySelector(".modal-wrapper2 button")
    const inputFile = document.getElementById("selected-image")
    if (inputFile.files.length != 0 && validerInput(titre.value) && validerInput(selectCategorie.value)) {
        btnEnvoyer.disabled = false
        btnEnvoyer.addEventListener("click", () => {
            const donneesFormulaire = new FormData();
            const fichierAEnvoyer = inputFile.files[0]
            donneesFormulaire.append("image", fichierAEnvoyer);
            donneesFormulaire.append("title", titre.value);
            donneesFormulaire.append("category", selectCategorie.value);
            uploadImage(donneesFormulaire)
        })
    } else {
        btnEnvoyer.setAttribute("disabled", "")
        const formulaire = document.querySelector(".formulaire")
        let para = createNode("p");
        para.textContent = "Veuillez saisir un titre et une catégorie";
        append(formulaire, para);
    }
}

function genererRequete() {
    const selectCategorie = document.getElementById("categorie")
    const titre = document.getElementById("titre")
    const inputFile = document.getElementById("selected-image")
    let curFiles = null;
    inputFile.addEventListener("change", (e) => {
        curFiles = e.target.files
        updateImageDisplay(curFiles)
        titre.value = curFiles[0].name.replace(".png", "")
        activerBtnEnvoyer()
    })
    selectCategorie.addEventListener("change", () => {
        activerBtnEnvoyer()
    })
    titre.addEventListener("change", () => {
        activerBtnEnvoyer()
    })
}

function reinitialiserModalsInsert() {
    testerMessageErreur()
    const previewImg = document.querySelector(".preview img")
    if (previewImg !== null) {
        previewImg.remove()
        const selecteurImage = document.querySelector(".selecteur-image")
        selecteurImage.classList.remove("cache")
    }
    const titre = document.getElementById("titre")
    titre.value = ""
    const selectCategorie = document.getElementById("categorie")
    selectCategorie.value = ""
}

function genererModal2(liste) {
    const boutonModal1 = document.querySelector(".modal-wrapper1 button")
    boutonModal1.addEventListener("click", () => {
        genererChoixCategorie()
        const modal1 = document.querySelector(".modal-wrapper1")
        const modal2 = document.querySelector(".modal-wrapper2")
        modal1.classList.add("cache")
        modal2.classList.remove("cache")
        const flecheGauche = document.querySelector(".flecheG")
        flecheGauche.addEventListener("click", () => {
            modal1.classList.remove("cache")
            modal2.classList.add("cache")
            reinitialiserModalsInsert()
        })
        genererRequete()
    })
}