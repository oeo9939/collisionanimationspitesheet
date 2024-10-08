const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;

// ctx.fillStyle = "white";
// ctx.fillRect(50, 50, 100, 150);

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();
// console.log(canvasPosition);

class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.3;
        this.height = this.spriteHeight * 0.3;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "/assets/boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = "/assets/Healing-Full.wav";
    }
    update() {
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        };
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // ctx.drawImage(image(we want to draw), [sx(source x), sy(source y),
        //  sw(source width), sh(source height) of area you want to crop out of source sprite sheet],
        //  dx, dy, dw, dh (destination x, y, width, height determine where you want to put the croped out img));
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener("click", (u) => {
    createAnimation(u);
});

// window.addEventListener("mousemove", (u) => {
//     createAnimation(u);
// });

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    // console.log(e);
    // ctx.fillStyle = "white";
    // ctx.fillRect(e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50);
    explosions.push(new Explosion(positionX, positionY));
    console.log(explosions);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();