let container;

let leftWidthCenter;
let rightWidthCenter;
let heightCenter;
let eyeDiameter;
let faceDiameter;

let faceFillH;
let faceFillS;
let backgroundFillH;
let backgroundFillS;

let over = false;
let scared = false;
let pupilX;
let pupilY;
let maxMouthHeight;
let pupilDiameter;
let count = 0;

function randomize() {
  // Scale face diameter relative to canvas height
  faceDiameter = random(height * 0.20, height * 0.6);
  faceFillH = random(210, 260);
  faceFillS = random(30, 40);
  backgroundFillH = random(300, 350);
  backgroundFillS = random(10, 15);

  eyeDiameter = faceDiameter * 0.4;
}

function setup() {
  container = select("#sketch-container");

  let h = container.height;

  let c = createCanvas(h, h);
  c.parent("sketch-container");

  colorMode(HSB, 360, 100, 100);
  randomize();
}

function windowResized() {
  let h = container.height;
  resizeCanvas(h, h);
  randomize();
}

function draw() {
  background(backgroundFillH, backgroundFillS, 100);
  noStroke();

  let w = width;
  let h = height;

  leftWidthCenter = -faceDiameter * 0.21;
  rightWidthCenter = faceDiameter * 0.21;
  heightCenter = -faceDiameter * 0.15;

  featuresSize();

  // --- face ---
  push();
  translate(w / 2, h / 2);
  fill(faceFillH, faceFillS, 100);
  circle(0, 0, faceDiameter);

  // --- eyes ---
  fill("white");
  circle(leftWidthCenter, heightCenter, eyeDiameter);
  circle(rightWidthCenter, heightCenter, eyeDiameter);

  // --- pupils ---
  let distance = dist(0, 0, mouseX - w / 2, mouseY - h / 2);
  pupilDiameter = map(distance, 0, w / 2, eyeDiameter * 0.85, eyeDiameter * 0.75, true);

  push();
  fill("black");
  translate(leftWidthCenter, heightCenter);
  circle(pupilX, pupilY, pupilDiameter);
  pop();

  push();
  fill("black");
  translate(rightWidthCenter, heightCenter);
  circle(pupilX, pupilY, pupilDiameter);
  pop();

  // --- mouth ---
  let mouthHeight = map(distance, 0, w / 2, maxMouthHeight, 0, true);

  push();
  strokeWeight(w * 0.003); // scale stroke weight
  stroke("white");
  line(-faceDiameter / 8, faceDiameter / 5, faceDiameter / 8, faceDiameter / 5);
  ellipse(0, faceDiameter / 5, faceDiameter / 4, mouthHeight);
  pop();

  // --- text ---
  if (scared) {
    fill(faceFillH, faceFillS, 100);
    textSize(h * 0.035); 
    textAlign(CENTER);
    text(
      "you scared your friend away :( \n click anywhere to make a new one",
      0,
      -h * 0.3
    );
  }

  if (frameCount % 4 === 0) count++;
  pop();
}

function featuresSize() {
  if (scared) {
    faceDiameter = height * 0.07;
    eyeDiameter = faceDiameter * 0.6;
    maxMouthHeight = 0;
    pupilY = 0;
    pupilX = count % 2 === 0 ? 1 : -1;
  } else {
    pupilX = (mouseX - width / 2) / eyeDiameter;
    pupilY = (mouseY - height / 2) / eyeDiameter;
    maxMouthHeight = faceDiameter / 3;
  }
}

function overFace() {
  over =
    mouseX > width / 2 - faceDiameter / 2 &&
    mouseX < width / 2 + faceDiameter / 2 &&
    mouseY > height / 2 - faceDiameter / 2 &&
    mouseY < height / 2 + faceDiameter / 2;
}

function mouseClicked() {
  overFace();
  if (over) {
    scared = true;
  } else {
    randomize();
    scared = false;
  }
}