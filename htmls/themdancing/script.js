var lang_id = getLangFromURL();
const secret = document.getElementById("secretTXT");

function playSong() {
    const song = new Audio("../../snd/fei_theme.wav");
    song.volume = 0.1;
    song.loop = true;

    song.play().catch(console.error);

    document.getElementById("goner").hidden = true;

    if (lang_id == 2) {
        document.title = "* Está bailando"
        secret.textContent = "Corvex estuvo aquí."
    } else {
        document.title = "* They're dancing"
        secret.textContent = "Corvex was here."
    }

    const div2 = document.getElementById("div2");

    div2.style.display = "flex";
};

function getLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const langParam = parseInt(params.get("lang"), 10);
    return (langParam === 1 || langParam === 2) ? langParam : 1;
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});