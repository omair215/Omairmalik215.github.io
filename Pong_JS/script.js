/**
 * Created by omalik on 8/21/2016.
 */

// VARIABLES
// Initialize the canvas
var canvas;
var canvasContext;
// Sets position and speed of balls
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
// Sets position and speed of paddles
var paddle1Y =250;
const paddleHeight = 100;
const paddleWidth = 10;
var paddle2Y =250;
//Do not show win screen as default
var showingWinScreen = false;
//Keep track of player score
var player1Score =0;
var player2Score =0;
const WINNING_SCORE =3;

//Functions
//Set up function to keep track of mouse position so that we don't repeat ourselves
function calculateMousePos(evt) {
  var rect =canvas.getBoundingClientRect();
  var root =document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.left - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}
//Turn off Win Screen if mouse button clicked
function handleMouseClick(evt) {
  if(showingWinScreen) {
    player1Score =0;
    player2Score =0;
    showingWinScreen = false;

  }
}
//function for handlind computer movement
function computerMovement() {
  var paddle2YCenter = paddle2Y + (paddleHeight/2);
  if(paddle2YCenter < ballY-35){
    paddle2Y += 6;
  } else if(paddle2YCenter > ballY+35) {
    paddle2Y -= 6;
  }
}
//Function for creating circles and rectangles which will be our ball and paddles respectively
function colorCircle(centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
  canvasContext.fill();
}
function colorRect(leftX,topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY, width,height);
}
//Function for resetting score and ball position when someone wins
function ballReset() {
  if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE ){
    showingWinScreen = true;
  }
  ballSpeedX = -ballSpeedX;
  ballX =canvas.width/2;
  ballY = canvas.height/2;
}

//movement functions
function moveEverything () {
  if(showingWinScreen) {
    return;
  }
  computerMovement();
  //sets movement speed of ball
  ballX += ballSpeedX;
  ballY -= ballSpeedY;
  if (ballX < 0) {
    //bouncing behavior
    if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle1Y+paddleHeight/2);
      ballSpeedY = deltaY * .35;
    } else {
      player2Score += 1; // MUST BE BEFORE ballReset()
      ballReset();
    }
  }
  if (ballX > canvas.width) {
    //ballSpeedX = -ballSpeedX;
    if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      var deltaY = ballY - (paddle2Y+paddleHeight/2);
      ballSpeedY = deltaY * .35;
    } else {
      player1Score += 1; // MUST BE BEFORE ballReset()
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

//drawing functions
function drawNet() {
  for(var i=0;i<canvas.height;i+=40){
    colorRect(canvas.width/2-1,i,2,20,'yellow');
  }
}
function drawEverything() {
  // next line blanks out screen with black
  colorRect(0,0,canvas.width,canvas.height, 'black');

  if(showingWinScreen) {
    canvasContext.fillStyle = 'WHITE';
    if(player1Score >= WINNING_SCORE){
      canvasContext.fillText("Left Player Won!", 270, 200);
    }else if(player2Score >= WINNING_SCORE){
      canvasContext.fillText("Right Player Won!", 270, 200);
    }
    canvasContext.fillText("click to continue", 270, 500);
    return;
  }
  drawNet();
  colorCircle(ballX,ballY, 10,'red');
  //next line creates left player paddle
  colorRect(5,paddle1Y,paddleWidth,paddleHeight,'orange');
  //next line creates right player paddle
  colorRect(canvas.width - paddleWidth-5,paddle2Y,paddleWidth,paddleHeight,'teal');
  //next line draws the ball
  // colorCircle(ballX,ballY, 10,'green');
  canvasContext.font = "30pt Calibri";
  canvasContext.fillText(player1Score, 130, 130);
  canvasContext.fillText("Home",90,80);
  canvasContext.fillText(player2Score, canvas.width -130, 130);
  canvasContext.fillText("Away",canvas.width-160,80);
}

//Calls functions to draw objects and set up movement speed
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  //movement speed
  var framesPerSecond = 30;
  setInterval(function(){
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
  //handling mouse movement and calling other function
  canvas.addEventListener('mousedown',handleMouseClick);
  canvas.addEventListener('mousemove',
    function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - (paddleHeight/2 - 300);
    });
}



