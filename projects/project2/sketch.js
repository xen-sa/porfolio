let leftWidthCenter;
let rightWidthCenter;
let heightCenter;
let eyeDiameter;
let faceDiameter;

let faceFillH;
let faceFillS;
let backgroudFillH;
let backgroundFillS;

let over = false;
let scared = false;
let pupilX;
let pupilY;
let maxMouthHeight;
let pupilDiameter;
let count=0;

function randomize() {
  //create random variables
  faceDiameter = random(120, 300);
  faceFillH = random(210, 260);
  faceFillS = random(30, 40);
  backgroundFillH = random(300, 350);
  backgroundFillS = random(10, 15);

  eyeDiameter = faceDiameter * 0.4;
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  randomize();
}

function draw() {
  background(backgroundFillH, backgroundFillS, 100);
  noStroke();

  leftWidthCenter = -faceDiameter * 0.21;
  rightWidthCenter = faceDiameter * 0.21;
  heightCenter = -faceDiameter * 0.15;
  featuresSize();

  //face shape (circle)
  translate(width / 2, height / 2);
  fill(faceFillH, faceFillS, 100);
  face = circle(0, 0, faceDiameter);

  //eyes
  fill("white");
  circle(leftWidthCenter, heightCenter, eyeDiameter);
  circle(rightWidthCenter, heightCenter, eyeDiameter);

  //pupils
  let distance = dist(0, 0, mouseX - width / 2, mouseY - height / 2);
  pupilDiameter = map(
    distance,
    0,
    width / 2,
    eyeDiameter * 0.85,
    eyeDiameter * 0.75,
    true
  );

  //left pupil
  push();
  fill("black");
  translate(leftWidthCenter, heightCenter);
  circle(pupilX, pupilY, pupilDiameter);
  pop();

  //right pupil
  push();
  fill("black");
  translate(rightWidthCenter, heightCenter);
  circle(pupilX, pupilY, pupilDiameter);
  pop();

  //mouth
  let mouthHeight = map(distance, 0, width / 2, maxMouthHeight, 0, true);

  push();
  strokeWeight(2);
  stroke("white");
  line(-faceDiameter / 8, faceDiameter / 5, faceDiameter / 8, faceDiameter / 5);
  ellipse(0, faceDiameter / 5, faceDiameter / 4, mouthHeight);
  pop();

  //text
  if (scared == true) {
    fill(faceFillH, faceFillS, 100);
    textSize(17);
    textAlign(CENTER);
    text("you scared your friend away :( \n click anywhere to make a new one", 0, 50);
  }
  
  if (frameCount%4==0){
    count=count+1;
  }
  
}

function featuresSize() {
  if (scared == true) {
    faceDiameter = 40;
    eyeDiameter = faceDiameter * 0.6;
    maxMouthHeight = 0;
    pupilY=0;
    if(count%2==0){
      pupilX = 1;
    } else{
    pupilX = -1;
    }  
  } else {
    pupilX = (mouseX - width / 2) / eyeDiameter;
    pupilY = (mouseY - height / 2) / eyeDiameter;
    maxMouthHeight = faceDiameter / 3;
  }
}

function overFace() {
  if (
    mouseX > width / 2 - faceDiameter / 2 &&
    mouseX < width / 2 + faceDiameter / 2 &&
    mouseY > height / 2 - faceDiameter / 2 &&
    mouseY < height / 2 + faceDiameter / 2
  ) {
    over = true;
  } else {
    over = false;
  }
}

function mouseClicked() {
  overFace();
  if (over == true) {
    scared = true;
  } else {
    randomize();
    scared = false;
  }
}
