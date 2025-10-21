const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let tennisBalls = [];

function createStars(count) {
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.2
    });
  }
}

function createTennisBall() {
  tennisBalls.push({
    x: Math.random() * canvas.width,
    y: -50,
    dx: (Math.random() - 0.5) * 2,
    dy: Math.random() * 1.5 + 1,
    radius: 15
  });
}

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
}

function drawTennisBalls() {
  tennisBalls.forEach(b => {
    ctx.beginPath();
    ctx.fillStyle = "lime";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "lime";
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updateTennisBalls() {
  tennisBalls.forEach(b => {
    b.x += b.dx;
    b.y += b.dy;
  });
  tennisBalls = tennisBalls.filter(b => b.y < canvas.height + 50);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  updateStars();

  drawTennisBalls();
  updateTennisBalls();

  requestAnimationFrame(animate);
}

createStars(2000);
setInterval(createTennisBall, 1000);
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
