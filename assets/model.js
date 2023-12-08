async function getData(url) {
    const reponse = await fetch(url);
    const works = await reponse.json();
    return works;
}