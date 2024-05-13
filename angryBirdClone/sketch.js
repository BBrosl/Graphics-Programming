// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var propellerStand;
var propellerRotater;
var boxes = [];
var angryBird;
var angryBirdPos, yellowAngryBirdPos;
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
var totalSeconds = 20;
var counter = setInterval(function(){
  if (totalSeconds <= 0) 
  {
    clearInterval(counter);     
  } 
  else 
  {
    totalSeconds = totalSeconds - 1;
  }}, 1000);
////////////////////////////////////////////////////////////

function preload()
{
  angryBird = loadImage('angry-bird.png');
  yellowAngryBird = loadImage('yellow-angry-bird.png')
}

function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {
  background(226, 255, 255);

  Engine.update(engine);

  fill(0, 200, 0);
  ellipse(400, 650, 300, 500);
  ellipse(700, 650, 300, 800);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();

  gameState();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

function gameState()
{
    if(totalSeconds > 0)
    {
      fill(0);
      textSize(30);
  		text("Time left: " + totalSeconds, width/2 - 100, 40);
    } 
    else
    {
      fill(0);
      textSize(100);
      text("Game Over!", width/2 - 250, height/2);
      noLoop();
    }

  if (boxes.length == 0)
  {
    noLoop();
    fill("black");
    textSize(80);
    text("You win!", width/2 - 100, height/2);
  }

  else
  {
    for (var i = boxes.length - 1; i >= 0; i--)
    {
      if (isOffScreen(boxes[i]))
      {
        boxes.splice(i, 1);
      }
    }
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(218, 151, 51);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
