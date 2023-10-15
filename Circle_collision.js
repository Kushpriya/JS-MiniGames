const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const circles = [];
const numCircles = 10;

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < numCircles; i++) {
  const radius = getRandomSize(10, 50);
  const circle = {
    x: Math.random() * (canvas.width - radius * 2) + radius,
    y: Math.random() * (canvas.height - radius * 2) + radius,
    radius: radius,
    x_speed: (Math.random() - 0.5) * 2, 
    y_speed: (Math.random() - 0.5) * 2,
  };
  circles.push(circle);
}

function checkCollision(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}

function updateCircles() {
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      circle.collided = false;
  
      for (let j = 0; j < circles.length; j++) {
        if (i !== j) {
          const otherCircle = circles[j];
          if (checkCollision(circle, otherCircle)) {
            circle.collided = true;
            otherCircle.collided = true;
            const tempXSpeed = circle.x_speed;
            const tempYSpeed = circle.y_speed;
            circle.x_speed = otherCircle.x_speed;
            circle.y_speed = otherCircle.y_speed;
            otherCircle.x_speed = tempXSpeed;
            otherCircle.y_speed = tempYSpeed;
          }
        }
      }
  

    circle.x += circle.x_speed;
    circle.y += circle.y_speed;

    if (circle.x - circle.radius <= 0 || circle.x + circle.radius >= canvas.width) {
      circle.x_speed *= -1;
    }
    if (circle.y - circle.radius <= 0 || circle.y + circle.radius >= canvas.height) {
      circle.y_speed *= -1;
    }
  }
}

function drawCircles() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];
      c.beginPath();
      if (circle.collided) {
        c.fillStyle = "red";
      } else {
        c.fillStyle = "green";
      }
      c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      c.fill();
    }
  }

function animate() {
  updateCircles();
  drawCircles();
  requestAnimationFrame(animate);
}

animate();
