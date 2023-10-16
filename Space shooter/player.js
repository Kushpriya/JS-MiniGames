class Player {
    constructor() 
    {
       this.position = {
        x: canvas.width / 2.2 ,
        y: canvas.height / 1.9,
      };
  
      this.velocity = {
        x: 0,
        y: 0,
      };
  
      this.isAlive = true;
      this.size = 70;
      this.image = new Image();
      this.image.src = "./spaceship.png";
      this.shootSound = new Audio('./shoot.wav');
    }

      collision(enemy) 
       {
        if (
            this.position.x < enemy.position.x + enemy.size &&
            this.position.x + this.size > enemy.position.x &&
            this.position.y < enemy.position.y + enemy.size &&
            this.position.y + this.size > enemy.position.y
        ) {
            this.isAlive = false;
        }
       }
  
    draw() 
    {
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
    }
  
    move() 
    {
    
      const nextX = this.position.x + this.velocity.x;
      const nextY = this.position.y + this.velocity.y;

      if (nextX >= 0 && nextX + this.size <= canvas.width) {
          this.position.x = nextX; 
      }

      if (nextY >= 0 && nextY + this.size <= canvas.height) {
          this.position.y = nextY; 
      }
    }
    shoot() {
        this.shootSound.play();
    }
  
    update() 
    {
        this.draw();
        if (this.isAlive) {
            this.move();
        }
    }
}
  