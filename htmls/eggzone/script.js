const html = document.documentElement;
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const character = document.getElementById("char_novu");
const scene = document.getElementById("scene");
const tree = document.getElementById("tree");
const dialogueSigns = document.getElementById("dialoguetext");
const signText = document.getElementById("dialogue");

const textbox = document.getElementById("dialoguebox_b");
const text = document.getElementById("dialoguetext_b");
const gaster = document.getElementById("dialogue_b");

var started = false;
var inBetween = 0;
var inEggRoom = false;
var recievedEgg = false;
var inConversation = false;
var readingSign = false;
var id_dialogue = 0;

const IMAGE_PATHS = [
    "../../img/egg_zone_bg_noSign.png",
    "../../img/egg_zone_bg.png",
    "../../img/eggroom_bg.png",
    "../../img/egg_zone_bg_e1.png",
    "../../img/egg_zone_bg_e2.png",
    "../../img/egg_zone_bg_e3.png"
];

const SPRITE_BASE = "../../img/sprites";
const SPRITE_DIRECTIONS = ["up", "down", "left", "right"];
const SPRITE_SETS = ["lw", "dw"];

function spritePath(set, direction, frame) {
    return `${SPRITE_BASE}/spr_nov_${set}_${direction}_${frame}.png`;
}

const SPRITE_PATHS = [];
for (const set of SPRITE_SETS) {
    for (const dir of SPRITE_DIRECTIONS) {
        for (let f = 1; f <= 4; f++) {
            SPRITE_PATHS.push(spritePath(set, dir, f));
        }
    }
}

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
preloadImages(SPRITE_PATHS, () => { })

let facing = "down";
let currentFrame = 1;
let animInterval = null;
const ANIM_FRAME_MS = 120;

function getSpriteSet() {
    return recievedEgg ? "dw" : "lw";
}

function setCharacterSprite() {
    character.src = spritePath(getSpriteSet(), facing, currentFrame);
}

function startWalkAnimation() {
    setCharacterSprite();

    if (animInterval) return;
    animInterval = setInterval(() => {
        currentFrame = currentFrame >= 4 ? 1 : currentFrame + 1;
        setCharacterSprite();
    }, ANIM_FRAME_MS);
}

function stopWalkAnimation() {
    if (animInterval) {
        clearInterval(animInterval);
        animInterval = null;
    }
    currentFrame = 1;
    setCharacterSprite();
}

function updateFacingAnimation(dir, moved) {
    if (dir) {
        facing = dir;
        if (moved) {
            startWalkAnimation();
        } else {
            stopWalkAnimation();
        }
    } else {
        stopWalkAnimation();
    }
}

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
if (lang_id == 2) {
    document.title = "Ninguna parte"
} else {
    document.title = "Nowhere"
}

var textsound = new Audio("../../snd/snd_text.wav")

function playTextsound() {
    const text = textsound.cloneNode();
    text.volume = 0.50;

    text.play();
}

window.addEventListener("resize", resizeScene);
window.addEventListener("load", resizeScene);

var snd_bg_music = new Audio("../../snd/8bit_fei_theme.wav");
snd_bg_music.volume = 0.25
snd_bg_music.loop = true

var egg_room = new Audio("../../snd/egg_room.mp3");
egg_room.volume = 0.25
egg_room.loop = true

const dialogues = {
    1: {
        en: {
            1: "Try on the left.",
            2: "Try on the right",
            3: "Try in between?",
            4: "Wow! Where did that come from?",
            5: "Can you make more stuff keep appearing?",
            6: "I don't know how I got here, but keep it up, leader!",
            7: "Let's fill up the island!",
            8: "Didn't I just tell you to try on the right?!",
            9: "On the right left! L-E-F-T!",
            10: "Don't listen to the other guy! R-I-G-H-T!"
        },

        es: {
            1: "Prueba por la izquierda",
            2: "Prueba por la derecha",
            3: "¿Prueba entre medias?",
            4: "¡Ostras! ¿Y eso de dónde ha salido?",
            5: "¿Podrás hacer que sigan apareciendo cosas?",
            6: "¡No sé cómo he llegado aquí pero sigue así líder!",
            7: "¡Llenemos la isla!",
            8: "¡¿No te acabo de decir que por la derecha?!",
            9: "¡Por la izquierda! ¡I-Z-Q-U-I-E-R-D-A!",
            10: "¡No le hagas caso al otro! ¡D-E-R-E-C-H-A!"
        }
    },

    2: {
        en: {
            1: "(Well, there is a man here.)",
            2: "(He offered you something.)",
            3: "(You received an Eg-)",
            4: "(No, wait. It seems he's out of eggs...)",
            5: "(The man smiles and, instead, hands you a sort of coupon.)",
            6: "(He points to his empty palm. Then he points to you and...)",
            7: "((...to the coupon that, without realizing it, you've been holding since you entered.)",
            8: "(\"42701539\")",
            9: "(The man smiled.)",
            10: "(You have a strange feeling that this coupon might come in handy...)",
            11: "(Well, there is not a man here.)"
        },

        es: {
            1: "(Bueno, aquí hay un hombre.)",
            2: "(Te ofrece algo.)",
            3: "(Has recibido un huevo.)",
            4: "(No, espera. Parece que no le quedan más huevos...)",
            5: "(El hombre sonríe y, en su lugar, te entrega una especie de cupón.)",
            6: "(Señala a su palma vacía. Tras eso, te señala a ti y...)",
            7: "(...al cupón que, sin darte cuenta, ya estaba en tu mano desde que has entrado.)",
            8: "(\"42701539\")",
            9: "(El hombre sonríe.)",
            10: "(Tienes la extraña sensación de que este cupón podría ser de cierta utilidad...)",
            11: "(Bueno, aquí no hay un hombre.)"
        }
    },

    3: {
        en: {
            1: "(He is behind the tree.)",
            2: "(It is a tree.)"
        },

        es: {
            1: "(Él está detrás del árbol.)",
            2: "(Es un árbol.)"
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

function triggerFullscreen() {
    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) {
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) {
        html.msRequestFullscreen();
    }

    resizeScene();
}

function start() {
    preloadImages(IMAGE_PATHS, () => { })
    snd_bg_music.play();
    triggerFullscreen();
    scene.style.backgroundImage = "url('../../img/egg_zone_bg_noSign.png')";
    scene.style.cursor = "none";

    started = true;
}

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
        if (inConversation == false) {
            setTimeout(() => hideDialogue(), 1500);
        }

        if (onComplete) onComplete();
        talking = false;
        return;
    }

    setTimeout(() => textTyping(textbox, dialogue, soundNeeded, i + 1, onComplete), 50);
}

let posX = 394;
let posY = 492;
const SPEED = 2;

function moveCharacter() {
    character.style.left = posX + "px";
    character.style.top = posY + "px";
}

moveCharacter();
setCharacterSprite();

const keysPressed = {};

$(document).keydown(function (e) {
    keysPressed[e.key.toUpperCase()] = true;
});

$(document).keyup(function (e) {
    keysPressed[e.key.toUpperCase()] = false;
});

function isPressed(...keys) {
    return keys.some(k => keysPressed[k]);
}

function updateMovement() {
    if (started == true) {
        if (inEggRoom == false) {

            let horizDir = null, horizMoved = false;
            let vertDir = null, vertMoved = false;

            if ((posX == 960 && posY >= 570) == false) {
                if (isPressed("ARROWRIGHT", "D")) {
                    horizDir = "right";
                    if (posX < 1770) {
                        if (posX != 650) {
                            posX += SPEED;
                            horizMoved = true;
                            moveCharacter();
                            addInBetween();
                            checkInBetween();
                        } else if (posX == 650) {
                            if (posY >= 370 && posY <= 560) {
                                posX += SPEED;
                                horizMoved = true;
                                moveCharacter();
                                addInBetween();
                                checkInBetween();
                            }
                        }
                    }
                }

                if (isPressed("ARROWLEFT", "A")) {
                    horizDir = "left";
                    if (posX > 150) {
                        if (posX != 1290) {
                            posX -= SPEED;
                            horizMoved = true;
                            moveCharacter();
                            addInBetween();
                            checkInBetween();
                        } else if (posX == 1290) {
                            if (posY >= 370 && posY <= 560) {
                                posX -= SPEED;
                                horizMoved = true;
                                moveCharacter();
                                addInBetween();
                                checkInBetween();
                            }
                        }
                    }
                }

                if (isPressed("ARROWUP", "W")) {
                    vertDir = "up";
                    if (posX <= 650 && posX >= 150) {
                        if (posY > 200) {
                            posY -= SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    } else if (posX >= 660 && posX <= 1260) {
                        if (posY > 370) {
                            posY -= SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    } else if (posX > 1260) {
                        if (posY > 200) {
                            posY -= SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    }
                }

                if (isPressed("ARROWDOWN", "S")) {
                    vertDir = "down";
                    if (posX <= 650 && posX >= 150) {
                        if (posY < 720) {
                            posY += SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    } else if (posX >= 660 && posX < 960 || posX > 960 && posX <= 1260) {
                        if (posY < 560) {
                            posY += SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    } else if (posX > 1260) {
                        if (posY < 720) {
                            posY += SPEED;
                            vertMoved = true;
                            moveCharacter();
                        }
                    } else if (posX == 960) {
                        posY += SPEED;
                        vertMoved = true;
                        moveCharacter();
                    }
                }
            } else {
                if (isPressed("ARROWRIGHT", "D")) {
                    horizDir = "right";
                    console.log("border");
                }
                if (isPressed("ARROWLEFT", "A")) {
                    horizDir = "left";
                    console.log("border");
                }
                if (isPressed("ARROWUP", "W")) {
                    vertDir = "up";
                    posY -= SPEED;
                    vertMoved = true;
                    moveCharacter();
                }
                if (isPressed("ARROWDOWN", "S")) {
                    vertDir = "down";
                    posY += SPEED;
                    vertMoved = true;
                    moveCharacter();
                }
            }

            const outdoorDir = horizDir || vertDir;
            const outdoorMoved = horizMoved || vertMoved;
            updateFacingAnimation(outdoorDir, outdoorMoved);

            if (posY == 1200) {
                inEggRoom = true;
                posX = 960;
                posY = 964;
                moveCharacter();
                snd_bg_music.pause();
                egg_room.play();
                tree.style.display = "block";
                scene.style.backgroundImage = "url('../../img/eggroom_bg.png')";
            }
        } else if (inEggRoom == true) {
            if (inConversation == false) {
                let dir = null, moved = false;

                if (isPressed("ARROWRIGHT", "D")) {
                    dir = "right";
                    if (posX != 1866) {
                        if (((posY <= 504 && posY > 466) && posX == 852) == false) {
                            posX += SPEED;
                            moved = true;
                            moveCharacter();
                        }
                    }
                }

                if (isPressed("ARROWLEFT", "A")) {
                    dir = "left";
                    if (posX != 62) {
                        posX -= SPEED;
                        moved = true;
                        moveCharacter();
                    }
                }

                if (isPressed("ARROWUP", "W")) {
                    dir = "up";
                    if (posY != 88) {
                        if (((posX > 852 && posX <= 1064) && posY == 504) == false) {
                            posY -= SPEED;
                            moved = true;
                            moveCharacter();
                        }
                    }
                }

                if (isPressed("ARROWDOWN", "S")) {
                    dir = "down";
                    if (posY != 964) {
                        if (((posX > 852 && posX <= 1064) && posY == 466) == false) {
                            posY += SPEED;
                            moved = true;
                            moveCharacter();

                            if (posY == 1200) {
                                location.reload();
                                location.href = "../../main.html";
                            }
                        }
                    } else {
                        if (recievedEgg == true) {
                            posY += SPEED;
                            moved = true;
                            moveCharacter();
                        }
                    }
                }

                updateFacingAnimation(dir, moved);

                if (posY <= 486) {
                    character.style.zIndex = 99;
                    tree.style.zIndex = 100;
                } else {
                    character.style.zIndex = 100;
                    tree.style.zIndex = 99;
                }
            } else {
                stopWalkAnimation();
            }
        }
    }
    requestAnimationFrame(updateMovement);
}

requestAnimationFrame(updateMovement);

$(function () {
    $(document).keydown(function (e) {
        var key = (e.key).toUpperCase();

        if (started == true) {
            if (inEggRoom == false) {
                if (talking == false) {
                    if (readingSign == false) {

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (posX >= 362 && posX <= 430 && posY == 200) {
                                if (centerSign == false) {
                                    if (inBetween < 2) {
                                        id_convo = 1;
                                        id_dialogue = 2;
                                        readingSign = true;
                                        dialogueSigns.style.display = "block";
                                        textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                    } else if (inBetween == 2) {
                                        id_convo = 1;
                                        id_dialogue = 8;
                                        readingSign = true;
                                        dialogueSigns.style.display = "block";
                                        textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                    } else if (inBetween == 4) {
                                        id_convo = 1;
                                        id_dialogue = 10;
                                        readingSign = true;
                                        dialogueSigns.style.display = "block";
                                        textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                    }
                                } else {
                                    id_convo = 1;
                                    id_dialogue = 5;
                                    readingSign = true;
                                    dialogueSigns.style.display = "block";
                                    textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                }
                            }
                        }

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (centerSign == true) {
                                if (posX >= 930 && posX <= 996 && posY == 370) {
                                    id_convo = 1;
                                    id_dialogue = 3;
                                    readingSign = true;
                                    dialogueSigns.style.display = "block";
                                    textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                }
                            }
                        }

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (posX >= 1510 && posX <= 1580 && posY == 200) {
                                if (centerSign == false) {
                                    if (inBetween < 3) {
                                        id_convo = 1;
                                        id_dialogue = 1;
                                        readingSign = true;
                                        dialogueSigns.style.display = "block";
                                        textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                    } else if (inBetween == 3) {
                                        id_convo = 1;
                                        id_dialogue = 9;
                                        readingSign = true;
                                        dialogueSigns.style.display = "block";
                                        textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                    }
                                } else {
                                    id_convo = 1;
                                    id_dialogue = 4;
                                    readingSign = true;
                                    dialogueSigns.style.display = "block";
                                    textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                }
                            }
                        }

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (rudin1 == true) {
                                if (posX >= 570 && posX <= 630 && posY == 200) {
                                    id_convo = 1;
                                    id_dialogue = 6;
                                    readingSign = true;
                                    dialogueSigns.style.display = "block";
                                    textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                }
                            }
                        }

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (rudin2 == true) {
                                if (posX >= 1312 && posX <= 1375 && posY == 200) {
                                    id_convo = 1;
                                    id_dialogue = 7;
                                    readingSign = true;
                                    dialogueSigns.style.display = "block";
                                    textTyping(signText, dialogues[id_convo][lang[lang_id]][id_dialogue], "text")
                                }
                            }
                        }

                        if (key == "Z" || key == " " || key == "ENTER") {
                            if (binoculars == true) {
                                if (posX >= 1112 && posX <= 1138 && posY == 370) {
                                    location.reload();
                                    location.href = "bino/bino.html";
                                }
                            }
                        }
                    }
                }
            } else if (inEggRoom == true) {
                if (key == "Z" || key == " " || key == "ENTER") {
                    if (talking == false) {
                        if (inConversation == false) {
                            if (posX >= 916 && posX <= 1038 && posY == 504) {
                                textbox.style.display = "block";
                                text.style.display = "block";
                                id_convo = 3;
                                inConversation = true;
                                stopWalkAnimation();

                                if (recievedEgg == false) {
                                    textTyping(gaster, dialogues[3][lang[lang_id]][1], "text")
                                } else if (recievedEgg == true) {
                                    textTyping(gaster, dialogues[3][lang[lang_id]][2], "text")
                                }
                            }

                            if ((posX >= 982 && posX <= 1094) && (posY >= 290 && posY <= 318)) {
                                textbox.style.display = "block";
                                text.style.display = "block";
                                id_convo = 2;
                                id_dialogue = 1;
                                inConversation = true;
                                stopWalkAnimation();

                                if (recievedEgg == false) {
                                    textTyping(gaster, dialogues[2][lang[lang_id]][id_dialogue], "text")
                                } else if (recievedEgg == true) {
                                    textTyping(gaster, dialogues[2][lang[lang_id]][11], "text")
                                }
                            }
                        } else if (inConversation == true) {
                            if (id_convo == 3) {
                                textbox.style.display = "none";
                                text.style.display = "none";
                                id_convo = 0;
                                inConversation = false;
                            } else if (id_convo == 2) {
                                if (recievedEgg == false) {
                                    if (id_dialogue < 11) {
                                        textTyping(gaster, dialogues[2][lang[lang_id]][id_dialogue], "text")
                                    } else {
                                        recievedEgg = true;
                                        setCharacterSprite();
                                        textbox.style.display = "none";
                                        text.style.display = "none";
                                        id_convo = 0;
                                        inConversation = false;
                                    }
                                } else {
                                    textbox.style.display = "none";
                                    text.style.display = "none";
                                    id_convo = 0;
                                    inConversation = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});

var centerSign = false;
function showSign() {
    centerSign = true;
    scene.style.backgroundImage = "url('../../img/egg_zone_bg.png')";
}

var rudin1 = false;
function showRudin1() {
    rudin1 = true;
    scene.style.backgroundImage = "url('../../img/egg_zone_bg_e1.png')";
}

var rudin2 = false;
function showRudin2() {
    rudin2 = true;
    scene.style.backgroundImage = "url('../../img/egg_zone_bg_e2.png')";
}

var binoculars = false;
function showBinoculars() {
    binoculars = true;
    scene.style.backgroundImage = "url('../../img/egg_zone_bg_e3.png')";
}

function hideDialogue() {
    dialogueSigns.style.display = "none";
    talking = false;
    readingSign = false;
}

function addInBetween() {
    if (posX == 960) {
        inBetween++;
        console.log(inBetween);
    }
}

function checkInBetween() {
    if (inBetween == 5) {
        showSign();
    } else if (inBetween == 10) {
        showRudin1();
    } else if (inBetween == 15) {
        showRudin2();
    } else if (inBetween == 20) {
        showBinoculars();
    }
}