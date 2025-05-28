let score = 0;
let time = 3000;


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight;
}

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
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.canvas.style.cursor = "crosshair";
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

function fadeCanvas() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Fading color
  ctx.fillRect(0, 0, ctx.width, ctx.height);
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
  ball.style.left = `${Math.random() * window.innerWidth}px`;
  ball.style.top = `${Math.random() * window.innerHeight}px`;
  document.body.appendChild(ball);
  
  timeoutId = setTimeout(() => {
    ball.remove();
    shootBall();
  }, time);
  
  ball.onclick = function ballKlikket() {
    ball.remove();
    clearTimeout(timeoutId);
    score++;
    time *= 0.8; // Reduserer tiden for neste ball
    console.log("Score: " + score, "Timout: " + time);
    shootBall();
  };
}
