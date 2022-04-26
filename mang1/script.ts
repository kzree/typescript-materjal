const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 120;
const PADDLE_X_OFFSET = 40;

const PADDLE_SPEED = 20;

const BALL_SIZE = 30;
const BALL_SPEED = 10;

let ballXspeed = 0;
let ballYspeed = 0;
let ballAngle = 0;

let ballX = CANVAS_WIDTH / 2;
let ballY = CANVAS_HEIGHT / 2;

let player1x = PADDLE_X_OFFSET;
let player1y = CANVAS_HEIGHT / 2;

let player2x = CANVAS_WIDTH - PADDLE_X_OFFSET;
let player2y = CANVAS_HEIGHT / 2;

let lastCollisionTime = Date.now();

let player1Score = 0;
let player2Score = 0;

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function drawRectangle(x: number, y: number, width: number, height: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(x - width / 2, y - height / 2, width, height);
}

function drawScore() {
  ctx.font = '50px Arial';
  ctx.fillText(player1Score.toString(), CANVAS_WIDTH / 2 - 65, 100);
  ctx.fillText(":", CANVAS_WIDTH / 2, 100);
  ctx.fillText(player2Score.toString(), CANVAS_WIDTH / 2 + 50, 100);
}

function drawGameObjects() {
  drawRectangle(player1x, player1y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  drawRectangle(player2x, player2y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  drawRectangle(ballX, ballY, BALL_SIZE, BALL_SIZE, 'white');
  drawScore();
}

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawRectangle(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT, 'black');
}

function setBallAngle(angle: number) {
  ballAngle = angle;
}

function setBallMovement() {
  ballXspeed = BALL_SPEED * Math.cos(ballAngle);
  ballYspeed = BALL_SPEED * Math.sin(ballAngle);
}

function resetBall() {
  setBallAngle(getRandomInt(0, 360));
  setBallMovement();
  ballX = CANVAS_WIDTH / 2;
  ballY = CANVAS_HEIGHT / 2;
}

function moveBall() {
  if (ballY + ballYspeed > CANVAS_HEIGHT || ballY + ballYspeed - BALL_SIZE / 2 < 0) {
    ballYspeed = ballYspeed * -1;
  } else {
    ballY += ballYspeed;
  }

  if (ballX + ballXspeed > CANVAS_WIDTH) {
    player1Score++;
    resetBall();
  }

  if (ballX + ballXspeed < 0) {
    player2Score++;
    resetBall();
  }

  if (player1Score > 9 || player2Score > 9) {
    player1Score = 0;
    player2Score = 0;
  }
  
  ballX += ballXspeed;
}

function checkCollisionCooldown(): boolean {
  const timeRightNow = Date.now();
  if (timeRightNow - lastCollisionTime > 300) return true;
  else return false;
}

function handleCollision() {
  const isCollisionAllowed = checkCollisionCooldown();
  if (!isCollisionAllowed) return;

  if (
    (ballX - BALL_SIZE / 2 <= player1x + PADDLE_WIDTH / 2 &&
      ballY + BALL_SIZE / 2 >= player1y - PADDLE_HEIGHT /2 &&
      ballY - BALL_SIZE / 2 <= player1y + PADDLE_HEIGHT /2) ||
    (ballX + BALL_SIZE / 2 >= player2x - PADDLE_WIDTH / 2 &&
      ballY + BALL_SIZE / 2 >= player2y - PADDLE_HEIGHT /2 &&
      ballY - BALL_SIZE / 2 <= player2y + PADDLE_HEIGHT /2)
  ) {
    lastCollisionTime = Date.now();
    ballXspeed = ballXspeed * -1;
  }
}

function handleMovement(event: KeyboardEvent) {
  switch (event.key) {
    case 'w':
      if (player1y - PADDLE_SPEED - PADDLE_HEIGHT / 2 >= 0) {
        player1y = player1y - PADDLE_SPEED;
      }
      break;
    case 's':
      if (player1y + PADDLE_SPEED + PADDLE_HEIGHT / 2 <= CANVAS_HEIGHT) {
        player1y = player1y + PADDLE_SPEED;
      }
      break;
    case 'ArrowUp':
      if (player2y - PADDLE_SPEED - PADDLE_HEIGHT / 2 >= 0) {
        player2y = player2y - PADDLE_SPEED;
      }
      break;
    case 'ArrowDown':
      if (player2y + PADDLE_SPEED + PADDLE_HEIGHT / 2 <= CANVAS_HEIGHT) {
        player2y = player2y + PADDLE_SPEED;
      }
      break;
    default:
      break;
  }
}

function draw() {
  clearCanvas();
  drawGameObjects();
  moveBall();
  handleCollision();
  requestAnimationFrame(draw);
}

setBallAngle(30);
setBallMovement();

document.addEventListener('keydown', handleMovement);
draw();
