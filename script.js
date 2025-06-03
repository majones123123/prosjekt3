let score = 0;
let time = 3000;
let lives = 3;
let missed = 0;
let hit = 0;
const gameOver = document.getElementsByClassName("gameover");
let width = window.innerWidth - 200;
if (width < 400) {
  width = window.innerWidth - 70;
}
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function resize() {
  ctx.canvas.width = width;
  ctx.canvas.height = window.innerHeight;
  ctx.width = width;
  ctx.height = window.innerHeight;
}
ctx.canvas.style.cursor = "crosshair";
let coord = { x: 0, y: 0 };

let paint = false;

function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
  paint = true;
  getPosition(event);
}
function stopPainting() {
  paint = false;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function stopGame() {
  clearTimeout(timeoutId);
  const gameOver = document.createElement("div");
  gameOver.className = "gameover";
  gameOver.innerHTML = `<h1>Game Over</h1>
                        <p>Score: ${score}</p>
                        <p>Lives: ${lives}</p>
                        <p>Missed: ${missed}</p>
                        <p>Hit: ${hit}</p>`;
  document.body.appendChild(gameOver);
  document.removeEventListener("mousedown", startPainting);
  document.removeEventListener("mouseup", stopPainting);
  document.removeEventListener("mousemove", sketch);
}

function sketch(event) {
  if (!paint) return;
  ctx.beginPath();
  ctx.canvas.style.cursor = "crosshair";
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

// Hovedløkka vår
function oppdaterAlt() {
  animate();
  requestAnimationFrame(oppdaterAlt);
}

window.addEventListener("load", () => {
  resize();
  document.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  document.addEventListener("mousemove", sketch);
  window.addEventListener("resize", resize);
  oppdaterAlt();
  shootBall();
});

let timeoutId = null;

// Funksjon for å kaste baller
// Funksjonen oppretter en ball som plasseres tilfeldig på skjermen

function shootBall() {
  const livesText = document.getElementById("lives");
  const timeText = document.getElementById("time");
  timeText.innerHTML = "Time: " + (time / 1000).toFixed(2) + "s";
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.left = `${Math.random() * (width - 50)}px`;
  ball.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  document.body.appendChild(ball);
  timeoutId = setTimeout(() => {
    ball.remove();
    shootBall();
    if (time - time === 0) {
      missed++;
      console.log("Missed: " + missed);
      if (missed >= 3) {
        lives--;
        livesText.innerHTML = "Lives: " + lives;
        missed = 0;
        console.log("Lives: " + lives);
        if (lives <= 0) {
          stopGame();
        }
      }
    }
  }, time);

  ball.onclick = function ballKlikket() {
    const scoreText = document.getElementById("score");
    score++;
    scoreText.innerHTML = "Score: " + score;
    ball.remove();
    clearTimeout(timeoutId);
    time *= 0.9; // Reduserer tiden for neste ball
    console.log("Score: " + score, "Timout: " + time);
    shootBall();
    hit++;
    if (score % 5 === 0) {
      lives++;
      console.log("Lives: " + lives);
    }
    livesText.innerHTML = "Lives: " + lives;
    missed = 0;
  };
}
