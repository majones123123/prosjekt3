//Tegne linjer som forsvinner


const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');


function fadeCanvas() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(fadeCanvas);
}

backgroundImg.onload = () => {
  resize();
  animate();
};

window.addEventListener('load', () => {
    resize(); 
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
    fadeCanvas();
});

const canvas = document.querySelector('#canvas');
 

const ctx = canvas.getContext('2d');


function resize(){
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
  
let coord = {x:0 , y:0}; 
 

let paint = false;
  
function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}


function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}
  
function animate() {
  // Fade the lines on the offscreen canvas
  offscreenCtx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fading color
  offscreenCtx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

  // Draw the background image
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

  // Draw the faded lines on top
  ctx.drawImage(offscreenCanvas, 0, 0);

  requestAnimationFrame(animate);
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
  
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'green';
  ctx.moveTo(coord.x, coord.y);
 
  getPosition(event);
 
  ctx.lineTo(coord.x , coord.y);

  ctx.stroke();
}

//Kuler som kan kastes opp