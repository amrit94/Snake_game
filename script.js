/* JAVASCRIPT/CANVAS SNAKE GAME PROJECT

  File Name    : script.js
  Description  : snake game front-end
  Game Files   : snake.html, script.js, style.css
  Usage        : Adjust 'Speed' before clicking 'Play' button
                 Click 'Play' button to start game.
                 To play again click 'Reload' + 'Play' button

  Author       : Amrit Prasad
  Contact      : amritpra94@gmail.com
 */

const cnv_brd_col = 'red'; 
const cnv_col = "aqua";
const s_col = 'lightgreen';
const s_brd_col = 'darkgreen';

const gameCanvas = document.getElementById("gameCanvas");   // Get the canvas element
const ctx = gameCanvas.getContext("2d");       // Return a two dimensional drawing context

//Draw canvas with with background
function clearCanvas(){ 
  ctx.fillStyle = cnv_col; //bg color of canvas
  ctx.strokestyle = cnv_brd_col;   //canvas border color
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  //draw Canvas
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);    //draw border for the canvas
}
clearCanvas();

//Initial snake
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
]
let dx = 10;
let dy = 0;

//Condition after it touches boundary
function advanceSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);    

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    score += level;
    document.getElementById('score').innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

//Draw snake
function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = s_col; //color of snake part
  ctx.strokestyle = s_brd_col;    //border colour of the snake part
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);   //snake part
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10); //snake part border
  }
drawSnake();

//for running snake
function main() {
  if (didGameEnd()){ 
    document.getElementById('gameOver').innerHTML="Game Over, Your Score :"+score;
    return }
  setTimeout(function onTick() {
  clearCanvas();
  drawFood();
  advanceSnake();
  drawSnake();

  main();
 }, gameSpeed)  //time-- to control speed
}
//Event Listener with direction control of snake
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
    //finding present direction of snake
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  //Precedence: '!' > '===' > '&&'
  if (keyPressed === LEFT_KEY && !goingRight) {
    console.log(1)
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    console.log(2)
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    console.log(3)
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    console.log(4)
    dx = 0;
    dy = 10;
  }
}

//Start game
createFood();
document.addEventListener("keydown", changeDirection);

const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'darkred';
var score = 0;

//Generate (x,y) coordinate of snake
function createFood() {
  foodX = randomTen(0, gameCanvas.width - 10);  //random x-coordinate for food
  foodY = randomTen(0, gameCanvas.height - 10); //random y-coordinate for food

  snake.forEach(function isOnSnake(part) {  //if food generated on snake
    if (part.x == foodX && part.y == foodY) createFood();
  });
}

//Draw food
function drawFood(){
  ctx.fillStyle = FOOD_COLOUR;
  ctx.strokestyle = FOOD_BORDER_COLOUR;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

//Generate random number
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

//END game.. if snake touches itself
function didGameEnd() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function play(){createFood();
  main();
  
}
function reload(){
  location.reload();
  play();
}

var gameSpeed=120;
var level=5;

function speed(){
  gameSpeed=120;
  level=Number(document.getElementById('speed').value)
  gameSpeed=gameSpeed-level
  console.log(gameSpeed)
}
