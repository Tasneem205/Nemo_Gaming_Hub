let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = '../assets/infinite runner/shadow_dog.png';
const spiritewidth = 575;
const spiriteheight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spiriteAnimation = [];
const animationStates = [
    {name: 'idle', frames: 7},
    {name: 'jump', frames: 7},
    {name: 'fall', frames: 7},
    {name: 'run', frames: 9},
    {name: 'dizzy', frames: 11},
    {name: 'sit', frames: 5},
    {name: 'roll', frames: 7},
    {name: 'bite', frames: 7},
    {name: 'ko', frames: 12},
    {name: 'getHit', frames: 4},
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spiritewidth;
        let positionY = index * spiriteheight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spiriteAnimation[state.name] = frames;
});

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spiriteAnimation[playerState].loc.length;
    frameX = spiritewidth * position;
    frameY = spiriteAnimation[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spiritewidth, spiriteheight, 0, 0, spiritewidth, spiriteheight);
    gameFrame++;
    requestAnimationFrame(animate); // to create the game loop
}
animate();
