// NO ABRAS ESTE CÓDIGO PARA BUSCAR LOS SECRETOS, NO SEAS TRAMPOSO QUE LE QUITA LA GRACIA
// porfi :(

var alreadyPlaying = false;

function getLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const langParam = parseInt(params.get("lang"), 10);
    return (langParam === 1 || langParam === 2) ? langParam : 1;
}

var lang_id = getLangFromURL();

function showThem() {
    if (alreadyPlaying == false) {
        const song = new Audio("../../snd/happy_town.mp3");
        const punchcard = document.getElementById("punchcard");
        song.volume = 0.1;
        song.loop = true;

        song.play().catch(console.error);

        if (lang_id == 2) {
            punchcard.src = "../../img/dont_forget_es.png";
            document.title = "* No lo olvides.";
        } else {
            punchcard.src = "../../img/dont_forget.png";
            document.title = "* Don't forget.";
        }

        alreadyPlaying = true;
    }
};

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

