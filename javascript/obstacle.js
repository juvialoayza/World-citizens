class Obstacle {
    constructor () {
        this.img = new Image();
        this.img.src = "./images/rock.png"
        this.x = Math.random()*canvas.width;
        this.y = 350;
        this.w = 50;
        this.h = 50;
        this.speed = 2
    }

        // MÉTODOS Y ACCIONES DE CADA OBSTÁCULO
        drawObstacle = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        };

        moveObstacle = () => {
            this.x = this.x - this.speed
        }
}