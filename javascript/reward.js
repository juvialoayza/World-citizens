class Reward {
    constructor () {
        this.img = new Image();
        this.img.src = "./images/tumi.png"
        this.x = Math.floor(Math.random(canvas.width - 50)*1000);
        this.y = -50;
        this.w = 50;
        this.h = 60;
        this.speed = 1
    }

        // MÉTODOS Y ACCIONES DE CADA OBSTÁCULO
        drawReward = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        };

        moveReward = () => {
            this.y = this.y + this.speed
        }
}