var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  for (var i = 0; i < 25; i++)
  {
    for (var j = 0; j < 25; j++)
    {
      noStroke();
      var speed = map(mouseX, 0, width, 30, 100);
      var n = noise(i/speed, j/speed, frameCount/speed);
      var r = color(196, 45, 100);
      var g = color(0, 174, 214);
      var lerp = lerpColor(r, g, n);
      fill(lerp);
      rect(i * 20,j * 20, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  for (var i = 0; i < 25; i++)
  {
    for (var j = 0; j < 25; j++)
    {
      push();
      translate(i * 20 + 20/2, j * 20 + 20/2);
      angleMode(DEGREES);
      var n = noise(i, j, frameCount/50);
      var rotSpeed = map(mouseX, 0, width, 0.2, 1);
      var rot = map(n, 0, 1, 0, 720);
      rotate(rot*rotSpeed);
      var lineColour = map(n, 0, 1, 0, 255);
      var lineLength = map(n, 0, 1, 0, 10);
      stroke(lineColour);
      strokeWeight(n*4);
      line(0, 0, 0, 0 + 15 + lineLength);
      pop();
    }
  }

  
}
