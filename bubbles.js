const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
let totalParticleNumber = 100;

class Particle {
  constructor() {
    this.x = Math.random() * (500 - 0) + 0;
    this.y = Math.random() * (500 - 0) + 0;
    this.r = Math.random() * (30 - 0) + 5;
  }

  draw() {
    c.beginPath();
    c.fillStyle = "darkblue";
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fill();
  }

  move() {
    this.x += Math.random() * (1 - -1) + -1;
    this.y += Math.random() * (1 - -1) + -1;
  }
}

const particleArr = [];
for (let i = 0; i < totalParticleNumber; i++) {
  const obj = new Particle();
  particleArr.push(obj);
}
console.log(particleArr);

function animate() {
  c.clearRect(0, 0, 500, 500);

  for (let i = 0; i < totalParticleNumber; i++) {
    particleArr[i].draw();
    particleArr[i].move();
  }

  requestAnimationFrame(animate);
}

animate();