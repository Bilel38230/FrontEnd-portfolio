function createGallery(liste) {
    let gallery = document.querySelector(".gallery");
    for (let i = 0; i < liste.length; i++) {
        let figure = createNode('figure');
        let img = createNode('img');
        let figcaption = createNode('figcaption');
        img.src = liste[i].imageUrl;
        img.alt = liste[i].title;
        figcaption.innerHTML = liste[i].title;
        append(gallery, figure);
        append(figure, img);
        append(figure, figcaption);
    }
}

function initButtonsEventListener(list) {
    let buttons = document.querySelectorAll(".filter button");
    for (button of buttons) {
        button.addEventListener("click", (event) => {
            let categoryId = event.target.dataset.categoryId;
            filterWorksByCategory(categoryId, list);
            document.querySelector(".filter_selected").classList.remove("filter_selected")
            event.target.classList.add("filter_selected")
        })
    }
}

function filterWorksByCategory(categoryId, list) {
    let worksFiltrees = null
    if (categoryId != 0) {
        worksFiltrees = list.filter(function (work) {
            return work.categoryId == categoryId;
        });
    } else {
        worksFiltrees = list
    }
    document.querySelector(".gallery").innerHTML = "";
    createGallery(worksFiltrees);
}

async function genererPage() {
    let works = await getData(BASE_URL);
    createGallery(works);
    initButtonsEventListener(works);
}

genererPage()
