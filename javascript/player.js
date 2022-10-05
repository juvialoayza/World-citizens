class Player {

    constructor() {
        // PROPIEDADES DEL JUGADOR
        this.img = new Image()
        this.img.src = "./images/player.png"
        this.x = 10;
        this.y = 417-95;
        this.w = 95;
        this.h = 95;
        this.speed = 3
        this.jumpLength = 150
    }

    // MÉTODOS O ACCIONES DEL JUGADOR

    drawPlayer = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    gravityPlayer = () => {
        this.y = this.y + this.speed
    } 

    jumpPlayer = () => {
        this.y = this.y - this.speed
    }

    moveRightPlayer = () => {
        this.x = this.x + (this.speed * 10);
    }

    moveLeftPlayer = () => {
        this.x = this.x - (this.speed * 10);
    }





}