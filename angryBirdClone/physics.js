////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true});
  propellerStand = Bodies.rectangle(150, 534, 15, 92, {isStatic: true});
  propellerRotater = Bodies.circle(150, 480, 10, {isStatic: true});
  World.add(engine.world, [propeller,propellerStand, propellerRotater]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  fill(218, 151, 51);
  // your code here
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  drawVertices(propeller.vertices);
  drawVertices(propellerStand.vertices);
  drawVertices(propellerRotater.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 17, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for (var i = 0; i < birds.length; i++)
  {
    fill(255, 255, 0);
    drawVertices(birds[i].vertices);
    imageMode(CENTER);
    yellowAngryBirdPos = birds[i].position;
    image(yellowAngryBird, yellowAngryBirdPos.x, yellowAngryBirdPos.y - 7, 50, 50);
    if (isOffScreen(birds[i]))
    {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  for (var i = 0; i < 3; i++)
  {
    for (var j = 0; j < 6; j++)
    {
      var box = Bodies.rectangle(750 + 80 * i, 140 + 80 * j, 80, 80);
      World.add(engine.world, [box]);
      boxes.push(box);
    }
  }

  for (var i = 0; i < boxes.length; i++)
  {
    var c = color(random(100, 200));
    colors.push(c);
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i = 0; i < boxes.length; i++)
  {
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  //your code here
  slingshotBird = Bodies.circle(230, 200, 20, {friction: 0,
  restitution: 0.95 });
  angryBirdPos = slingshotBird.position;
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  World.add(engine.world, [slingshotBird]);
  slingshotConstraint = Constraint.create({
    pointA: {x: 230, y: 200},
    pointB: {x: -10, y: -10},
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255);
  drawVertices(slingshotBird.vertices);
  imageMode(CENTER);
  image(angryBird, angryBirdPos.x - 5, angryBirdPos.y - 5, 50, 50);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
