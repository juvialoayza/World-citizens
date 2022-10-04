class Game {
    constructor() {

        //PROPIEDADES O ELEMENTOS DEL JUEGO

        //fondo del nivel
        this.stage = new Image();
        this.stage.src = "./images/stage-level1.jpg";

        // player
        this.playerObj = new Player();

        // obstáculo
        this.obstacle = [];

        // reward
        this.reward = [];

        this.frames = 0;
        this.isGameOn = true;

        this.score = 0;

        this.playerUp = false;
        this.playerDown = false;
    }

    // MÉTODOS O ACCIONES DEL JUEGO


    // colisión del jugador con los obstáculos
    playerCollisionObstacles = () => {
        this.obstacle.forEach((eachObstacle) => {
            if (
                this.playerObj.x < eachObstacle.x + eachObstacle.w &&
                this.playerObj.x + this.playerObj.w > eachObstacle.x &&
                this.playerObj.y < eachObstacle.y + eachObstacle.h &&
                this.playerObj.h + this.playerObj.y > eachObstacle.y
            ) {
                this.gameOver()
            }
        });
    };

    playerCollisionRewards = () => {
        this.reward.forEach((eachReward, index) => {

            if (
                this.playerObj.x < eachReward.x + eachReward.w &&
                this.playerObj.x + this.playerObj.w > eachReward.x &&
                this.playerObj.y < eachReward.y + eachReward.h &&
                this.playerObj.h + this.playerObj.y > eachReward.y
            ) {

                this.score++
                this.reward.splice(index, 1)
            }

        });
    };


    // termina el juego
    gameOver = () => {
        this.isGameOn = false;
        canvas.style.display = "none";

        gameOverScreen.style.display = "flex"
    }


    //agregar obstáculos 

    addObstacle = () => {
        if (this.frames % 160 === 0) {
            let randomNum = Math.random() * 500;
            let randomXint = Math.floor(randomNum);

            let nuevoObstacle = new Obstacle(randomXint);
            this.obstacle.push(nuevoObstacle);
        }
    };

    addReward = () => {
        let intervalY = 150;
        if (this.frames % (intervalY - this.score) === 0) {
            let randomNum = Math.random() * -150;
            let randomYint = Math.floor(randomNum);

            let nuevoReward = new Reward();
            this.reward.push(nuevoReward);
        }
    }


    // agregar fondo
    drawStage = () => {
        ctx.drawImage(this.stage, 0, 0, canvas.width, canvas.height);
    }

    // dibujar puntuación
    drawScore = () => {
        ctx.font = "20px Mochiy Pop One, sans-serif";
        let scoreStr = `Score:   ${this.score}`
        ctx.fillText(scoreStr, canvas.width * 0.02, 30)
    }


    // RECURSIÓN
    gameLoop = () => {
        this.frames = this.frames + 1;

        //1. limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        //2. acciones y movimientos
        if (this.playerUp) {
            if (this.playerObj.y > 417 - 70 - this.playerObj.jumpLength) {
                this.playerObj.jumpPlayer();
            } else {
                this.playerUp = false;
                this.playerDown = true;
            }
        }

        if (this.playerDown) {
            if (this.playerObj.y < 417 - 70) {
                this.playerObj.gravityPlayer();
            } else {
                this.playerDown = false;
            }
        }


        this.obstacle.forEach((eachObstacle) => {
            eachObstacle.moveObstacle();
        });
        this.reward.forEach((eachReward) => {
            eachReward.moveReward();
        })
        this.addObstacle();
        this.addReward();
        this.playerCollisionObstacles();
        this.playerCollisionRewards()

        //3. dibujado de los elementos
        this.drawStage();
        this.playerObj.drawPlayer();
        this.obstacle.forEach((eachObstacle) => {
            eachObstacle.drawObstacle();
        });
        this.reward.forEach((eachReward) => {
            eachReward.drawReward();
        });
        this.drawScore()


        //4. control de la recursion
        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop)
        }
    }
}