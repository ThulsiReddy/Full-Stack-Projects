const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "snow";
const paddle1color = "lightblue";
const paddle2color = "red";
const paddleBorder = "black";
const ballcolor = "yellow";
const ballBordercolor = "black";
const ballradius = 12.5;
const paddlespeed = 50;

let intervalID;
let ballspeed;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXdirection = 0;
let ballYdirection = 0;
let player1score = 0;
let player2score = 0;


let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};


let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();


function gameStart() {
    createBall();
    nextTick();
};

function nextTick() {

    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10)

};

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function drawPaddles() {
    ctx.strokeStyle = paddleBorder;
    ctx.fillStyle = paddle1color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);


    ctx.fillStyle = paddle2color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

};

function createBall() {
    ballspeed = 1;
    if (Math.round(Math.random()) == 1) {
        ballXdirection = 1;
    }
    else {
        ballXdirection = -1;
    }
    if (Math.round(Math.random()) == 1) {
        ballYdirection = Math.random() * 1;
    }
    else {
        ballYdirection = Math.random() * -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};

function moveBall() {
    ballX += (ballspeed * ballXdirection);
    ballY += (ballspeed * ballYdirection);
};

function drawBall(ballX, ballY) {
    ctx.fillStyle = ballcolor;
    ctx.strokeStyle = ballBordercolor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballradius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};

function checkCollision() {
    if (ballY <= 0 + ballradius) {
        ballYdirection *= -1;
    }
    if (ballX <= 0) {
        player2score += 1;
        updateScore();
        createBall();
        return;
    }
    if (ballX >= gameWidth) {
        player1score += 1;
        updateScore();
        createBall();
        return;

    }
    if (ballX <= (paddle1.x + paddle1.width + ballradius)) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballradius;
            ballXdirection *= -1;
            ballspeed += 1;
        }
    }
    if (ballX >= (paddle2.x - ballradius)) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballradius;
            ballXdirection *= -1;
            ballspeed += 1;
        }
    }
};

function changeDirection(event) {
const keyPressed=event.keyCode;
const paddle1Up=87;
const paddle1Down=83;
const paddle2Up=38;
const paddle2Down=40;
switch(keyPressed){
    case(paddle1Up):
    if(paddle1.y>0){
        paddle1.y-=paddlespeed;
    }
    break;
    case(paddle1Down):
    if(paddle1.y<gameHeight-paddle1.height){
        paddle1.y+=paddlespeed;

    }
    break;

    case(paddle2Up):
    if(paddle2.y>0){
        paddle2.y-=paddlespeed;
    }
    break;
    case(paddle2Down):
    if(paddle2.y<gameHeight-paddle2.height){
        paddle2.y+=paddlespeed;

    }
    break;
    
    
}
};

function updateScore() {
scoreText.textContent= `${player1score} : ${player2score} `;
};

function resetGame() {
    player1score = 0;
    player2score = 0;
    
    
  paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    
 paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };
    ballspeed=1;
    ballX=0;
    ballY=0;
    ballXdirection=0;
    ballYdirection=0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};