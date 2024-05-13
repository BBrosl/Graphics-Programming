var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  push();
  textSize(20);
  fill('white');
  text("Score: " + score, width/2, 30);
  pop();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(0, 0, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
  //draw landmass
  fill(0, 255, 0);
  beginShape();
  curveVertex(earthLoc.x, earthLoc.y - 1800);
  curveVertex(earthLoc.x + 280, earthLoc.y - 1680);
  curveVertex(earthLoc.x - 50, earthLoc.y - 1600);
  curveVertex(earthLoc.x, earthLoc.y);
  endShape();
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i = 0; i < asteroids.locations.length; i++)
    {
      if (isInside(spaceship.location, 
                   spaceship.size, 
                   asteroids.locations[i], 
                   asteroids.diams[i]))
      {
        gameOver();
      }
    

      //asteroid-2-earth collisions
      //YOUR CODE HERE (2-3 lines approx)
    
      else if (isInside(asteroids.locations[i], 
                        asteroids.diams[i],
                        earthLoc, 
                        earthSize.x))
      {
        gameOver();
      }

      //spaceship-2-earth
      //YOUR CODE HERE (1-2 lines approx)

      else if (isInside(spaceship.location, 
                        spaceship.size, 
                        earthLoc, 
                        earthSize.x))
      {
        gameOver();
      }

      //spaceship-2-atmosphere
      //YOUR CODE HERE (1-2 lines approx)

      else if (isInside(spaceship.location, 
                        spaceship.size, 
                        atmosphereLoc, 
                        atmosphereSize.x))
      {
        spaceship.setNearEarth();
      }
        
//      for (var j = 0; j < spaceship.bulletSys.bullets.length; j++)
//      {
//
//        if (isInside(asteroids.locations[i], 
//                     asteroids.diams[i],
//                     spaceship.bulletSys.bullets[j],
//                     spaceship.bulletSys.diam))
//        {
//          asteroids.destroy(i);
//          score++;
//          i = 0;
//        }
//      }
    }
    
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    
    var BulletSys = spaceship.bulletSys;
    var bullets = BulletSys.bullets;
    for(var i = 0; i < bullets.length; i++)
    {
        for(var j = 0; j < asteroids.locations.length; j++)
            {
                var asteroidLoc = asteroids.locations[j];
                var asteroidDiam = asteroids.diams[j];
                if (isInside(asteroidLoc,asteroidDiam,bullets[i],BulletSys.diam))
                    {
                        asteroids.destroy(j);
                        score++;
                    }
            }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    if (p5.Vector.dist(locA, locB) < (sizeA/2 + sizeB/2))
    {
      return true;
    }
    return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

function keyReleased()
{
  if (keyCode === UP_ARROW)
  {
    spaceship.moveUp = false;
  }

  if (keyCode === DOWN_ARROW)
  {
    spaceship.moveDown = false;
  }

  if (keyCode === LEFT_ARROW)
  {
    spaceship.moveLeft = false;
  }

  if (keyCode === RIGHT_ARROW)
  {
    spaceship.moveRight = false;
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2);
  textSize(30);
  text("Your score is " + score, width/2, height/2 + 35);
  noLoop();
}


//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
