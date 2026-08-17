// v.0.8
// NO ABRAS ESTE CÓDIGO PARA BUSCAR LOS SECRETOS, NO SEAS TRAMPOSO QUE LE QUITA LA GRACIA
// porfi :(

const html = document.documentElement;
const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;
const textbox = document.getElementById("dialogue");
const textbox_b = document.getElementById("dialogue_b");
const dialoguetext_b = document.getElementById("dialoguetext_b");
const dialoguebox = document.getElementById("dialoguebox");
const artbox = document.getElementById("art");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");
const art = document.getElementById("art");
const art_displayed = document.getElementById("art_displayed");
const novu = document.getElementById("shopkeeper");
const btn = document.getElementById("enter_btn");
const shop = document.getElementById("shop");
const music_icon = document.getElementById("music_icon");
const guide_section = document.getElementById("guide");
const guide_icon = document.getElementById("guide_icon");
const dialoguebox_b = document.getElementById("dialoguebox_b");
const talk_menu = document.getElementById("dialogue_talkmenu")
const talk_comment = document.getElementById("talkcomment");
const optionsMenu = document.getElementById("options");
const optionsTalking = document.getElementById("options_talking");
const normalDialogue = document.getElementById("dialoguetext");
const info_section = document.getElementById("information");
const info_icon = document.getElementById("info_icon");
const PAUSE = 1500;

const ASSETS_TO_PRELOAD = [
    "img/shop/shop_background.gif",
    "img/shop/novu_looking_window.gif",
    "img/shop/novu_looking_traveler.gif",
    "img/shop/db_shop.png",
    "img/shop/db_shop_b.png"
];

function preloadAssets(list) {
    list.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadAssets(ASSETS_TO_PRELOAD);

var musicState = true;
var talking = false;
var isNovuStillTalking = false;
var inGuideSection = false;
var alreadyInShop = false;
var inConversation = false;
var artGallery = false;
var commissions = false;
var inTalkMenu = false;
var inInfoSection = false;
var finishedConversation = false;
var inTupilanDialogue = false;
var tupilanFirstTime = true;
var inCorvexDialogue = false;
var corvexFirstTime = true;
var novuFace = "looking_window"
var id_convo = 0;
var id_dialogue = 1;
var id_art = 1;
var heartSelected = 0;
var LOVE = 0;
var typingTimeoutId = null;
var typingBox = null;
var typingFullText = null;
var typingOnComplete = null;

window.addEventListener("resize", resizeScene);
window.addEventListener("resize", resizeEnterMenu);
window.addEventListener("load", resizeScene);
window.addEventListener("load", resizeEnterMenu);
btn.addEventListener("click", triggerFullscreen);

art_displayed.addEventListener("click", () => {
    if (inGuideSection == false && inInfoSection == false) {
        if (artGallery == true) {
            artZoomImg.src = art_displayed.src;
            artZoomOverlay.classList.add("active");
        }
    } else {
        console.log(`Can't do it because inGuideSection = ${inGuideSection}`)
    }
});

artZoomOverlay.addEventListener("click", () => {
    if (inGuideSection == false && inInfoSection == false) {
        if (artGallery == true) {
            artZoomOverlay.classList.remove("active");
        }
    } else
        console.log(`Can't do it because inGuideSection = ${inGuideSection}`)
});

var shopSong = new Audio("snd/shop_fei_theme.wav");

var snd_select = new Audio("snd/snd_select.wav")

var snd_lancer = new Audio("snd/snd_lancer.mp3")
snd_lancer.volume = 0.20;

var snd_txtlop = new Audio("snd/snd_txtlop.wav")
snd_txtlop.volume = 0.30;

var snd_txtrie = new Audio("snd/snd_txtrie.wav")
snd_txtrie.volume = 0.25;

var textsound = new Audio("snd/snd_text.wav")

var talksound = new Audio("snd/snd_txtral.wav")

const lang = {
    1: "en",
    2: "es"
};

var lang_id = 1;

const menuOptions = {
    0: {
        en: {
            1: "About Me",
            2: "Talk",
            3: "My Art",
            4: "Comms",
            5: "DeltaESP"
        },

        es: {
            1: "Sobre mí",
            2: "Hablar",
            3: "Mi arte",
            4: "Comis",
            5: "DeltaESP"
        }
    },

    1: {
        en: {
            1: "ENG"
        },

        es: {
            1: "ESP"
        }
    },

    2: {
        en: {
            1: "ENGLISH",
            2: "SPANISH",
            3: "> ENTER <"
        },
        es: {
            1: "INGLÉS",
            2: "ESPAÑOL",
            3: "> ENTRAR <"
        }
    },

    3: {
        en: {
            1: "Dubbing",
            2: "Music",
            3: "Contact",
            4: "Buy",
            5: "Window",
            6: "Exit"
        },

        es: {
            1: "Doblaje",
            2: "Música",
            3: "Contactar",
            4: "Comprar",
            5: "Ventana",
            6: "Salir"
        }
    },
}

const guide_texts = {
    0: {
        en: {
            1: "How to Interact",
            2: "Pictures",
            3: "Others",
        },

        es: {
            1: "Cómo interactuar",
            2: "Fotos",
            3: "Otros",
        }
    },

    1: {
        en: {
            1: "UP",
            2: "DOWN",
            3: "LEFT",
            4: "RIGHT",
            5: "SPACE",
            6: "CLICKING THIS TEXT"
        },
        es: {
            1: "ARRIBA",
            2: "ABAJO",
            3: "IZQUIERDA",
            4: "DERECHA",
            5: "BARRA ESPACIADORA",
            6: "HACER CLIC A ESTE TEXTO"
        }
    },

    2: {
        en: {
            1: "Move the HEART through the options menu",
            2: "Interact with selected option / Next dialogue",
            3: "Move between the different pictures",
            4: "Leave the picture showcase mode",
            5: "Press [G] to open/close guide",
            6: "Press [M] to mute/unmute music",
            7: "Close the guide window (it will suffer)",
            8: "Press [I] to open/close info"
        },

        es: {
            1: "Mover el CORAZÓN en el menú de opciones",
            2: "Interactuar con la opción señalada / Pasar diálogo",
            3: "Cambiar la imagen mostrada",
            4: "Salir del modo exposición artística",
            5: "Pulsa [G] para abrir/cerrar la guía",
            6: "Pulsa [M] para activar/desactivar la música",
            7: "Cerrar la ventana (sufrirá)",
            8: "Pulsa [I] para abrir/cerrar la info"
        }
    },

    3: {
        en: {
            1: "* You can use your mouse to navigate",
            2: "* Clicking with your mouse also works / There are some scenes that autoplay",
            3: "* Click on a picture to zoom, click anywhere to close it",
            4: "* Or click the ? icon (top left)",
            5: "* Or click the music icon (top left)",
            6: "* Or click the information icon (top left)"
        },

        es: {
            1: "* Puedes usar el ratón para navegar",
            2: "* Hacer clic con el ratón también funciona / Algunas escenas son automáticas",
            3: "* Haz clic en una imagen para ampliar, hazlo de nuevo para cerrarla",
            4: "* O haz clic en el icono ? (arriba a la izquierda)",
            5: "* O haz clic en el icono musical (arriba a la izquierda)",
            6: "* O haz clic en el icono de información (arriba a la izquierda)"
        }
    },

    4: {
        en: {
            1: "You're a terrible person."
        },

        es: {
            1: "Eres una persona horrible."
        }
    }
}

const info_texts = {
    0: {
        en: {
            1: "Social Media:",
            2: "About this website:"
        },
        es: {
            1: "Redes sociales:",
            2: "Sobre la página web:"
        }
    },
    1: {
        en: {
            1: "My Twitter/X art account:",
            2: "My Twitter/X dubbing account:",
            3: "My Instagram account:",
            4: "My Discord account:"
        },
        es: {
            1: "Mi cuenta de arte en Twitter/X:",
            2: "Mi cuenta de doblaje en Twitter/X:",
            3: "Mi cuenta de Instagram:",
            4: "Mi cuenta de Discord:"
        }
    },
    2: {
        en: {
            1: "This website was built by",
            2: "(HTML, CSS, JavaScript and Jquery)",
            3: "Art made by",
            4: "Music made by"
        },
        es: {
            1: "Esta web ha sido programada por:",
            2: "(HTML, CSS, JavaScript y Jquery)",
            3: "Arte realizado por",
            4: "Música realizada por"
        }
    }
}

const conversations = {
    0: {
        en: {
            1: "A wandering Teru Teru appeared. . ."
        },

        es: {
            1: "Un muñequín Teru Teru ambulante ha aparecido. . ."
        }
    },
    1: {
        en: {
            1: "I am Novu, a digital artist, voice actor and  many other things.",
            2: "If you're here, maybe you want to check the other options to see my work.",
            3: ". . .",
            4: "yes I like deltarune"
        },

        es: {
            1: "Soy Novu, artista digital, hago doblaje y también otras tantas cosas.",
            2: "Ya que estás aquí, quizá podrías mirar un poco el resto de opciones.",
            3: ". . .",
            4: "sí vale me gusta Deltarune ya lo he dicho."
        }
    },
    2: {
        en: {
            1: "Your art? What??",
            2: "Listen, you can't just come by my shop and self promo-",
            3: "Oh, you meant MY art??",
            4: "Yeah, maybe I shoulda change that.",
            5: "(The Teru Teru show you their MY ART.)",
            6: "(To explain how to change the picture, they try to gesture with their hands. . .)",
            7: "(Then realizes that they don't have hands.)",
            8: "(So you'll never know that you can use the arrows to change the image.)",
            9: "(Then! They try to show you with their arms that if you click on it. . .)",
            10: "(Oh, yeah. . . Missing ones too. . .)",
            11: "(I guess you just don't need to zoom in.)",
            12: "(Maybe if this dialogue didn't exist, they could say it verbally.)",
            13: "(It's a shame. . . If only someone could explain it to you.)",
            14: "(Btw, press SPACE when you're done.)"
        },

        es: {
            1: "¿Tu arte? ¿¿Qué dices??",
            2: "Mira, no puedes ir a tiendas ajenas a promocionarte de esta man-",
            3: "Oh, ¿¿te referías a MI arte??",
            4: "Ya, quizá sería mejor si cambiase eso.",
            5: "(El muñequín Teru Teru te enseña su MI ARTE.)",
            6: "(Para explicarte cómo cambiar la imagen, intenta gesticular con las manos. . .)",
            7: "(Tras eso, se da cuenta de que no tiene manos.)",
            8: "Nunca sabrás que puedes cambiar las imágenes con las flechas.",
            9: "(¡Acto seguido! Intenta usar sus brazos para explicarte que si haces clic en la. . .)",
            10: "(Oh, ya. . . Para eso estaría bien tener brazos. . .)",
            11: "(Supongo que tampoco te hace falta hacer zoom.)",
            12: "(En retrospectiva, si este diálogo no existiera, te lo habría explicado verbalmente.)",
            13: "(Pues vaya. . . Una lástima que nadie pueda explicártelo.)",
            14: "(Por cierto, pulsa ESPACIO cuando hayas terminado.)"
        }
    },
    3: {
        en: {
            1: "Comms?",
            2: "Oh, yeah, this is like a shop or something. These are my commision tables.",
            3: "You can use the arrows to change between pictures.",
            4: "If you need to look for more examples, maybe I can show you MY ART.",
            5: ". . .",
            6: "Well, go on, you can look and then don't buy anything!",
            7: "Then leave meanwhile we're looking each other unconfortably. . .",
            8: "Don't worry. We all had been in your situation. No pressure.",
            9: "Anyways, if you want to buy something, you better talk me on other places.",
            10: "I heard that Discord may be cool.",
            11: "(Press SPACE when you're done.)"
        },

        es: {
            1: "¿Comis? ",
            2: "Ah, claro, que se supone que esto es una tienda. Esta es mi tabla de comisiones.",
            3: "Puedes usar las flechas para cambiar entre imágenes.",
            4: "Si necesitas más ejemplos, podrías echarle un ojo a MI ARTE.",
            5: ". . .",
            6: "En fin, venga va, ¡ve a echar un vistazo durante un rato y luego no compres nada!",
            7: "Acto seguido te irás de la tienda mientras nos miramos incómodamente.",
            8: "Tranqui. Todos hemos estado en esa situación. Sin presiones.",
            9: "De todas formas, si quieres comprar algo, es mejor hablarme por otros sitios.",
            10: "Me han dicho que Discord mola, no se traga los mensajes.",
            11: "(Pulsa ESPACIO cuando hayas terminado de echar un vistazo.)"
        }
    },
    4: {
        en: {
            1: "DeltaESP? Yeah, I can talk about it. But it doesn't make sense if we're talking in english. . .",
            2: "Basically, I work as a translator alongside ArceUseless.",
            3: "We translated to Castilian Spanish a lot of things UT/DR related.",
            4: "Right now, we did Undertale, Deltarune, Ribbit, UT!Yellow. . . and more!",
            5: "You can check it on our website. Click on this image, it's linked to the website.",
            6: "Don't ask me why or how, it's beyond me."
        },

        es: {
            1: "¿DeltaESP? Pensaba que nunca preguntarías.",
            2: "Básicamente, es un proyecto de traducción en el que traducimos ArceUseless y yo.",
            3: "Principalmente solemos traducir cosas relacionadas con UT/DR.",
            4: "Ahora mismo, hemos traducido Undertale, Deltarune, Ribbit, Undertale Yellow. . . ¡y más! ",
            5: "Puedes revisar todo nuestro trabajo en nuestra página web. Pulsa esta imagen, te llevará a la web.",
            6: "No me preguntes cómo ni por qué, me supera."
        }
    },

    5: {
        en: {
            1: "* Y'know these are programmed answers, right?"
        },

        es: {
            1: "* No estoy aquí de verdad, ¿lo sabes, no?"
        }
    },

    6: {
        en: {
            1: "At some point in my life, I discovered that I'm passionate about voice acting.",
            2: "I think I started reading character's lines out loud when I was playing video games.",
            3: "Eventually, I realized how much fun it was. . .",
            4: "And in a way, it also made me feel good.",
            5: "It was like giving a part of myself to characters I liked.",
            6: "I started training in voice acting a few years ago, and I dream of being able to make a career out of it.",
            7: "If you'd like to see a little of what I do, you can check out my voice acting account in the information panel. Just remember it's Spanish."
        },

        es: {
            1: "En algún momento de mi vida descubrí que me apasiona doblar.",
            2: "Creo que empecé a leer diálogos de personajes en voz alta cuando jugaba videojuegos.",
            3: "Al final me di cuenta de lo divertido que era. . .",
            4: "Y de cierta forma también me hacía sentir bien.",
            5: "Era como dar una parte de mí a personajes que me gustaban.",
            6: "Empecé a formarme en doblaje hace unos años y sueño con poder dedicarme a ello.",
            7: "Si te apetece ver un poco lo que hago, puedes revisar mi cuenta de doblaje en el panel de información."
        }
    },

    7: {
        en: {
            1: "I've always had a strange relationship with music.",
            2: "I know how to play the piano, and I was also learning to play the guitar. . .",
            3: "Although I never play the piano in front of anyone. . . I just can't do it.",
            4: "It's something I've gradually let slide over time. . .",
            5: "And in the end, I only play a song every once in a while.",
            6: "However, I've always been interested in composing.",
            7: "I recently started trying to learn how to use FL Studio.",
            8: "I made the song you hear in the background with that program. It was my first project.",
            9: "The melody was composed by a friend who goes by Er1z0 on social media, so is it actually kind of a remix?",
            10: "I don't think so. . .",
            11: "Right now it's a bit simple and rough. But if I keep getting better at using the program, maybe I'll update it.",
            12: "I'm excited to see if I can make some cool stuff. If I manage to, I'll post it on social media.",
            13: "Btw, the original melody that Er1z0 made is hidden somewhere on this website.",
            14: "Let's see if you can find it."
        },

        es: {
            1: "Siempre he tenido una relación extraña con la música.",
            2: "Sé tocar el piano, y también estuve aprendiendo la guitarra. . .",
            3: "Aunque nunca toco el piano en frente de nadie, no me sale.",
            4: "Fue algo que con el tiempo he ido dejando de lado poco a poco. . .",
            5: "Y al final tan solo toco alguna canción muy de vez en cuando.",
            6: "Sin embargo, siempre me ha interesado componer.",
            7: "Hace poco empecé a intentar aprender a usar FL Studio.",
            8: "He hecho la canción que oyes de fondo con ese programa, ha sido mi primer proyecto.",
            9: "La melodía la compuso un amigo que en redes se llama Er1z0, ¿así que en realidad es como un remix?",
            10: "Creo que no exactamente. . .",
            11: "Ahora mismo es un poco simple y tosca. Pero si voy mejorando con el programa, quizá la voy actualizando.",
            12: "Tengo ganas de ver si puedo hacer cosas guays. Si lo consigo, lo iré poniendo por redes.",
            13: "Por cierto, la melodía original que hizo Er1z0 está escondida en algún lugar de la web.",
            14: "A ver si la encuentras."
        }
    },

    8: {
        en: {
            1: "Oh, right. . .",
            2: "If you want to contact me, the best option is Discord. My username is @novuholo.",
            3: "Otherwise, you can always reach me on platforms like Instagram or Twitter. Check the information panel if you're interested.",
            4: "Sometimes messages and notifications get lost, in between, but I usually keep an eye on them.",
            5: "And. . . not much else. If you give me a follow, I'll be infinitely grateful."
        },

        es: {
            1: "Ah, claro. . .",
            2: "Si quieres contactarme, la mejor opción es Discord. Mi usuario es @novuholo.",
            3: "Si no, siempre puedes hacerlo por algún lugar como Instagram o Twitter. Revisa el panel de información si te interesa.",
            4: "A veces se tragan los mensajes y notificaciones, pero suelo estar un poco pendiente.",
            5: "Y. . . No mucho más. Si me regalas un follow pues te lo agradeceré infinito."
        }
    },

    9: {
        en: {
            1: "Wanna buy something?",
            2: "Well, I hope you know that the money you have in the interface is USELESS to you.",
            3: "I'm sorry to disappoint you, but can you imagine me going out to buy something with that?",
            4: "Not really.",
            5: "Anyway, if you want to buy something from me, it's best to CONTACT me through another site.",
            6: "If it can be with real money, even better."
        },

        es: {
            1: "¿Quieres comprarme algo?",
            2: "Bueno, espero que sepas que ese dinero que tienes en la interfaz no te sirve de nada.",
            3: "Siento decepcionarte, pero imagíname a mí yendo a comprar algo con eso.",
            4: "Como que no.",
            5: "En fin, si quieres comprarme algo, es mejor CONTACTARme por otro lado.",
            6: "Si puede ser con dinero real, mejor."
        }
    },

    10: {
        en: {
            1: "I like looking out this window. The light on the other side is mesmerizing.",
            2: "To be honest, I'm not really sure where I am right now.",
            3: "It looks like a train? I don't know where I'm going or when it's going to leave either.",
            4: "We're here... and that's it.",
            5: "Everything seems full of ideas. . . Maybe they've materialized? Is it because of the train?",
            6: "I wonder where it's going or what's behind the window to begin with.",
            7: "Lately, I've started paying more attention to foreign colors",
            8: "To all the light that might catch my eye.",
            9: "Sometimes. . . It's just cool to look out the window and gaze at what's out there.",
            10: "Sometimes it inspires me, sometimes it irritates me.",
            11: "But the window also scares me. It's cool to look through it, but. . .",
            12: "Maybe without realizing it, I stay there too long. . .",
            13: ". . . and I miss my stop.",
            14: "If I haven't already.",
            15: "But in the meantime, I guess the window is cool."
        },

        es: {
            1: "Me gusta mirar por esta ventana. La luz que hay al otro lado resulta hechizante.",
            2: "La verdad es que no sé muy bien dónde estoy ahora mismo.",
            3: "¿Parece un tren? Tampoco sé a dónde iré ni cuándo va a arrancar.",
            4: "Estamos aquí. . . y ya.",
            5: "Todo parece lleno de ideas, ¿quizá materializadas? ¿Será cosa del tren?",
            6: "Me pregunto a dónde irá o que es lo que hay tras la ventana para empezar.",
            7: "Últimamente me he empezado a fijar más en los colores ajenos.",
            8: "En toda la luz incidente que pueda llegar a atraparme.",
            9: "A veces. . . simplemente mola mirar por la ventana y contemplar lo que hay.",
            10: "A veces me inspira, a veces me irrita.",
            11: "Pero la ventana también me asusta. Mola mirar por ella pero. . .",
            12: "Quizá sin darme cuenta, me quedo demasiado tiempo. . .",
            13: ". . . y me salto mi parada.",
            14: "Si es que todavía no lo he hecho.",
            15: "Pero mientras tanto, supongo que la ventana mola."
        }
    },

    11: {
        en: {
            1: "That plushie? Idk, but he looks very, very, dumb. . .",
            2: "OK, that's actually my boyfriend. He's the one who built this website for me.",
            3: "Kinda funny if you think that he had to write that line calling himself dumb.",
            4: "Btw, he told me to say that the website was made with HTML, CSS, JavaScript and JQuery."
        },

        es: {
            1: "¿El peluche ese? Ni idea, pero parece que es mu tonto. . .",
            2: "VALE, en realidad es mi novio. Es quien ha programado esta página web para mí.",
            3: "Es gracioso teniendo en cuenta que ha tenido que escribir esa frase llamándose tonto.",
            4: "Por cierto, me ha dicho que diga que la web está hecha con HTML, CSS, JQuery y JavaScript."
        }
    },

    12: {
        en: {
            1: "lancer"
        },

        es: {
            1: "lancer"
        }
    },

    13: {
        en: {
            1: "My scarf? Yeah, it's cool.",
            2: "Over time, I've been getting new ones in different colors.",
            3: "I guess we could say each one represents something.",
            4: "And just like scarves, I have many other things.",
            5: "Each one waiting for its moment, its outfit, its way to express itself.",
            6: "That way, I could show off all my colors!",
            7: "I could wear and put on anything.",
            8: "I could be whatever I want.",
            9: "I could. . .",
            10: "But in the end, I always end up wearing the same one."
        },

        es: {
            1: "¿Mi pañuelo? Sí, está guay.",
            2: "Con el tiempo he ido consiguiendo nuevos y de distintos colores.",
            3: "Supongo que podríamos decir que cada uno representa una cosa.",
            4: "E igual que pañuelos, tengo otras tantas cosas.",
            5: "Cada una esperando su momento, su conjunto, su expresividad.",
            6: "De esa forma, ¡podría mostrar todos mis colores!",
            7: "Podría llevar y ponerme cualquier cosa.",
            8: "Podría ser lo que me apetezca.",
            9: "Podría. . .",
            10: "Pero al final siempre acabo usando el mismo."
        }
    },

    14: {
        en: {
            1: "No idea how I ended up here."
        },

        es: {
            1: "No sé cómo he llegado aquí."
        }
    },

    15: {
        en: {
            1: "Where are Riley and Rue?"
        },

        es: {
            1: "¿Dónde están Riley y Rue?"
        }
    },

    16: {
        en: {
            1: "(Tupil.)",
            2: "(Yes, you read that right.)",
            3: "(The flower's name is Tupil.)"
        },

        es: {
            1: "(Tupilán.)",
            2: "(Sí, has leído bien.)",
            3: "(La flor se llama Tupilán.)"
        }
    },

    17: {
        en: {
            1: "There may be quite a few people who know me for translating Deltarune into Spanish.",
            2: "Although it's still unofficial for now, of course.",
            3: "I'm so happy that people are really enjoying it and that we've built such a great audience.",
            4: "Besides, DeltaESP has become very important to me. . .",
            5: "It's the most important and coolest project I've done so far.",
            6: "But at the same time, I can't help but wonder about things like. . .",
            7: "Will I be someone when Deltarune is over?",
            8: "Do people admire me for my work or for Deltarune?",
            9: "Will I be able to do anything beyond Deltarune?",
            10: "To be honest, these are questions that bother me a little.",
            11: "I think I have a bit of imposter syndrome.",
            12: "Lately, I've seen a lot of people who admire me and are excited to meet me. . .",
            13: ". . . just to talk to me. . .",
            14: "I find that hard to believe.",
            15: "But I guess I should be happy.",
            16: "I want to believe that people also value me as a person.",
            17: "And it would be great if they could also enjoy other things I have to offer."
        },

        es: {
            1: "Quizá haya varios que me conocen por traducir Deltarune al español.",
            2: "Aunque por ahora sea de forma no oficial, claro. ",
            3: "Soy muy feliz de lo mucho que disfrutan de la traducción y del público que hemos conseguido.",
            4: "Además, DeltaESP se ha convertido en algo muy importante para mí. . .",
            5: "Es el proyecto más importante y guay que he hecho hasta ahora.",
            6: "Pero a su vez, no puedo evitar preguntarme cosas como. . .",
            7: "¿Seré alguien cuando acabe Deltarune?",
            8: "¿La gente me admira por mi trabajo o por Deltarune?",
            9: "¿Podré hacer algo más allá de Deltarune?",
            10: "Son preguntas que me atormentan un poco, la verdad.",
            11: "Creo que tengo un poco de síndrome del impostor.",
            12: "Recientemente he visto a mucha gente que me admira y que se emociona por conocerme. . .",
            13: ". . . por simplemente hablar conmigo. . .",
            14: "Me cuesta creerlo.",
            15: "Pero supongo que debería estar feliz.",
            16: "Quiero creer que la gente también me valora como persona.",
            17: "Y sería genial que puedan disfrutar también del resto de cosas que tengo por ofrecer."
        }
    },

    18: {
        en: {
            1: "Heh. I wonder if I'll ever be able to introduce him to you properly.",
            2: "I have big plans for this character. He's very special to me.",
            3: "I don't think I've ever created anything so personal.",
            4: "For now, I can't tell you much about it. . .",
            5: "But every day I dream of making this project a reality.",
            6: "It still seems a long way off, but who knows?",
            7: "Maybe someday you'll get to see him move in all his splendor.",
            8: "That's my dream."
        },

        es: {
            1: "Je. Me pregunto si algún día te lo podré presentar correctamente.",
            2: "Tengo grandes planes para este personaje. Es muy especial para mí.",
            3: "Creo que nunca he creado nada tan personal.",
            4: "Por ahora no puedo hablarte mucho del tema. . .",
            5: "Pero cada día sueño con hacer realidad este proyecto.",
            6: "Aún lo veo muy en el horizonte, ¿pero quién sabe?",
            7: "Quizá algún día puedas verle moverse en todo su esplendor.",
            8: "Ese es mi sueño."
        }
    }
};

function changeLanguage(lang_selected) {
    playSelectSound()
    lang_id = lang_selected;
    console.log(`Language changed to: ${lang[lang_id]} with id: ${lang_id}`);

    if (lang_id == 1) {
        document.getElementById("en_option").classList.add("selected");
        document.getElementById("es_option").classList.remove("selected");
        document.getElementById("money").textContent = "$2912";
        document.title = "??????";
    } else if (lang_id == 2) {
        document.getElementById("es_option").classList.add("selected");
        document.getElementById("en_option").classList.remove("selected");
        document.title = "¿¿¿???";
        document.getElementById("money").textContent = "2912€";
    }

    document.getElementById("en_option").textContent = menuOptions[2][lang[lang_id]][1];
    document.getElementById("es_option").textContent = menuOptions[2][lang[lang_id]][2];
    document.getElementById("enter_btn").textContent = menuOptions[2][lang[lang_id]][3];

    document.getElementById("aboutme").innerHTML = `<span>I</span>${menuOptions[0][lang[lang_id]][1]}`;
    document.getElementById("talk").innerHTML = `<span>I</span>${menuOptions[0][lang[lang_id]][2]}`;
    document.getElementById("myart").innerHTML = `<span>I</span>${menuOptions[0][lang[lang_id]][3]}`;
    document.getElementById("comms").innerHTML = `<span>I</span>${menuOptions[0][lang[lang_id]][4]}`;
    document.getElementById("deltaesp").innerHTML = `<span>I</span>${menuOptions[0][lang[lang_id]][5]}`;

    document.getElementById("dubbing").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][1]}`;
    document.getElementById("music").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][2]}`;
    document.getElementById("contact").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][3]}`;
    document.getElementById("buy").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][4]}`;
    document.getElementById("window").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][5]}`;
    document.getElementById("exit").innerHTML = `<span>I</span>${menuOptions[3][lang[lang_id]][6]}`;

    document.getElementById("guide_title1").textContent = `${guide_texts[0][lang[lang_id]][1]}:`;
    document.getElementById("guide_title2").textContent = `${guide_texts[0][lang[lang_id]][2]}:`;
    document.getElementById("guide_title3").textContent = `${guide_texts[0][lang[lang_id]][3]}:`;

    document.getElementById("guide_up").textContent = guide_texts[1][lang[lang_id]][1];
    document.getElementById("guide_down").textContent = guide_texts[1][lang[lang_id]][2];
    document.getElementById("guide_left").textContent = guide_texts[1][lang[lang_id]][3];
    document.getElementById("guide_right").textContent = guide_texts[1][lang[lang_id]][4];
    document.getElementById("guide_space1").textContent = guide_texts[1][lang[lang_id]][5];
    document.getElementById("guide_space2").textContent = guide_texts[1][lang[lang_id]][5];
    document.getElementById("guide_click").textContent = guide_texts[1][lang[lang_id]][6];

    document.getElementById("guide_desc1").textContent = guide_texts[2][lang[lang_id]][1];
    document.getElementById("guide_desc2").textContent = guide_texts[2][lang[lang_id]][2];
    document.getElementById("guide_desc3").textContent = guide_texts[2][lang[lang_id]][3];
    document.getElementById("guide_desc4").textContent = guide_texts[2][lang[lang_id]][4];
    document.getElementById("guide_desc5").textContent = guide_texts[2][lang[lang_id]][5];
    document.getElementById("guide_desc6").textContent = guide_texts[2][lang[lang_id]][6];
    document.getElementById("guide_desc7").textContent = guide_texts[2][lang[lang_id]][7];
    document.getElementById("guide_desc8").textContent = guide_texts[2][lang[lang_id]][8];

    document.getElementById("guide_side1").textContent = guide_texts[3][lang[lang_id]][1];
    document.getElementById("guide_side2").textContent = guide_texts[3][lang[lang_id]][2];
    document.getElementById("guide_side3").textContent = guide_texts[3][lang[lang_id]][3];
    document.getElementById("guide_side4").textContent = guide_texts[3][lang[lang_id]][4];
    document.getElementById("guide_side5").textContent = guide_texts[3][lang[lang_id]][5];
    document.getElementById("guide_side6").textContent = guide_texts[3][lang[lang_id]][6];

    document.getElementById("psychopath").textContent = guide_texts[4][lang[lang_id]][1];

    document.getElementById("info_title1").textContent = info_texts[0][lang[lang_id]][1];
    document.getElementById("info_title2").textContent = info_texts[0][lang[lang_id]][2];

    document.getElementById("info_line1").textContent = info_texts[1][lang[lang_id]][1];
    document.getElementById("info_line2").textContent = info_texts[1][lang[lang_id]][2];
    document.getElementById("info_line3").textContent = info_texts[1][lang[lang_id]][3];
    document.getElementById("info_line4").textContent = info_texts[1][lang[lang_id]][4];

    document.getElementById("info_line5").textContent = info_texts[2][lang[lang_id]][1];
    document.getElementById("info_line6").textContent = info_texts[2][lang[lang_id]][2];
    document.getElementById("info_line7").textContent = info_texts[2][lang[lang_id]][3];
    document.getElementById("info_line8").textContent = info_texts[2][lang[lang_id]][4];

    document.getElementById("lang_icon").textContent = menuOptions[1][lang[lang_id]][1];

    if (alreadyInShop == true) {
        if (lang_id == 1) {
            document.title = "NOVU'S SHOP";
        } else if (lang_id == 2) {
            document.title = "TIENDA DE NOVU";
        }
    }
}

function checkAndChangeLanguage() {
    if (lang_id == 1) {
        lang_id = 2;
    } else if (lang_id == 2) {
        lang_id = 1;
    }
    changeLanguage(lang_id);
}

function playSelectSound() {
    const snd = snd_select.cloneNode();
    snd.volume = 0.30;

    snd.play();
}

function playTextsound() {
    const text = textsound.cloneNode();
    text.volume = 0.30;

    text.play();
}

function playTalksound() {
    const talk = talksound.cloneNode();
    talk.volume = 0.30;

    talk.play();
}

function textTyping(textbox, dialogue, soundNeeded, i = 0, onComplete = null) {
    if (i === 0) {
        textbox.textContent = "";
        talking = true;
        typingBox = textbox;
        typingFullText = dialogue;
        typingOnComplete = onComplete;
    }

    if (dialogue[i] != " " && dialogue[i] != "." /* ...unchanged... */) {
        if (soundNeeded == "text") playTextsound();
        else if (soundNeeded == "talk") playTalksound();
    }
    textbox.textContent += dialogue[i];

    if (i === dialogue.length - 1) {
        talking = false;
        id_dialogue++;
        typingBox = null;
        if (onComplete) onComplete();
        return;
    }

    typingTimeoutId = setTimeout(() => textTyping(textbox, dialogue, soundNeeded, i + 1, onComplete), 50);
}

function resizeScene() {
    const scene = document.getElementById("scene");
    const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
    );
    scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function resizeEnterMenu() {
    const enterMenu = document.getElementById("enter_menu");
    const scale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT
    );
    enterMenu.style.transform = `translate(-50%, -50%) scale(${scale})`;
    enterMenu.style.opacity = "1";
}

function triggerFullscreen() {
    preloadAssets(ASSETS_TO_PRELOAD);
    alreadyInShop = true;

    shopSong.volume = 0.20;
    shopSong.loop = true;
    shopSong.play().catch(console.error);

    if (html.requestFullscreen) {
        html.requestFullscreen();
    } else if (html.webkitRequestFullscreen) {
        html.webkitRequestFullscreen();
    } else if (html.msRequestFullscreen) {
        html.msRequestFullscreen();
    }

    if (lang_id == 1) {
        document.title = "NOVU'S SHOP";
    } else if (lang_id == 2) {
        document.title = "TIENDA DE NOVU";
    }

    btn.hidden = true;
    document.getElementById("enter_menu").style.display = "none";
    shop.style.display = "flex";
    playSelectSound();

    resizeScene();

    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")
}

function hideHeart(heartId) {
    $(`#heart${heartId}`).addClass("notSelected");
    $(`#heart${heartId}`).removeClass("selected");
}

function showHeart(heartId) {
    $(`#heart${heartId}`).addClass("selected");
    $(`#heart${heartId}`).removeClass("notSelected");
}

function changeArtSrc(art_id) {
    art_displayed.style.opacity = "0";

    setTimeout(() => {
        art_displayed.src = art_id;
        art_displayed.onload = () => {
            art_displayed.style.opacity = "1";
        };

        if (artZoomOverlay.classList.contains("active")) {
            artZoomImg.src = art_id;
        }
    }, 200);
}

function playDialogueSequence(soundTypes, index = 0) {
    if (index >= soundTypes.length) {
        setTimeout(() => { isNovuStillTalking = false; }, PAUSE);
        return;
    }
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], soundTypes[index], 0, () => {
        setTimeout(() => playDialogueSequence(soundTypes, index + 1), PAUSE);
    });
}

function autoPlay_commsScene() {
    playDialogueSequence(["talk", "talk", "talk", "talk", "talk", "talk", "talk", "talk", "talk", "text"]);
}

function autoPlay_artScene() {
    playDialogueSequence(["text", "text", "text", "text", "text", "text", "text", "text", "text", "text"]);
}

function changeSelection(pointing) {
    if (inConversation == false) {
        if (artGallery == false) {
            if (commissions == false) {
                if (isNovuStillTalking == false) {
                    hideHeart(heartSelected);
                    heartSelected = pointing;
                    showHeart(heartSelected);
                }
            }
        }
    }
};

function AboutMe() {
    if (dogcheck() == true) {
        changeSelection(0);
        changeNovuFace();

        setConvoAndDialogueIDs(1, 1)
        inConversation = true;

        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
    }
}

function MyArt() {
    if (dogcheck() == true) {
        changeSelection(2);
        changeNovuFace();

        setConvoAndDialogueIDs(2, 1)
        inConversation = true;

        changeArtSrc(`img/art/novu_art (${id_art}).png`);
        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
    }
}

function Comms() {
    if (dogcheck() == true) {
        changeSelection(3);
        changeNovuFace();

        setConvoAndDialogueIDs(3, 1)
        inConversation = true;
        commissions = true;

        changeArtSrc(`img/comms/comms (${id_art}).png`);
        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
    }
}

function DeltaESP() {
    if (dogcheck() == true) {
        changeSelection(4);
        changeNovuFace();

        setConvoAndDialogueIDs(4, 1)
        inConversation = true;

        changeArtSrc(`img/deltaesp-icon.png`);
        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
    }
}

$(function () {
    $(document).keydown(function (e) {
        var key = (e.key).toUpperCase();
        if (alreadyInShop == false) {
            if (key == "ENTER") {
                triggerFullscreen();
            }
        } else if (alreadyInShop == true) {
            if (key == "M") {
                changeMusic();
            } else if (key == "G") {
                openGuide();
            } else if (key == "I") {
                openInfo();
            } else if (key == "L") {
                checkAndChangeLanguage();
            } else if (key == "X") {
                skipTyping();
            }

            if (inTalkMenu == false) {
                if (inGuideSection == false && inInfoSection == false) {
                    if (inConversation == false) {
                        if (artGallery == false) {
                            if ((key == "ARROWUP" || key == "W") && heartSelected > 0) {
                                hideHeart(heartSelected);
                                heartSelected--;
                                showHeart(heartSelected);
                            } else if ((key == "ARROWDOWN" || key == "S") && heartSelected < 4) {
                                hideHeart(heartSelected);
                                heartSelected++;
                                showHeart(heartSelected);
                            } else if (key == "Z" || key == "ENTER" || key == " ") {

                                if (talking == false) {
                                    if (heartSelected === 0) {
                                        AboutMe();
                                    } else if (heartSelected === 1) {
                                        checkTalkMenu()
                                    } else if (heartSelected === 2) {
                                        MyArt();
                                    } else if (heartSelected === 3) {
                                        Comms();
                                    } else if (heartSelected === 4) {
                                        DeltaESP();
                                    }
                                }
                            }
                        } else if (artGallery == true) {
                            if (commissions == false) {
                                if (key == "ARROWLEFT" || key == "A") {
                                    if (id_art <= 113 && id_art > 1) {
                                        id_art--;
                                        console.log(`artDisplayed: ${id_art}`)

                                        changeArtSrc(`img/art/novu_art (${id_art}).png`);
                                    } else {
                                        id_art = 113;
                                        console.log(`artDisplayed: ${id_art}`)

                                        changeArtSrc(`img/art/novu_art (${id_art}).png`);
                                    }
                                } else if (key == "ARROWRIGHT" || key == "D") {
                                    if (id_art >= 1 && id_art < 113) {
                                        id_art++;
                                        console.log(`artDisplayed: ${id_art}`)

                                        changeArtSrc(`img/art/novu_art (${id_art}).png`);
                                    } else {
                                        id_art = 1;
                                        console.log(`artDisplayed: ${id_art}`)

                                        changeArtSrc(`img/art/novu_art (${id_art}).png`);
                                    }
                                } else if (key == " ") {
                                    if (isNovuStillTalking == false) {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        artGallery = false;
                                        commissions = false;
                                        id_art = 1;

                                        art_displayed.classList.remove("clickable");
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")

                                        art.style.opacity = "0";
                                        setEasterEggsEnabled(true);
                                        setNovuBack();
                                        changeNovuFace();
                                        heartSelected = 0;
                                        artZoomOverlay.classList.remove("active");

                                        showHeart(heartSelected);
                                    }
                                }
                            } else if (commissions == true) {
                                if (key == "ARROWLEFT" || key == "A") {
                                    if (id_art <= 4 && id_art > 1) {
                                        id_art--;
                                        console.log(id_art)

                                        changeArtSrc(`img/comms/comms (${id_art}).png`);
                                    }

                                } else if (key == "ARROWRIGHT" || key == "D") {
                                    if (id_art >= 1 && id_art < 4) {
                                        id_art++;
                                        console.log(id_art)

                                        changeArtSrc(`img/comms/comms (${id_art}).png`);
                                    }
                                } else if (key == " ") {
                                    if (isNovuStillTalking == false) {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        artGallery = false;
                                        commissions = false;
                                        id_art = 1;

                                        art_displayed.classList.remove("clickable");
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")

                                        art.style.opacity = "0";
                                        setEasterEggsEnabled(true);
                                        setNovuBack();
                                        changeNovuFace();
                                        heartSelected = 0;
                                        artZoomOverlay.classList.remove("active");

                                        showHeart(heartSelected);
                                    }
                                }
                            }
                        }
                    } else if (inConversation == true) {
                        if (id_convo == 1) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 5) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                    } else {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        changeNovuFace();
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    }
                                }
                            }
                        } else if (id_convo == 2) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 5) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                    } else {
                                        inConversation = false;
                                        id_art = 1;
                                        artbox.style.display = "flex";
                                        artGallery = true;
                                        art_displayed.classList.add("clickable");
                                        art.style.opacity = "1";
                                        setEasterEggsEnabled(false);
                                        setNovuAside()
                                        $(`#heart${heartSelected}`).addClass("notSelected");
                                        isNovuStillTalking = true;
                                        autoPlay_artScene();
                                    }
                                }
                            }
                        } else if (id_convo == 3) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 2) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                    } else {
                                        inConversation = false;
                                        id_art = 1;
                                        artbox.style.display = "flex";
                                        artGallery = true;
                                        art_displayed.classList.add("clickable");
                                        art.style.opacity = "1";
                                        setEasterEggsEnabled(false);
                                        setNovuAside()
                                        $(`#heart${heartSelected}`).addClass("notSelected");
                                        isNovuStillTalking = true;
                                        autoPlay_commsScene();
                                    }
                                }
                            }
                        } else if (id_convo == 4) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 5 || id_dialogue == 6) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                    } else if (id_dialogue == 5) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                        artbox.style.display = "flex";
                                        art_displayed.setAttribute("onclick", "location.reload();location.href='https://deltaesp.site'");
                                        art_displayed.classList.add("clickable");
                                        art.style.opacity = "1";
                                        setEasterEggsEnabled(false);
                                        setNovuAside()
                                        $(`#heart${heartSelected}`).addClass("notSelected");
                                    } else {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")
                                        art_displayed.removeAttribute("onclick")
                                        art_displayed.classList.remove("clickable");
                                        art.style.opacity = "0";
                                        setEasterEggsEnabled(true);
                                        setNovuBack();
                                        changeNovuFace();
                                        heartSelected = 0;
                                        showHeart(heartSelected);
                                    }
                                }
                            }
                        } else if (inCorvexDialogue == true) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (corvexFirstTime == true) {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        corvexFirstTime = false;
                                        inCorvexDialogue = false;
                                        changeNovuFace();
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    } else if (corvexFirstTime == false) {
                                        if (id_dialogue < 5) {
                                            textTyping(textbox, conversations[11][lang[lang_id]][id_dialogue], "talk")
                                        } else {
                                            id_convo = 0;
                                            id_dialogue = 1;
                                            inConversation = false;
                                            corvexFirstTime = false;
                                            inCorvexDialogue = false;
                                            changeNovuFace();
                                            textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                        }
                                    }
                                }
                            }
                        } else if (id_convo === 12 || id_convo === 14 || id_convo == 15) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    id_convo = 0;
                                    id_dialogue = 1;
                                    inConversation = false;
                                    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                }
                            }
                        } else if (id_convo == 13) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 11) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk");
                                    } else {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        changeNovuFace();
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    }
                                }
                            }
                        } else if (inTupilanDialogue == true) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (tupilanFirstTime == true) {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        tupilanFirstTime = false;
                                        inTupilanDialogue = false;
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    } else if (tupilanFirstTime == false) {
                                        if (id_dialogue < 4) {
                                            textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")
                                        } else {
                                            id_convo = 0;
                                            id_dialogue = 1;
                                            inConversation = false;
                                            tupilanFirstTime = false;
                                            inTupilanDialogue = false;
                                            textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                        }
                                    }
                                }
                            }
                        } else if (id_convo === 17) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 18) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                    } else {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        changeNovuFace();
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    }
                                }
                            }
                        } else if (id_convo === 18) {
                            if (key == "Z" || key == "ENTER" || key == " ") {
                                if (talking == false) {
                                    if (id_dialogue < 9) {
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                    } else {
                                        id_convo = 0;
                                        id_dialogue = 1;
                                        inConversation = false;
                                        changeNovuFace();
                                        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text");
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (key != "I" && key != "TAB") {
                        console.log(`Can't do it because inGuideSection = ${inGuideSection}`)
                    }
                }
            } else if (inTalkMenu == true) {
                if ((key == "ARROWUP" || key == "W") && heartSelected > 5) {
                    hideHeart(heartSelected);
                    heartSelected--;
                    showHeart(heartSelected);
                } else if ((key == "ARROWDOWN" || key == "S") && heartSelected < 10) {
                    hideHeart(heartSelected);
                    heartSelected++;
                    showHeart(heartSelected);
                } else if (key == "Z" || key == "ENTER" || key == " ") {
                    if (talking == false) {
                        if (inConversation == false) {
                            if (heartSelected === 5) {
                                talkConversation(6, 1);
                            } else if (heartSelected === 6) {
                                talkConversation(7, 1);
                            } else if (heartSelected === 7) {
                                talkConversation(8, 1);
                            } else if (heartSelected === 8) {
                                talkConversation(9, 1);
                            } else if (heartSelected === 9) {
                                talkConversation(10, 1);
                            } else if (heartSelected === 10) {
                                triggerShopMenu();
                            }
                        } else if (inConversation == true) {
                            if (id_convo === 6) {
                                if (id_dialogue < 8) {
                                    textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                } else {
                                    inConversation = false;
                                    finishedConversation = true;
                                    changeNovuFace()
                                    changeDialogueBox("menu")
                                }
                            } else if (id_convo === 7) {
                                if (id_dialogue < 15) {
                                    textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                } else {
                                    inConversation = false;
                                    finishedConversation = true;
                                    changeNovuFace()
                                    changeDialogueBox("menu")
                                }
                            } else if (id_convo === 8) {
                                if (id_dialogue < 4) {
                                    textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                } else {
                                    inConversation = false;
                                    finishedConversation = true;
                                    changeNovuFace()
                                    changeDialogueBox("menu")
                                }
                            } else if (id_convo === 9) {
                                if (id_dialogue < 7) {
                                    textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                } else {
                                    inConversation = false;
                                    finishedConversation = true;
                                    changeNovuFace()
                                    changeDialogueBox("menu")
                                }
                            } else if (id_convo === 10) {
                                if (id_dialogue < 16) {
                                    textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
                                } else {
                                    inConversation = false;
                                    finishedConversation = true;
                                    changeDialogueBox("menu")
                                }
                            }
                        }
                    }
                }
            }
        }
    });
});

function easterEgg(easter_id) {
    if (dogcheck() == true) {
        switch (easter_id) {
            case 1:
                deltaruneDialogue();
                break;

            case 2:
                location.reload();
                location.href = `htmls/dontforget/dontforget.html?lang=${lang_id}`;
                break;

            case 3:
                corbatasDialogue();
                break;

            case 4:
                lancerDialogue();
                break;

            case 5:
                corvexDialogue();
                break;

            case 6:
                tupilanDialogue();
                break;

            case 7:
                location.reload();
                location.href = `vid/sunhoster.mp4`;
                break;

            case 8:
                location.reload();
                location.href = `htmls/eggzone/egg_zone.html?lang=${lang_id}`;
                break;

            case 9:
                rieDialogue();
                break;

            case 10:
                lopDialogue();
                break;

            case 11:
                pañueloDialogue();
                break;

            case 12:
                location.reload();
                location.href = `htmls/unknown/unknown.html?lang=${lang_id}`;
                break;
        }
    }
}

function dancing() {
    location.reload();
    location.href = `htmls/themdancing/novu_dancing.html?lang=${lang_id}`;
}

function setNovuAside() {
    novu.style.left = "28%";
}

function setNovuBack() {
    novu.style.left = "47%";
}

function changeNovuFace() {
    if (novuFace == "looking_traveler") {
        novuFace = "looking_window"
        novu.src = "img/shop/novu_looking_window.gif";
    } else if (novuFace == "looking_window") {
        novuFace = "looking_traveler"
        novu.src = "img/shop/novu_looking_traveler.gif";
    }
}

function showFriend() {
    const FRIEND = document.getElementById("IMAGE_FRIEND");
    FRIEND.style.opacity = "1";

    var snd_friend = new Audio("snd/friend_laugh.mp3");
    snd_friend.volume = 0.25;
    snd_friend.play()

    setTimeout(() => {
        location.reload()
    }, 500);
}

function changeMusic() {
    if (LOVE <= 10) {
        musicState = !musicState;
        console.log(`Playing song: ${musicState}`)

        music_icon.src = `img/shop/music_${musicState}.png`;
        playSelectSound();

        if (musicState == true) {
            shopSong.volume = 0.20;
        } else {
            shopSong.volume = 0;
        }
    }
}

function novuGuideClicked() {
    if (LOVE < 10) {
        var nyon = new Audio("snd/nyon.mp3");
        nyon.volume = 0.25;

        LOVE++;
        console.log(`Total LOVE: ${LOVE}`)
        nyon.play();
    } else if (LOVE == 10) {
        LOVE++;
        var explosion = new Audio("snd/snd_explosion.mp3");
        explosion.volume = 0.25;
        explosion.play();

        document.getElementById("novuGuide").src = ("img/shop/explosion.gif")
        document.getElementById("novuGuide").src = ("img/shop/explosion.gif")
        shopSong.volume = 0;

        setTimeout(() => {
            document.getElementById("novuGuide").style.opacity = 0;
        }, 900);

        setTimeout(() => {
            document.getElementById("guidebg").style.opacity = 0;
        }, 3000);

        setTimeout(() => {
            document.getElementById("psychopath").style.opacity = 1;
        }, 4000);

        setTimeout(() => {
            location.reload()
        }, 8000);
    }
}

function openGuide() {
    if (LOVE <= 10) {
        if (inGuideSection == false && inInfoSection == false) {
            artZoomOverlay.classList.remove("active");
            inGuideSection = !inGuideSection;
            playSelectSound();
            guide_icon.classList.add("selected");
            guide_section.style.display = "block";
        } else if (inGuideSection == true && inInfoSection == false) {
            inGuideSection = !inGuideSection;
            playSelectSound();
            guide_icon.classList.remove("selected");
            guide_section.style.display = "none";
        }
    }
}

function triggerTalkMenu() {
    if (inTalkMenu == false || finishedConversation == true) {
        console.log(7);
        inTalkMenu = true;
        hideHeart(heartSelected);
        hideHeart(10);
        heartSelected = 5;
        showHeart(heartSelected);
        optionsMenu.style.display = "none";
        normalDialogue.style.display = "none";
        talk_menu.style.display = "block";
        optionsTalking.style.display = "block"
        textTyping(talk_comment, conversations[5][lang[lang_id]][1], "talk")
    }
}

function changeDialogueBox(type) {
    if (type == "talk") {
        dialoguebox.style.display = "none";
        dialoguebox_b.style.display = "block";
        dialoguetext_b.style.display = "block";
        talk_menu.style.display = "none";
        optionsTalking.style.display = "none"
    } else if (type == "menu") {
        finishedConversation = true;
        dialoguebox.style.display = "block";
        dialoguebox_b.style.display = "none";
        dialoguetext_b.style.display = "none";
        triggerTalkMenu();
    }
}

function triggerShopMenu() {
    if (talking == false) {
        inTalkMenu = false;
        heartSelected = 0;
        hideHeart(1);
        showHeart(heartSelected);
        optionsMenu.style.display = "block";
        normalDialogue.style.display = "block";
        talk_menu.style.display = "none";
        optionsTalking.style.display = "none"
        textTyping(textbox, conversations[0][lang[lang_id]][1], "text")
    }
}

function corvexDialogue() {
    inCorvexDialogue = true;
    inConversation = true;

    if (corvexFirstTime == true) {
        changeNovuFace();
        textTyping(textbox, conversations[11][lang[lang_id]][1], "talk")
    } else if (corvexFirstTime == false) {
        changeNovuFace();
        setConvoAndDialogueIDs(11, 2)
        inConversation = true;
        inCorvexDialogue = true;
        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
    }
}

function lancerDialogue() {
    snd_lancer.play();
    setConvoAndDialogueIDs(12, 1)
    inConversation = true;
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "null")
}

function rieDialogue() {
    snd_txtrie.play();
    setConvoAndDialogueIDs(15, 1)
    inConversation = true;
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "null")
}

function lopDialogue() {
    snd_txtlop.play();
    setConvoAndDialogueIDs(14, 1)
    inConversation = true;
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "null")
}

function pañueloDialogue() {
    setConvoAndDialogueIDs(13, 1)
    inConversation = true;
    changeNovuFace();
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")

}

function tupilanDialogue() {
    inTupilanDialogue = true;
    inConversation = true;

    if (tupilanFirstTime == true) {
        textTyping(textbox, conversations[16][lang[lang_id]][1], "text")
    } else if (tupilanFirstTime == false) {
        setConvoAndDialogueIDs(16, 2)
        inConversation = true;
        inTupilanDialogue = true;
        textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "text")
    }
}

function deltaruneDialogue() {
    setConvoAndDialogueIDs(17, 1)
    inConversation = true;
    changeNovuFace();
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
}

function corbatasDialogue() {
    setConvoAndDialogueIDs(18, 1)
    inConversation = true;
    changeNovuFace();
    textTyping(textbox, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
}

function dogcheck() {
    if (inConversation == false) {
        if (talking == false) {
            if (artGallery == false) {
                if (commissions == false) {
                    if (inGuideSection == false && inInfoSection == false) {
                        if (inTalkMenu == false) {
                            if (inCorvexDialogue == false) {
                                if (inTupilanDialogue == false) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log("Dogcheck: false")
    return false;
}

function setEasterEggsEnabled(enabled) {
    document.querySelectorAll(".easteregg").forEach(el => {
        el.classList.toggle("disabled", !enabled);
    });
}

function setConvoAndDialogueIDs(convo, dialogue) {
    id_convo = convo;
    id_dialogue = dialogue;
}

function talkConversation(convo, dialogue) {
    if (talking == false) {
        setConvoAndDialogueIDs(convo, dialogue)
        inConversation = true
        finishedConversation = false;
        if (id_convo != 10) {
            changeNovuFace()
        }
        changeDialogueBox("talk")
        textTyping(textbox_b, conversations[id_convo][lang[lang_id]][id_dialogue], "talk")
    }
}

function checkTalkMenu() {
    if (dogcheck() == true) {
        triggerTalkMenu();
    }
}

function openInfo() {
    if (LOVE <= 10) {
        if (inInfoSection == false && inGuideSection == false) {
            artZoomOverlay.classList.remove("active");
            playSelectSound();
            info_icon.classList.add("selected");
            info_section.style.display = "block";
            inInfoSection = !inInfoSection;

        } else if (inInfoSection == true && inGuideSection == false) {
            playSelectSound();
            info_icon.classList.remove("selected");
            info_section.style.display = "none";
            inInfoSection = !inInfoSection;
        }
    }
}

function skipTyping() {
    if (talking == true && typingBox != null) {
        clearTimeout(typingTimeoutId);
        typingBox.textContent = typingFullText;
        talking = false;
        id_dialogue++;

        const cb = typingOnComplete;
        typingBox = null;
        if (cb) cb();
    }
}

function dialogueBoxClicked() {
    if (inConversation == true) {
        if (talking == true) {
            $(document).trigger($.Event("keydown", { key: "X" }))
        } else {
            $(document).trigger($.Event("keydown", { key: " " }));
        }
    }
}

dialoguetext_b.addEventListener("click", dialogueBoxClicked);
normalDialogue.addEventListener("click", dialogueBoxClicked);