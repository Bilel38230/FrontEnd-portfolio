function createModalGallery(liste) {
    const modalGallery = document.querySelector(".modal-gallery");
    for (let i = 0; i < liste.length; i++) {
        const div = createNode('div');
        const img = createNode('img');
        const icone = createNode('i');
        img.src = liste[i].imageUrl;
        img.alt = liste[i].title;
        icone.classList.add("fa-solid");
        icone.classList.add("fa-trash-can");
        icone.classList.add("fa-xs");
        icone.setAttribute("data-image-id", liste[i].id)
        append(modalGallery, div);
        append(div, img);
        append(div, icone);
    }
    let icons = document.querySelectorAll(".modal-gallery i");
    for (icon of icons) {
        icon.addEventListener("click", (event) => {
            let imageId = event.target.dataset.imageId;
            let url = DELETE_URL + imageId
            supprimerWork(url)
        })
    }
}

function stopPropagation() {
    const modalWrappers = document.querySelectorAll(".modal-wrapper")
    for (mW of modalWrappers) {
        mW.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    }
}

function reinitialiserModals(modal) {
    modal.classList.add("cache")
    const modalCache = document.querySelector(".modal .cache")
    modalCache.classList.remove("cache")
    modal2 = document.querySelector(".modal-wrapper2")
    modal2.classList.add("cache")
}

function closeModal(modal) {
    modal.addEventListener("click", () => {
        reinitialiserModals(modal)
        reinitialiserModalsInsert()
    })
    const iconeX = document.querySelectorAll(".iconeX")
    for (x of iconeX) {
        x.addEventListener("click", () => {
            reinitialiserModals(modal)
            reinitialiserModalsInsert()
        })
    }
    stopPropagation()
}
async function updateGallerys() {
    const works = await getData(BASE_URL);
    document.querySelector(".modal-gallery").innerHTML = ""
    createModalGallery(works)
    document.querySelector(".gallery").innerHTML = "";
    createGallery(works);
}

async function supprimerWork(url) {
    await deleteData(url);
    updateGallerys()
}

function genererModal(liste) {
    createModalGallery(liste)
    const modifier = document.querySelector(".modifier");
    modifier.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal.classList.remove("cache")
        closeModal(modal)
        genererModal2(liste)
    });
}

