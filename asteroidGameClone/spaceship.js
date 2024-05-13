class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;

    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(205, 0, 0);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2 - 5,
             this.location.x + this.size/2, this.location.y + this.size/2 - 5,
             this.location.x, this.location.y - this.size/2);
    fill(125);
    ellipse(this.location.x, this.location.y, this.size);
    push();
    stroke(255);
    fill(80);
    ellipse(this.location.x, this.location.y, this.size - 20);
    stroke('rgba(255,255,255,0.2)');
    strokeWeight(4);
    line(this.location.x - (this.size - 30)/2, this.location.y + (this.size - 30)/2, this.location.x + (this.size - 30)/2, this.location.y - (this.size - 30)/2);
    pop();
    fill(255, 150, 0);

    if (this.moveRight)
    {
      //left-thruster
      triangle(this.location.x - this.size/(random(2,8)) - 35, this.location.y,
              this.location.x + this.size/4 - 35, this.location.y + this.size/12,
              this.location.x + this.size/4 - 35, this.location.y - this.size/12);
    }
    
    if (this.moveDown)
    {
      //top-thruster
      triangle(this.location.x - this.size/12, this.location.y + this.size/4 - 35,
              this.location.x + this.size/12, this.location.y + this.size/4 - 35,
              this.location.x, this.location.y - this.size/random(2,8) - 35);
    }          

    if (this.moveLeft)
    {
      //right-thruster
      triangle(this.location.x + this.size/(random(2,8)) + 35, this.location.y,
              this.location.x - this.size/4 + 35, this.location.y + this.size/12,
              this.location.x - this.size/4 + 35, this.location.y - this.size/12);
    }

    if (this.moveUp)
    {
      //bottom-thruster
      triangle(this.location.x - this.size/12, this.location.y - this.size/4 + 35,
        this.location.x + this.size/12, this.location.y - this.size/4 + 35,
        this.location.x, this.location.y + this.size/random(2,8) + 35);
    }

  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.limit(this.maxVelocity);
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
        this.moveLeft = true;
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.1, 0));
      this.moveRight = true;
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1));
      this.moveUp = true;
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1));
      this.moveDown = true;
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    var gravity = createVector(0, 0.05);
    var friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(1/30);
    this.applyForce(friction);
    this.applyForce(gravity);
  }
}
