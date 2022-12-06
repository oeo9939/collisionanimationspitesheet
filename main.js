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
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.image = new Image();
        this.image.src = "/assets/boom.png";
        this.frame = 0;
    }
    update() {
        this.frame++;
    }
    draw(){
        // ctx.drawImage(image(we want to draw), [sx(source x), sy(source y),
        //  sw(source width), sh(source height) of area you want to crop out of source sprite sheet],
        //  dx, dy, dw, dh (destination x, y, width, height determine where you want to put the croped out img));
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

window.addEventListener("click", (e) => {
    console.log(e);
    ctx.fillStyle = "white";
    ctx.fillRect(e.x - canvasPosition.left - 25, e.y - canvasPosition.top - 25, 50, 50);
});