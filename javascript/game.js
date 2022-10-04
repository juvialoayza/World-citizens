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
        this.reward.forEach((eachReward) => {
            if (
                this.playerObj.x < eachReward.x + eachReward.w &&
                this.playerObj.x + this.playerObj.w > eachReward.x &&
                this.playerObj.y < eachReward.y + eachReward.h &&
                this.playerObj.h + this.playerObj.y > eachReward.y
            )
             {
                
                this.score++ 
                this.reward.splice(eachReward)
            } 
            // if(this.reward.length !==0){
            //     let nuevoReward = new Reward()
            //     this.reward.shift(nuevoReward)
            // }
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
    }

    addReward = () => {
        if (this.frames % 110 === 0) {
            let randomNum = Math.random() * 500;
            let randomXint2 = Math.floor(randomNum);

            let nuevoReward = new Reward(randomXint2);
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
        let scoreStr = `Score: ${this.score}`
        ctx.fillText(this.score, canvas.width * 0.4, 50)
    }


    // RECURSIÓN
    gameLoop = () => {
        this.frames = this.frames + 1;

        //1. limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        //2. acciones y movimientos
        // this.playerObj.gravityPlayer();
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