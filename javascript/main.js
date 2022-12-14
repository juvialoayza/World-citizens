// VARIABLES GLOBALES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start-btn");
const gameOverScreen = document.querySelector("#gameover-screen");
const score = document.querySelector("#totalscore");
const restartBtn = document.querySelector("#restart-btn");

let gameObj;

// STATE MANAGEMENT FUNCTIONS
const startGame = () => {
    document.querySelector("#sound-start").play();

    startScreen.style.display = "none";
    canvas.style.display = "block";

    gameObj = new Game();
    gameObj.gameLoop();
};

const restartGame = () => {
    document.querySelector("#sound-start").play();
    gameOverScreen.style.display = "none"

    canvas.style.display = "block"

    score.innerText = gameObj.score;
    gameObj = new Game();
    gameObj.gameLoop();
};

// ADD EVENT LISTENERS
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
        if (gameObj.playerUp === false && gameObj.playerDown === false) gameObj.playerUp = true;
    }

    if (event.code === "ArrowRight") {
        gameObj.playerObj.moveRightPlayer();
    }

    if (event.code === "ArrowLeft") {
        gameObj.playerObj.moveLeftPlayer();
    }
});