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
        append(modalGallery, div);
        append(div, img);
        append(div, icone);
    }
}

function closeModal(modal) {
    modal.addEventListener("click", () => {
        modal.classList.add("cache")
    })
    const modalWrapper = document.querySelector(".modal-wrapper")
    modalWrapper.addEventListener("click", (e) => {
        e.stopPropagation()
    })
    const iconeX = document.querySelector(".iconeX")
    iconeX.addEventListener("click", () => {
        modal.classList.add("cache")
    })
}

function genererModal(liste) {
    createModalGallery(liste)
    const modifier = document.querySelector(".modifier");
    modifier.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        modal.classList.remove("cache")
        closeModal(modal)
    }); 
}

