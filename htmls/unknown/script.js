// NO ABRAS ESTE CÓDIGO PARA BUSCAR LOS SECRETOS, NO SEAS TRAMPOSO QUE LE QUITA LA GRACIA
// porfi :(

const html = document.documentElement;
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const dialogue = document.getElementById("dialogue");
const codeBox = document.getElementById("code");
const uiZone = document.getElementById("ui");

const lang = {
    1: "en",
    2: "es"
};

const IMAGE_PATHS = [
    "img/bombillo.gif",
    "img/bombillo_1.gif",
    "img/bombillo_2.gif",
    "img/bombillo_3.gif",
    "img/bombillo_4.gif",
    "img/bombillo_5.gif",
    "img/bombillo_6.gif",
    "img/bombillo_7.gif",
    "img/bombillo_8.gif",
    "img/bombillo_9.gif",
    "img/bombillo_10.gif",
    "img/bombillo_11.gif",
    "img/bombillo_12.gif",
    "img/bombillo_13.gif",
    "img/bombillo_14.gif",
    "img/bombillo_15.gif"
];

const preloadedImages = {};

function preloadImages(paths, onDone) {
    let loaded = 0;
    paths.forEach(path => {
        const img = new Image();
        img.onload = () => {
            preloadedImages[path] = img;
            loaded++;
            if (loaded === paths.length) onDone();
        };
        img.src = path;
    });
}

preloadImages(IMAGE_PATHS, () => { })

function getLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const langParam = parseInt(params.get("lang"), 10);
    return (langParam === 1 || langParam === 2) ? langParam : 1;
}

var lang_id = getLangFromURL();
var id_convo = 0;
var id_dialogue = 0;
var inConversation = false;

var textsound = new Audio("../../snd/snd_txtbom.wav")
var snd_select = new Audio("../../snd/snd_select.wav")
var snd_txtnon = new Audio("../../snd/snd_txt_non.wav")
snd_txtnon.volume = 0.20;

function playTextsound() {
    const text = textsound.cloneNode();
    text.volume = 0.50;

    text.play();
}

function playSelectSound() {
    const snd = snd_select.cloneNode();
    snd.volume = 0.30;

    snd.play();
}

window.addEventListener("resize", resizeScene);
window.addEventListener("load", resizeScene);

const dialogues = {
    1: {
        en: {
            1: { text: "¿Qué esperabas encontrar?", img: "bombillo.gif" },
            2: { text: "Si quieres árboles, huevos, púas o billetes... Este no es tu sitio.", img: "bombillo_1.gif" },
            3: { text: "De hecho, aquel lugar mola. Tiene unas vistas maravillosas.", img: "bombillo_1.gif" },
            4: { text: "Una pena que escondieran los prismáticos.", img: "bombillo_2.gif" },
            5: { text: "En fin, lo siento, pero no tengo nada que ofrecerte.", img: "bombillo_2.gif" },
            6: { text: "Tendrás que volver en otro momento.", img: "bombillo_2.gif" }
        },

        es: {
            1: { text: "¿Qué esperabas encontrar?", img: "bombillo.gif" },
            2: { text: "Si quieres árboles, huevos, púas o billetes... Este no es tu sitio.", img: "bombillo_1.gif" },
            3: { text: "De hecho, aquel lugar mola. Tiene unas vistas maravillosas.", img: "bombillo_1.gif" },
            4: { text: "Una pena que escondieran los prismáticos.", img: "bombillo_2.gif" },
            5: { text: "En fin, lo siento, pero no tengo nada que ofrecerte.", img: "bombillo_2.gif" },
            6: { text: "Tendrás que volver en otro momento.", img: "bombillo_2.gif" }
        }
    },

    2: {
        en: {
            1: { text: "Vaya. Ja, ja. Eres todo un caso.", img: "bombillo_9.gif" },
            2: { text: "¿De verdad tienes tantas ganas de recibir algo de mi parte? Guau.", img: "bombillo_10.gif" },
            3: { text: "Bueno, venga, mira. Contacta con quien está a cargo de todo esto y dile de mi parte. . .", img: "bombillo_3.gif" },
            4: { text: ". . .que oyes el silbato del tren desde el fondo del abismo. ", img: "bombillo_2.gif" },
            5: { text: "Además, dale este billete y seguro que sabe recompensarte en algún sitio.", img: "bombillo_1.gif" }
        },

        es: {
            1: { text: "Vaya. Ja, ja. Eres todo un caso.", img: "bombillo_9.gif" },
            2: { text: "¿De verdad tienes tantas ganas de recibir algo de mi parte? Guau.", img: "bombillo_10.gif" },
            3: { text: "Bueno, venga, mira. Contacta con quien está a cargo de todo esto y dile de mi parte. . .", img: "bombillo_3.gif" },
            4: { text: ". . .que oyes el silbato del tren desde el fondo del abismo. ", img: "bombillo_2.gif" },
            5: { text: "Además, dale este billete y seguro que sabe recompensarte en algún sitio.", img: "bombillo_1.gif" }
        }
    },

    3: {
        en: {
            1: { text: "Colega, creo que te equivocas de sitio.", img: "bombillo_11.gif" },
            2: { text: "Sé que este sitio te debe recordar a otro cierto lugar.", img: "bombillo_8.gif" },
            3: { text: "Pero no te flipes tanto.", img: "bombillo_10.gif" },
            4: { text: "Ese número no significa nada para mí.", img: "bombillo_1.gif" },
            5: { text: "Aunque las festividades de diciembre siempre molen. . .", img: "bombillo_3.gif" },
            6: { text: "Desaparece hasta entonces, anda.", img: "bombillo_8.gif" }
        },

        es: {
            1: { text: "Colega, creo que te equivocas de sitio.", img: "bombillo_11.gif" },
            2: { text: "Sé que este sitio te debe recordar a otro cierto lugar.", img: "bombillo_8.gif" },
            3: { text: "Pero no te flipes tanto.", img: "bombillo_10.gif" },
            4: { text: "Ese número no significa nada para mí.", img: "bombillo_1.gif" },
            5: { text: "Aunque las festividades de diciembre siempre molen. . .", img: "bombillo_3.gif" },
            6: { text: "Desaparece hasta entonces, anda.", img: "bombillo_8.gif" }
        }
    },

    4: {
        en: {
            1: { text: ". . .", img: "bombillo_5.gif" },
            2: { text: "¿Sabes lo que significa o has conseguido este número en alguna parte. . .?", img: "bombillo_6.gif" },
            3: { text: "¿. . .y has pensado: ¡¡¡Eh, voy a probarlo!!! ¡¡¡Quizá es el correcto!!!...?", img: "bombillo_8.gif" },
            4: { text: "Mal rollete colega. Que a veces tienen significado.", img: "bombillo_11.gif" },
            5: { text: "Y estoy seguro de que tú no lo conoces.", img: "bombillo_1.gif" },
            6: { text: "Ni falta que hace, está bien como está.", img: "bombillo.gif" }
        },

        es: {
            1: { text: ". . .", img: "bombillo_5.gif" },
            2: { text: "¿Sabes lo que significa o has conseguido este número en alguna parte. . .?", img: "bombillo_6.gif" },
            3: { text: "¿. . .y has pensado: ¡¡¡Eh, voy a probarlo!!! ¡¡¡Quizá es el correcto!!!...?", img: "bombillo_8.gif" },
            4: { text: "Mal rollete colega. Que a veces tienen significado.", img: "bombillo_11.gif" },
            5: { text: "Y estoy seguro de que tú no lo conoces.", img: "bombillo_1.gif" },
            6: { text: "Ni falta que hace, está bien cómo está.", img: "bombillo.gif" }
        }
    },

    5: {
        en: {
            1: { text: ":D", img: "bombillo_4.gif" }
        },

        es: {
            1: { text: ":D", img: "bombillo_4.gif" }
        }
    },

    6: {
        en: {
            1: { text: "¿Quién será? ¿Quién será? ", img: "bombillo_9.gif" },
            2: { text: "¿Serás tú?", img: "bombillo_10.gif" },
            3: { text: "¿Seré yo?", img: "bombillo_3.gif" },
            4: { text: "¿Seremos todos?", img: "bombillo_13.gif" },
            5: { text: "Esa es mi teoría.", img: "bombillo_14.gif" },
            6: { text: "Ja, ja, ja.", img: "bombillo_15.gif" }
        },

        es: {
            1: { text: "¿Quién será? ¿Quién será? ", img: "bombillo_9.gif" },
            2: { text: "¿Serás tú?", img: "bombillo_10.gif" },
            3: { text: "¿Seré yo?", img: "bombillo_3.gif" },
            4: { text: "¿Seremos todos?", img: "bombillo_13.gif" },
            5: { text: "Esa es mi teoría.", img: "bombillo_14.gif" },
            6: { text: "Ja, ja, ja.", img: "bombillo_15.gif" }
        }
    },

    7: {
        en: {
            1: { text: "Nunca falla.", img: "bombillo_9.gif" }
        },

        es: {
            1: { text: "Nunca falla.", img: "bombillo_9.gif" }
        }
    },

    8: {
        en: {
            1: { text: "Qué repelente.", img: "bombillo_11.gif" }
        },

        es: {
            1: { text: "Qué repelente.", img: "bombillo_11.gif" }
        }
    },

    9: {
        en: {
            1: { text: "Mi número favorito.", img: "bombillo_14.gif" },
            2: { text: "No hay número más grande, después de todo.", img: "bombillo_14.gif" },
            3: { text: "Pero no es el correcto.", img: "bombillo_1.gif" }
        },

        es: {
            1: { text: "Mi número favorito.", img: "bombillo_14.gif" },
            2: { text: "No hay número más grande, después de todo.", img: "bombillo_14.gif" },
            3: { text: "Pero no es el correcto.", img: "bombillo_1.gif" }
        }
    },

    10: {
        en: {
            1: { text: ". . .", img: "bombillo_11.gif" },
            2: { text: "¿de verdad?", img: "bombillo_5.gif" },
            3: { text: "¿colega, te crees que soy tonto?", img: "bombillo_8.gif" }
        },

        es: {
            1: { text: ". . .", img: "bombillo_11.gif" },
            2: { text: "¿de verdad?", img: "bombillo_5.gif" },
            3: { text: "¿colega, te crees que soy tonto?", img: "bombillo_8.gif" }
        }
    },

    11: {
        en: {
            1: { text: "Una luna en fase creciente permanente.", img: "bombillo_15.gif" },
            2: { text: "Símbolo de muchas enseñanzas.", img: "bombillo_4.gif" }
        },

        es: {
            1: { text: "Una luna en fase creciente permanente.", img: "bombillo_15.gif" },
            2: { text: "Símbolo de muchas enseñanzas.", img: "bombillo_4.gif" }
        }
    },

    12: {
        en: {
            1: { text: "¡2202!", img: "bombillo_3.gif" },
            2: { text: "¡Está apuntado en mí porque soy el más importante!", img: "bombillo_10.gif" }
        },

        es: {
            1: { text: "¡2202!", img: "bombillo_3.gif" },
            2: { text: "¡Está apuntado en mí porque soy el más importante!", img: "bombillo_10.gif" }
        }
    },

    13: {
        en: {
            1: { text: "¡Er diablo!", img: "bombillo_7.gif" },
            2: { text: "Ah no espera, eso era con 3.", img: "bombillo.gif" }
        },

        es: {
            1: { text: "¡Er diablo!", img: "bombillo_7.gif" },
            2: { text: "Ah no espera, eso era con 3.", img: "bombillo.gif" }
        }
    }
}

const scene = document.getElementById("scene");
function resizeScene() {
    const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
    );
    scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function triggerFullscreen() {
    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) {
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) {
        html.msRequestFullscreen();
    }

    document.getElementById("unknown_screen").style.display = "none";
    document.getElementById("realweb").style.display = "block";
    resizeScene();
}

var talking = false;
function textTyping(textbox, dialogueLine, soundNeeded, i = 0, onComplete = null) {
    const text = dialogueLine.text;

    if (i === 0) {
        textbox.textContent = "";
        talking = true;

        if (dialogueLine.img) {
            scene.style.backgroundImage = `url('img/${dialogueLine.img}')`;
        }
    }

    if (text[i] != " " && text[i] != "." && text[i] != "," && text[i] != "?" && text[i] != "¿" && text[i] != "!" && text[i] != "¡" && text[i] != "'") {
        if (soundNeeded == "text") {
            playTextsound();
        } else if (soundNeeded == "talk") {
            playTalksound();
        }
    }
    textbox.textContent += text[i];

    if (i === text.length - 1) {
        id_dialogue++;

        if (onComplete) onComplete();
        talking = false;
        return;
    }

    setTimeout(() => textTyping(textbox, dialogueLine, soundNeeded, i + 1, onComplete), 50);
}

var selected = 1;
var nums = [0, 0, 0, 0];
var introducedcode = "";
const correctCode = "5267";
const dessCode = "1225";
const novexCode = "2912";
const vexCode = "2406";
const mikeCode = "6453";
const diabloCode = "6666";
const funnyCode = "6996";
const notfunnyCode = "6767";
const favCode = "9999";
const dumbCode = "1234";
const koroCode = "1303";
const importantCode = "2202";

$(function () {
    $(document).click(function () {
        if (inConversation == true) {
            $(document).trigger($.Event("keydown", { key: "Z" }))
        }
    })

    $(document).keydown(function (e) {
        var key = (e.key).toUpperCase();
        if (inConversation == false) {

            if (key == "0" || key == "1" || key == "2" || key == "3" || key == "4" || key == "5" || key == "6" || key == "7" || key == "8" || key == "9") {
                nums[selected - 1] = key;

                $(`#num${selected}`).text(nums[selected - 1]);
                playSelectSound();

                if (selected == 1 || selected == 2 || selected == 3) {
                    $(`#num${selected}`).removeClass("selected");
                    selected++;
                    $(`#num${selected}`).addClass("selected");
                } else if (selected == 4) {
                    $(`#num${selected}`).removeClass("selected");
                    selected = 1;
                    $(`#num${selected}`).addClass("selected");
                }
            } else {
                if (key == "ARROWLEFT" || key == "A") {
                    if (selected > 1) {
                        $(`#num${selected}`).removeClass("selected");
                        selected--;
                        $(`#num${selected}`).addClass("selected");
                    } else {
                        $(`#num${selected}`).removeClass("selected");
                        selected = 4;
                        $(`#num${selected}`).addClass("selected");
                    }
                } else if (key == "ARROWRIGHT" || key == "D") {
                    if (selected < 4) {
                        $(`#num${selected}`).removeClass("selected");
                        selected++;
                        $(`#num${selected}`).addClass("selected");
                    } else {
                        $(`#num${selected}`).removeClass("selected");
                        selected = 1;
                        $(`#num${selected}`).addClass("selected");
                    }
                }

                if (key == "ARROWUP" || key == "W") {
                    if (nums[selected - 1] < 9) {
                        nums[selected - 1]++;
                        $(`#num${selected}`).text(nums[selected - 1]);
                        playSelectSound();
                    } else if (nums[selected - 1] == 9) {
                        nums[selected - 1] = 0;
                        $(`#num${selected}`).text(nums[selected - 1]);
                        playSelectSound();
                    }
                } else if (key == "ARROWDOWN" || key == "S") {
                    if (nums[selected - 1] > 0) {
                        nums[selected - 1]--;
                        $(`#num${selected}`).text(nums[selected - 1]);
                        playSelectSound();
                    } else if (nums[selected - 1] == 0) {
                        nums[selected - 1] = 9;
                        $(`#num${selected}`).text(nums[selected - 1]);
                        playSelectSound();
                    }
                }
            }
        }

        if (key == "ENTER" || key == " " || key == "Z") {
            if (inConversation == false) {
                introducedcode = `${nums[0]}${nums[1]}${nums[2]}${nums[3]}`;
                playSelectSound();
                codeBox.style.display = "none";
                uiZone.style.display = "none";


                if (introducedcode == correctCode) {
                    id_convo = 2;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == dessCode) {
                    id_convo = 3;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == novexCode) {
                    id_convo = 4;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == vexCode) {
                    id_convo = 5;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == mikeCode) {
                    id_convo = 6;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == funnyCode) {
                    id_convo = 7;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == notfunnyCode) {
                    id_convo = 8;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == favCode) {
                    id_convo = 9;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == dumbCode) {
                    id_convo = 10;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == koroCode) {
                    id_convo = 11;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == importantCode) {
                    id_convo = 12;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else if (introducedcode == diabloCode) {
                    id_convo = 13;
                    id_dialogue = 1;
                    scene.style.backgroundImage = `url('img/${introducedcode}.png')`;
                } else {
                    id_convo = 1;
                    id_dialogue = 1;
                    scene.style.backgroundImage = "url('img/wrong.png')";
                }

                inConversation = true;
                textTyping(dialogue, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
            } else {
                if (talking == false) {
                    const currentDialogueSet = dialogues[id_convo][lang[lang_id]];
                    const dialogueCount = Object.keys(currentDialogueSet).length + 1;

                    if (id_dialogue < dialogueCount) {
                        textTyping(dialogue, currentDialogueSet[id_dialogue], "text");
                    } else {
                        dialogue.style.display = "none"
                        scene.style.backgroundImage = "url('img/goodbye.png')";

                        snd_txtnon.play();

                        if (id_convo == 2) {
                            download();
                        }
                        setTimeout(() => goBack(), 2500);
                    }
                }
            }
        }
    });
});

function goBack() {
    location.reload();
    location.href = "../../index.html";
}

function download() {
    const a = document.createElement("a");
    a.href = "../../img/secret.png";

    if (lang_id == 1) {
        a.download = "ticket.png";
    } else {
        a.download = "billete.png";
    }

    a.click();
}

function changeSelection(selection) {
    $(`#num${selected}`).removeClass("selected");
    selected = selection;
    $(`#num${selected}`).addClass("selected");
}

function triggerCode() {
    if (inConversation == false) {
        $(document).trigger($.Event("keydown", { key: "Z" }))
    }
}

function triggerChangeNumber(type) {
    if (inConversation == false) {
        if (type == "down") {
            $(document).trigger($.Event("keydown", { key: "ARROWDOWN" }))
        } else {
            $(document).trigger($.Event("keydown", { key: "ARROWUP" }))
        }
    }
}

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});