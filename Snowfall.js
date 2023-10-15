const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

class Snowflake {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius || Math.random() * 3 + 1; 
    this.speed = speed || Math.random() * 2 + 1; 
  }

  draw() {
    c.beginPath();
    c.fillStyle = "white";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
  }

  move() {
    this.y += this.speed;

    if (this.y > canvas.height + this.radius) {
      this.y = -this.radius; 
    }
  }

  update() {
    this.draw();
    this.move();
  }
}

const snowflakeArr = [];
const totalSnowflakes = 100;

for (let i = 0; i < totalSnowflakes; i++) {
  const x = Math.random() * canvas.width; 
  const y = Math.random() * canvas.height; 
  const radius = Math.random() * 3 + 1; 
  const speed = Math.random() * 2 + 1; 
  const snowflake = new Snowflake(x, y, radius, speed);
  snowflakeArr.push(snowflake);
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < totalSnowflakes; i++) {
    snowflakeArr[i].update();
  }

  requestAnimationFrame(animate);
}

animate();
