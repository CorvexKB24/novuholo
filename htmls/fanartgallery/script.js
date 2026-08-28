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