World Citizens
Description
The objective of the game is to simply move right and reach the end of each stage. The game has two types of challenges, one is to get rewards and the other one is to avoid the obstacles littered throughout in each stage; when the player finds an obstacle, they must to jump.  The game ends when the player collides with an obstacle.

MVP (DOM - CANVAS)
Game has one character that moves horizontally 
obstacles appear from the sides of the screen 
rewards appear from the top 
player collides with an obstacle three times, will end the game

Backlog
add scoreboard
Ability to start the game on increased 
dificulty lvl

Project Structure
main.js
startGameScreen () {}
GameScreen () {}
gameOverScreen () {}

game.js
Game () {}
gameLoop () {}
obstacles () {}
rewards () {}
clearCanvas () {}
updateCanvas () {}
drawStage () {}
gameScore () {}
gameOver () {}

player.js
drawPlayer () { this.x; this.y; this.direction; this.size }
jumpPlayer () {}
playerCollisionObstacles () {}

obstacles.js
drawObstacle () { this.x; this.y; this.direction; this.size }
moveObstacle () {}

rewards.js
drawRewards () { this.x; this.y; this.direction; this.size }
move () {}
checkCollisionTop () {}

States y States Transitions
Definition of the different states and their transition (transition functions)
startGameScreen
gameScreen
gameOverScreen

Task
main - buildDom
main - buildstartGameScreen
main - addEventListener
main - buildGameScreen
main - buildGameOverScreen
game - gameLoop
game - buildBackground
game - updateBackground
game - drawBackground
obstacle - draw
obstacle - move
game - addObstacle
player - draw
player - move
game - addReward
reward - draw
reward - move
game - checkCollision
game - GameOver
game - addEventListener

Git
[Project repo](https://github.com/juvialoayza/World-citizens)
[Deploy](https://juvialoayza.github.io/World-citizens/)

Slides
[Project presentation](https://bit.ly/world-citizens-game) 