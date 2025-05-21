//Tegne linjer som forsvinner
const backgroundImg = new Image();
backgroundImg.src = "bilder/cuttingboard.jpg";
const cutcolorElm = document.getElementById("cutcolor");

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
  // Draw the background image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  // Draw the faded lines on top
  ctx.drawImage(ctx, 0, 0);
}

function sketch(event) {
  if (!paint) return;
  ctx.beginPath();
  ctx.strokeStyle.cutcolorElm
  ctx.moveTo(coord.x, coord.y);

  getPosition(event);

  ctx.lineTo(coord.x, coord.y);

  ctx.stroke();
}

function fadeCanvas() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Fading color
  ctx.fillRect(0, 0, ctx.width, ctx.height);
}

//Kuler som kan kastes opp


// Hovedløkka vår
function oppdaterAlt() {
  animate();
  fadeCanvas();

  requestAnimationFrame(oppdaterAlt);
}

window.addEventListener("load", () => {
  resize();
  document.addEventListener("mousedown", startPainting);
  document.addEventListener("mouseup", stopPainting);
  document.addEventListener("mousemove", sketch);
  window.addEventListener("resize", resize);
  oppdaterAlt(); // Start the animation loop
});
