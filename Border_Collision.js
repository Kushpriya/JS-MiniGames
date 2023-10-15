const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const circleArr = [];
const totalCircleNumber = 150;

class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius ;
    this.color = color;
    this.x_speed = 1;
    this.y_speed = 1;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, 360);
    c.fill();
  }

  move() {
    this.x += this.x_speed;
    this.y += this.y_speed;
  }

  checkCollision() {
    if (this.x + this.radius > canvas.width) {
      this.x_speed = -1;
    }
    else if (this.x - this.radius < 0) {
      this.x_speed = 1; 
    }

    if (this.y + this.radius > canvas.height) {
      this.y_speed = -1;
    }
    else if (this.y - this.radius < 0) {
      this.y_speed = 1; 
    }
  }

  update() {
    this.draw();
    this.checkCollision();
    this.move();
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

for (let i = 0; i < totalCircleNumber; i++) {
  const x = Math.random() * (700 - 0) + 0;
  const y = Math.random() * (700 - 0) + 0;
  const radius = Math.random() * (30 -0) + 5;
  const color = getRandomColor();
  const circle = new Circle(x, y, radius, color);
  circleArr.push(circle);
}

function animate() 
{
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < totalCircleNumber; i++) 
  {
    circleArr[i].update();
  }

  requestAnimationFrame(animate);
}

animate();
