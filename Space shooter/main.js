const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let gameScore =0;
const player = new Player();
let allBullets = [];
let enemies = [];
const background = new Background(0, 0);

setInterval(() => {
  const enemy = new Enemy();
  enemies.push(enemy);
}, 2000);

function loop() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  background.update(player.isAlive);
  player.update();
  
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].collision(player);

    if (enemies[i].collisionWithBullet(allBullets)) {
      enemies.splice(i, 1);
      gameScore += 2; 
      i--;
    }
  } 

  for (let i = 0; i < allBullets.length; i++) {
    allBullets[i].update();
  }

  c.beginPath();
  c.fillStyle = "white";
  c.font = " bold 50px sans serif";            
  c.fillText(gameScore, 5, 40);
 
  if (!player.isAlive) {
    c.font = "bold 80px Arial";
    c.fillStyle = "white";
    c.fillText("GAME OVER", 200, 300);
    return; 
  }

  requestAnimationFrame(loop); 
}

loop();

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") player.velocity.y = -5;
  if (event.code === "ArrowDown") player.velocity.y = 5;
  if (event.code === "ArrowLeft") player.velocity.x = -5;
  if (event.code === "ArrowRight") player.velocity.x = 5;
  if (event.code === "Space")
  {
     player.shoot();
    allBullets.push( new Bullet(player.position.x + player.size / 3.1 , player.position.y));
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowUp") player.velocity.y = 0;
  if (event.code === "ArrowDown") player.velocity.y = 0;
  if (event.code === "ArrowLeft") player.velocity.x = 0;
  if (event.code === "ArrowRight") player.velocity.x = 0;
});
