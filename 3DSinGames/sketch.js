let maxHeightSlider;
let heightVal;
let sineSpeedSlider;
let sineSpeedVal;

function setup() {
    createCanvas(900, 800, WEBGL);
    camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
    angleMode(DEGREES);

    //slider for height of cube
    maxHeightSlider = createSlider(0, 300, 0);
    maxHeightSlider.position(30,20);
    maxHeightSlider.style('width', '100px');

    //slider for speed of sine wave
    sineSpeedSlider = createSlider(1, 5, 1, 0.1);
    sineSpeedSlider.position(30,50);
    sineSpeedSlider.style('width', '100px');

    // confetti initialization code
    confLocs = [];
    confTheta = [];

    for (var i = 0; i < 200 ; i++)
    {
        var rand_x = random(-500, 500);
        var rand_y = random (-800, 0);
        var rand_z = random (-500, 500);
        var rand_vect = createVector(rand_x, rand_y, rand_z);
        confLocs.push(rand_vect);
        var rand_angle = random(0, 360);
        confTheta.push(rand_angle);

    }
}

function draw() {
    background(125);
    heightVal = maxHeightSlider.value();
    sineSpeedVal = sineSpeedSlider.value();

    var xLoc = cos(frameCount) * height;
    var zLoc = sin(frameCount) * height;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

    // 3d sine wave cube code
    for (var x = -400; x < 400; x += 50)
    {
        for (var z = -400; z < 400; z += 50)
        {
            push();

            // material for cubes
            specularMaterial(255);
            stroke(0);
            strokeWeight(2);
            pointLight(255, 105, 180, -300, -300 , 500);
            shininess(1);

            translate(x, 0, z);
            var distance = dist(0, 0, x, z) + frameCount;
            var length = map(sin(distance*sineSpeedVal), -1, 1, 100, 300);
            box(50, length + heightVal, 50);

            pop();
        }
    }

    confetti();
}

function confetti()
{
    for (var i = 0; i < confLocs.length; i++)
    {
        push();

        normalMaterial();
        noStroke();
        strokeWeight(2);

        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15, 15);

        confLocs[i].y += 1;
        confTheta[i] += 10;

        if (confLocs[i].y > 0)
        {
            confLocs[i].y = -800;
        }
        
        pop();
    }
}
