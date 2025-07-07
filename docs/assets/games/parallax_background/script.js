const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gamespeed = 5;

const backgroundlayer1 = new Image();
const backgroundlayer2 = new Image();
const backgroundlayer3 = new Image();
const backgroundlayer4 = new Image();
const backgroundlayer5 = new Image();

backgroundlayer1.src = '../assets/infinite runner/layer-1.png';
backgroundlayer2.src = '../assets/infinite runner/layer-2.png';
backgroundlayer3.src = '../assets/infinite runner/layer-3.png';
backgroundlayer4.src = '../assets/infinite runner/layer-4.png';
backgroundlayer5.src = '../assets/infinite runner/layer-5.png';

const slider = document.getElementById('slider');
slider.value = gamespeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gamespeed;
slider.addEventListener('change', function(e) {
    gamespeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gamespeed * this.speedModifier;
    }

    update() {
        this.speed = gamespeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundlayer1, 0.2);
const layer2 = new Layer(backgroundlayer2, 0.4);
const layer3 = new Layer(backgroundlayer3, 0.6);
const layer4 = new Layer(backgroundlayer4, 0.8);
const layer5 = new Layer(backgroundlayer5, 1);

const gameObject = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObject.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
}
// animate();