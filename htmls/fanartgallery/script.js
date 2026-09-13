const ASSETS_TO_PRELOAD = [
    "../../img/fanarts/belovedwareh.gif",
    "../../img/fanarts/belovedwareh_2.gif",
    "../../img/fanarts/belovedwareh_4.png",
    "../../img/fanarts/belovedware_3.png",
    "../../img/fanarts/Bendy_09992.png",
    "../../img/fanarts/edgarstarsss.jpg",
    "../../img/fanarts/emix.png",
    "../../img/fanarts/Gonuh.jpg",
    "../../img/fanarts/katanagel.png",
    "../../img/fanarts/Loragus.png",
    "../../img/fanarts/nar.jpg",
    "../../img/fanarts/nene.png",
    "../../img/fanarts/nene2.png",
    "../../img/fanarts/Novu cumple .png",
    "../../img/fanarts/Novu Loragus.png",
    "../../img/fanarts/Scribblemonster.png",
    "../../img/fanarts/senyormostaza.gif",
    "../../img/fanarts/senyormostaza2.gif",
    "../../img/fanarts/Swing.png",

    "../../vid/fondo_Paralax.mp4"
];

const galleryTitle = document.getElementById("galleryTitle")

function preloadAssets(list) {
    list.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadAssets(ASSETS_TO_PRELOAD);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const lang = {
    1: "en",
    2: "es"
};

var lang_id = getLangFromURL();

function getLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const langParam = parseInt(params.get("lang"), 10);
    return (langParam === 1 || langParam === 2) ? langParam : 1;
}

if (lang_id == 1) {
    document.title = "FANART GALLERY";
    galleryTitle.textContent = "FANART GALLERY";
}

const galeria = document.getElementById("galeria");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");

galeria.addEventListener("click", (e) => {
    const img = e.target.closest(".hueco img");
    if (!img) return;

    artZoomImg.src = img.src;
    artZoomOverlay.classList.add("active");
});

artZoomOverlay.addEventListener("click", () => {
    artZoomOverlay.classList.remove("active");
});