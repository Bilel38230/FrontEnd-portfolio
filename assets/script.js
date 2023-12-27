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
            console.log(window.localStorage.getItem("token"))
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

function genererPageAdministrateur() {
    const modeEdition = document.querySelector(".mode-edition")
    modeEdition.classList.remove("cache")
    const modifier = document.querySelector(".modifier")
    modifier.classList.remove("cache")
    const loginLink = document.querySelector(".js-log")
    loginLink.href = "index.html"
    const loginText = document.querySelector(".js-log li")
    loginText.innerHTML = "Logout"
    loginLink.addEventListener("click", () => {
        sessionStorage.removeItem("token")
    })
}

async function genererPage() {
    let works = await getData(BASE_URL);
    if (sessionStorage['token']) {
        genererPageAdministrateur()
        genererModal(works)
    } 
    createGallery(works);
    initButtonsEventListener(works);
}

genererPage()
