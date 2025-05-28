let score = 0;

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

// Funksjon for å kaste baller
// Funksjonen oppretter en ball som plasseres tilfeldig på skjermen
function shootBall() {
  const ball = document.createElement("div");
  ball.className = "ball";
  ball.style.left = `${Math.random() * window.innerWidth}px`;
  ball.style.top = `${Math.random() * window.innerHeight}px`;
  document.body.appendChild(ball);
  setTimeout(() => {
    ball.remove();
    return shootBall();
  }, 3000);
  ball.onclick = function () {
    ball.remove();
    score++;
  };
}
