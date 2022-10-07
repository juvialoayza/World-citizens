class Game {
    constructor() {
        //PROPIEDADES O ELEMENTOS DEL JUEGO

        //fondo del nivel
        this.stage = new Image();
        this.stage.src = "./images/stage-level1.jpg";

        // jugador
        this.playerObj = new Player();
        this.playerUp = false;
        this.playerDown = false;

        // obstáculos
        this.obstacle = [];
        this.obstacle1 = [];
        this.loadObstacles = true;

        // premios
        this.reward = [];

        //vidas
        this.lives = 3;

        this.frames = 0;
        this.isGameOn = true;

        this.score = 0;
    }

    // MÉTODOS O ACCIONES DEL JUEGO


    // colisión del jugador con los obstáculos
    playerCollisionObstacles = () => {
        this.obstacle.forEach((eachObstacle, index) => {
            if (
                this.playerObj.x < eachObstacle.x &&
                this.playerObj.x + this.playerObj.w > eachObstacle.x &&
                this.playerObj.y < eachObstacle.y + eachObstacle.h &&
                this.playerObj.h + this.playerObj.y > eachObstacle.y
            ) {
                this.lives--;
                this.obstacle.splice(index, 1)
               
                if (this.lives <= 0) {
                    this.gameOver();
                }
            }
        });
    };

    playerCollisionObstacles1 = () => {
        this.obstacle1.forEach((eachObstacle1, index) => {
            if (
                this.playerObj.x < eachObstacle1.x + eachObstacle1.w &&
                this.playerObj.x + this.playerObj.w > eachObstacle1.x &&
                this.playerObj.y < eachObstacle1.y + eachObstacle1.h &&
                this.playerObj.h + this.playerObj.y > eachObstacle1.y
            ) {
                this.lives--;
                this.obstacle1.splice(index, 1);
                
                if (this.lives <= 0) {
                    this.gameOver();
                }
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
                document.querySelector("#sound-rewards").play()
                this.score++;
                score.innerText = this.score;
                this.reward.splice(index, 1);
            }

        });
    };

    // puntuación
    gameScore = () => {
        this.score++
    };

    // termina el juego
    gameOver = () => {
        document.querySelector("#sound-game-over").play();
        this.isGameOn = false;
        canvas.style.display = "none";

        gameOverScreen.style.display = "flex"
    };

    //agregar obstáculos 

    addObstacle = () => {
        if (this.frames % 160 === 0) {
            let randomNum = Math.random() * 500;
            let randomXint = Math.floor(randomNum);

            let nuevoObstacle = new Obstacle(randomXint);
            this.obstacle.push(nuevoObstacle);
        }    
    };

    addObstacle1 = () => {
            if (this.frames % 100 === 0) {
                let randomNum = Math.random() * 500;
                let randomXint = Math.floor(randomNum);

                let nuevoObstacle1 = new Obstacle1(randomXint);
                this.obstacle1.push(nuevoObstacle1);
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
    };


    // dibujar fondo
    drawStage = () => {
        ctx.drawImage(this.stage, 0, 0, canvas.width, canvas.height);
    }

    // dibujar puntuación
    drawScore = () => {
        ctx.font = "20px Mochiy Pop One, sans-serif";
        let scoreStr = `Score:   ${this.score}`
        ctx.fillText(scoreStr, canvas.width * 0.02, 30)
    }

    // dibujar vidas
    drawLives = () => {
        let livesStr;
        if (this.lives === 3){
            livesStr = "❤❤❤";
        } else if (this.lives === 2) {
            livesStr = "    ❤❤";
        } else {
            livesStr = "        ❤";
        }

        ctx.font = "20px Mochiy Pop One, sans-serif";
        ctx.fillText(livesStr, canvas.width - 70, 30);
    };

    // RECURSIÓN
    gameLoop = () => {
        this.frames = this.frames + 1;

        //1. limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        //2. acciones y movimientos
        if (this.playerUp) {
            if (this.playerObj.y > 417 - 95 - this.playerObj.jumpLength) {
                this.playerObj.jumpPlayer();
            } else {
                this.playerUp = false;
                this.playerDown = true;
            }
        }

        if (this.playerDown) {
            if (this.playerObj.y < 417 - 95) {
                this.playerObj.gravityPlayer();
            } else {
                this.playerDown = false;
            }
        }

        this.obstacle.forEach((eachObstacle) => {
            eachObstacle.moveObstacle();
        });
        this.obstacle1.forEach((eachObstacle1) => {
            eachObstacle1.moveObstacle1();
        });
        this.reward.forEach((eachReward) => {
            eachReward.moveReward();
        });

        if(this.score !==0 && this.score % 3 === 0) this.loadObstacles = false;
        else this.loadObstacles = true;

        if (this.loadObstacles) {
            this.addObstacle();
        } else {
            this.addObstacle1();
        }

        this.addReward();
        this.playerCollisionObstacles();
        this.playerCollisionObstacles1();
        this.playerCollisionRewards();

        //3. dibujado de los elementos
        this.drawStage();
        this.playerObj.drawPlayer();
        this.obstacle.forEach((eachObstacle) => {
            eachObstacle.drawObstacle();
        });

        this.obstacle1.forEach((eachObstacle1) => {
            eachObstacle1.drawObstacle1();
        });

        this.reward.forEach((eachReward) => {
            eachReward.drawReward();
        });
        this.drawScore();
        this.drawLives();

        //4. control de la recursion
        if (this.isGameOn === true) {
            requestAnimationFrame(this.gameLoop)
        }
    };
}