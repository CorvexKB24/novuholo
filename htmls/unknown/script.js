const html = document.documentElement;
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const dialogue = document.getElementById("dialogue");
const codeBox = document.getElementById("code");

const lang = {
    1: "en",
    2: "es"
};

function getLangFromURL() {
    const params = new URLSearchParams(window.location.search);
    const langParam = parseInt(params.get("lang"), 10);
    return (langParam === 1 || langParam === 2) ? langParam : 1;
}

var lang_id = getLangFromURL();
var id_convo = 0;
var id_dialogue = 0;
var inConversation = false;

var textsound = new Audio("../../snd/snd_text.wav")
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
            1: "¿Qué esperabas encontrar?",
            2: "Si quieres árboles, huevos, púas o billetes... Este no es tu sitio.",
            3: "De hecho, aquel lugar mola. Tiene unas vistas maravillosas.",
            4: "Una pena que escondieran los prismáticos.",
            5: "En fin, lo siento, pero no tengo nada que ofrecerte.",
            6: "Tendrás que volver en otro momento."
        },

        es: {
            1: "¿Qué esperabas encontrar?",
            2: "Si quieres árboles, huevos, púas o billetes... Este no es tu sitio.",
            3: "De hecho, aquel lugar mola. Tiene unas vistas maravillosas.",
            4: "Una pena que escondieran los prismáticos.",
            5: "En fin, lo siento, pero no tengo nada que ofrecerte.",
            6: "Tendrás que volver en otro momento."
        }
    },

    2: {
        en: {
            1: "Vaya. Ja, ja. Eres todo un caso.",
            2: "¿De verdad tienes tantas ganas de recibir algo de mi parte? Guau.",
            3: "Bueno, venga, mira. Contacta con quién está a cargo de todo esto y dile de mi parte. . .",
            4: ". . .que oyes el silbato del tren desde el fondo del abismo. ",
            5: "Además, dale este billete y seguro que sabe recompensarte en algún sitio."
        },

        es: {
            1: "Vaya. Ja, ja. Eres todo un caso.",
            2: "¿De verdad tienes tantas ganas de recibir algo de mi parte? Guau.",
            3: "Bueno, venga, mira. Contacta con quién está a cargo de todo esto y dile de mi parte. . .",
            4: ". . .que oyes el silbato del tren desde el fondo del abismo. ",
            5: "Además, dale este billete y seguro que sabe recompensarte en algún sitio."
        }
    },

    3: {
        en: {
            1: "Colega, creo que te equivocas de sitio.",
            2: "Sé que este sitio te debe recordar a otro cierto lugar.",
            3: "Pero no te flipes tanto.",
            4: "Ese número no significa nada para mí.",
            5: "Aunque las festividades de diciembre siempre molen. . .",
            6: "Desaparece hasta entonces, anda."
        },

        es: {
            1: "Colega, creo que te equivocas de sitio.",
            2: "Sé que este sitio te debe recordar a otro cierto lugar.",
            3: "Pero no te flipes tanto.",
            4: "Ese número no significa nada para mí.",
            5: "Aunque las festividades de diciembre siempre molen. . .",
            6: "Desaparece hasta entonces, anda."
        }
    },

    4: {
        en: {
            1: ". . .",
            2: "¿Sabes lo que significa o has conseguido este número en alguna parte. . .?",
            3: "¿. . .y has pensado \"Eh, voy a probarlo!!! Quizá es el correcto!!!\"?",
            4: "Mal rollete colega. Que a veces tienen significado.",
            5: "Y estoy seguro de que tú no lo conoces.",
            6: "Ni falta que hace, está bien cómo está."
        },

        es: {
            1: ". . .",
            2: "¿Sabes lo que significa o has conseguido este número en alguna parte. . .?",
            3: "¿. . .y has pensado \"Eh, voy a probarlo!!! Quizá es el correcto!!!\"?",
            4: "Mal rollete colega. Que a veces tienen significado.",
            5: "Y estoy seguro de que tú no lo conoces.",
            6: "Ni falta que hace, está bien cómo está."
        }
    },

    5: {
        en: {
            1: ":D"
        },

        es: {
            1: ":D"
        }
    },

    6: {
        en: {
            1: "¿Quién será? ¿Quién será? ",
            2: "¿Serás tú?",
            3: "¿Seré yo?",
            4: "¿Seremos todos?",
            5: "Esa es mi teoría.",
            6: "Ja, ja, ja."
        },

        es: {
            1: "¿Quién será? ¿Quién será? ",
            2: "¿Serás tú?",
            3: "¿Seré yo?",
            4: "¿Seremos todos?",
            5: "Esa es mi teoría.",
            6: "Ja, ja, ja."
        }
    },

    7: {
        en: {
            1: "Nunca falla."
        },

        es: {
            1: "Nunca falla."
        }
    },

    8: {
        en: {
            1: "Qué repelente."
        },

        es: {
            1: "Qué repelente."
        }
    },

    9: {
        en: {
            1: "Mi número favorito.",
            2: "No hay número más grande, después de todo.",
            3: "Pero no es el correcto."
        },

        es: {
            1: "Mi número favorito.",
            2: "No hay número más grande, después de todo.",
            3: "Pero no es el correcto."
        }
    },

    10: {
        en: {
            1: ". . .",
            2: "¿de verdad?",
            3: "¿colega, te crees que soy tonto?"
        },

        es: {
            1: ". . .",
            2: "¿de verdad?",
            3: "¿colega, te crees que soy tonto?"
        }
    },

    11: {
        en: {
            1: "Una luna en estado creciente permanente.",
            2: "Símbolo de muchas enseñanzas."
        },

        es: {
            1: "Una luna en estado creciente permanente.",
            2: "Símbolo de muchas enseñanzas."
        }
    },

    12: {
        en: {
            1: "¡2202!",
            2: "¡Está apuntando en mí porque soy el más importante!"
        },

        es: {
            1: "¡2202!",
            2: "¡Está apuntando en mí porque soy el más importante!"
        }
    },

    13: {
        en: {
            1: "¡Er diablo!",
            2: "Ah no espera, eso era con 3."
        },

        es: {
            1: "¡Er diablo!",
            2: "Ah no espera, eso era con 3."
        }
    }
}

function resizeScene() {
    const scene = document.getElementById("scene");
    const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
    );
    scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

resizeScene();

var talking = false;
function textTyping(textbox, dialogue, soundNeeded, i = 0, onComplete = null) {
    if (i === 0) {
        textbox.textContent = "";
        talking = true;
    }

    if (dialogue[i] != " " && dialogue[i] != "." && dialogue[i] != "," && dialogue[i] != "?" && dialogue[i] != "¿" && dialogue[i] != "!" && dialogue[i] != "¡" && dialogue[i] != "'") {
        if (soundNeeded == "text") {
            playTextsound();
        } else if (soundNeeded == "talk") {
            playTalksound();
        }
    }
    textbox.textContent += dialogue[i];

    if (i === dialogue.length - 1) {
        id_dialogue++;

        if (onComplete) onComplete();
        talking = false;
        return;
    }

    setTimeout(() => textTyping(textbox, dialogue, soundNeeded, i + 1, onComplete), 50);
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
    $(document).keydown(function (e) {
        var key = (e.key).toUpperCase();
        if (inConversation == false) {
            if (key == "ARROWLEFT" || key == "A") {
                if (selected > 1) {
                    $(`#num${selected}`).removeClass("selected");
                    selected--;
                    $(`#num${selected}`).addClass("selected");
                }
            } else if (key == "ARROWRIGHT" || key == "D") {
                if (selected < 4) {
                    $(`#num${selected}`).removeClass("selected");
                    selected++;
                    $(`#num${selected}`).addClass("selected");
                }
            }

            if (key == "ARROWUP" || key == "W") {
                if (nums[selected - 1] < 9) {
                    nums[selected - 1]++;
                    $(`#num${selected}`).text(nums[selected - 1]);
                    playSelectSound();
                }
            } else if (key == "ARROWDOWN" || key == "S") {
                if (nums[selected - 1] > 0) {
                    nums[selected - 1]--;
                    $(`#num${selected}`).text(nums[selected - 1]);
                    playSelectSound();
                }
            }
        }

        if (key == "ENTER" || key == " " || key == "Z") {
            if (inConversation == false) {
                introducedcode = `${nums[0]}${nums[1]}${nums[2]}${nums[3]}`;
                playSelectSound();
                codeBox.style.display = "none";

                if (introducedcode == correctCode) {
                    id_convo = 2;
                    id_dialogue = 1;
                } else if (introducedcode == dessCode) {
                    id_convo = 3;
                    id_dialogue = 1;
                } else if (introducedcode == novexCode) {
                    id_convo = 4;
                    id_dialogue = 1;
                } else if (introducedcode == vexCode) {
                    id_convo = 5;
                    id_dialogue = 1;
                } else if (introducedcode == mikeCode) {
                    id_convo = 6;
                    id_dialogue = 1;
                } else if (introducedcode == funnyCode) {
                    id_convo = 7;
                    id_dialogue = 1;
                } else if (introducedcode == notfunnyCode) {
                    id_convo = 8;
                    id_dialogue = 1;
                } else if (introducedcode == favCode) {
                    id_convo = 9;
                    id_dialogue = 1;
                } else if (introducedcode == dumbCode) {
                    id_convo = 10;
                    id_dialogue = 1;
                } else if (introducedcode == koroCode) {
                    id_convo = 11;
                    id_dialogue = 1;
                } else if (introducedcode == importantCode) {
                    id_convo = 12;
                    id_dialogue = 1;
                } else if (introducedcode == diabloCode) {
                    id_convo = 13;
                    id_dialogue = 1;
                } else {
                    id_convo = 1;
                    id_dialogue = 1;
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
    location.href = "../../main.html";
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