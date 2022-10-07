class Obstacle1 {
    constructor() {
        this.img = new Image();
        this.img.src = "./images/gallito.png"
        this.x = 0;
        this.y = 140;
        this.w = 50;
        this.h = 70;
        this.speed = 2
    }

    // MÉTODOS Y ACCIONES DE CADA OBSTÁCULO
    drawObstacle1 = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };

    moveObstacle1 = () => {
        this.x = this.x + this.speed
    };
}