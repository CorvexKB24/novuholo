// NO ABRAS ESTE CÓDIGO PARA BUSCAR LOS SECRETOS, NO SEAS TRAMPOSO QUE LE QUITA LA GRACIA
// porfi :(

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const GAP = 300;      
const RADIUS = 170;   

const REST_X = DESIGN_WIDTH / 2 - GAP / 2;
const REST_Y = DESIGN_HEIGHT / 2;

const scene = document.getElementById('scene');
const maskGroup = document.getElementById('mask-group');

function resizeScene() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT
  );
  scene.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener('resize', resizeScene);
window.addEventListener('load', resizeScene);
resizeScene(); 

function onMove(clientX, clientY) {
  const rect = scene.getBoundingClientRect();

  const scaleX = rect.width / DESIGN_WIDTH;
  const scaleY = rect.height / DESIGN_HEIGHT;

  const designX = (clientX - rect.left) / scaleX;
  const designY = (clientY - rect.top) / scaleY;

  const relX = designX - GAP / 2;
  const relY = designY;

  maskGroup.setAttribute('transform', `translate(${relX}, ${relY})`);
}

document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));

maskGroup.setAttribute('transform', `translate(${REST_X}, ${REST_Y})`);

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});