let score = 0;
let time = 3000;
let lives = 3;
let missed = 0;
let hit = 0;

const width = window.innerWidth - 200;
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
  //fadeCanvas();
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
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.left = `${Math.random() * width - 50}px`;
  ball.style.top = `${Math.random() * window.innerHeight - 50}px`;
  document.body.appendChild(ball);
  timeoutId = setTimeout(() => {
    ball.remove();
    shootBall();
    if (time-time===0) {
      missed++;
      console.log("Missed: " + missed);
      if (missed >= 3) {
        lives--;
        missed = 0;
        console.log("Lives: " + lives);
        if (lives <= 0) {
          alert("Game Over! Final Score: " + score);
          location.reload(); // Restart the game
        }
      }
    }
  }, time);
  
  ball.onclick = function ballKlikket() {
    ball.remove();
    clearTimeout(timeoutId);
    score++;
    time *= 0.9; // Reduserer tiden for neste ball
    console.log("Score: " + score, "Timout: " + time);
    shootBall();
    hit++;
    if (score % 5 === 0) {
      lives++;
      console.log("Lives: " + lives);
    }
    missed = 0;
  };
}
