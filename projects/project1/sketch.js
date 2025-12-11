let angle = 0;

function mousePressed() {
  print("vertex(" + mouseX + ", " + mouseY + ");");
}

function setup() {
  container = select("#sketch-container");

  let h = container.height;
  let w = h*4/3;

  let c = createCanvas(w, h);
  c.parent("sketch-container");

  colorMode(RGB);
  angleMode(DEGREES);
}

function windowResized() {
  let h = container.height;
  let w = h*4/3;
  resizeCanvas(w, h);
}

function draw() {
  let w = width;
  let h = height;

  let windX = mouseX / 40;
  let windY = mouseY / 40;

  background(114, 166, 137);
  noStroke();

  // --- Background layers (scaled) ---
  fill(159, 206, 241);
  rect(0, 0, w, h * 0.30);

  fill(240, 165, 113);
  rect(0, h * 0.14, w, h * 0.25);

  fill(238, 151, 91, 255);
  rect(0, h * 0.17, w, h * 0.25);

  fill(237, 145, 81);
  rect(0, h * 0.20, w, h * 0.25);

  // --- Sun ---
  push(); 
  translate(w / 2, h * 0.22);
  blendMode(SCREEN);
  circle(0, 0, h * 0.33);
  pop();

  fill(230, 137, 73);
  rect(0, h * 0.24, w, h * 0.25);

  // --- Lake (scaled) ---
  push();
  fill("rgb(120,166,223)");
  ellipse(w / 2, h * 0.58, w * 1.2, h * 0.55);

  fill("rgb(109,159,221)");
  ellipse(w / 2, h * 0.58, windX + w * 0.9, windY + h * 0.33);

  fill("rgb(103,156,221)");
  ellipse(w / 2, h * 0.58, windY + w * 0.75, windX + h * 0.22);
  pop();

  // --- Rotating blades ---
  push();
  translate(w * 0.21, h * 0.61);
  rotate(angle);
  fill("#35634A");
  arc(w * 0.06, 0, w * 0.05, h * 0.05, 0, 340);
  arc(w * 0.06, h * 0.07, w * 0.05, h * 0.05, 0, 340);
  angle += 0.1;
  pop();

  // --- Tree trunk ---
  fill(121, 76, 48);
  beginShape();
  vertex(w * 0.76, h);
  vertex(w * 1.02, h * 1.02); 
  vertex(w * 0.90, h * 0.66);
  vertex(w * 0.84, h * 0.80);
  endShape();

  beginShape();
  vertex(w * 0.86, h * 0.76);
  vertex(w * 0.68, h * 0.58);
  vertex(w * 0.90, h * 0.66);
  vertex(w * 0.84, h * 0.80);
  endShape();

  beginShape();
  vertex(w * 0.87, h * 0.65);
  vertex(w * 0.87, h * 0.37);
  vertex(w * 0.91, h * 0.47);
  vertex(w * 0.90, h * 0.66);
  endShape();

  beginShape();
  vertex(w * 0.89, h * 0.66);
  vertex(w * 1.05, h * 0.42);
  vertex(w * 1.00, h * 0.53);
  vertex(w * 0.92, h * 0.69);
  endShape();

  // --- Foliage ---
  push();
  blendMode(DARKEST);
  fill("#3E6B50");

  beginShape();
  vertex(w * 0.83, h * 0.37);
  vertex(w * 0.65, h * 0.58);
  vertex(w * 0.62, h * 0.77);
  vertex(w * 0.64, h * 0.93);
  vertex(w * 0.80, h * 0.83);
  vertex(w * 0.88, h * 0.94);
  vertex(w * 1.00, h * 0.80);
  vertex(w * 1.00, h * 0.52);
  vertex(w * 0.94, h * 0.34);
  vertex(w * 0.89, h * 0.45);
  endShape();

  pop();
}
