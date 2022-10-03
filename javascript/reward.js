class Reward {
    constructor () {
        this.img = new Image();
        this.img.src = "./images/llama.png"
        this.x = 600;
        this.y = 40;
        this.w = 50;
        this.h = 50;
        this.speed = 2
    }

        // MÉTODOS Y ACCIONES DE CADA OBSTÁCULO
        drawReward = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        };

        moveReward = () => {
            this.x = this.x - this.speed
        }
}