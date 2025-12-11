let angle = 0;

function mousePressed() {
  print("vertex(" + mouseX + ", " + mouseY + ");");
}
function setup() {
  createCanvas(800, 600);
  colorMode(RGB);
  angleMode(DEGREES);
}

function draw() {
  let windX = mouseX / 40;
  let windY = mouseY / 40;
  background(114, 166, 137);
  noStroke();

  fill(159, 206, 241);
  rect(0, 0, 800, 200);

  fill(240, 165, 113);
  rect(0, 84, 800, 200);

  fill(238, 151, 91, 255);
  rect(0, 100, 800, 200);

  fill(237, 145, 81);
  rect(0, 120, 800, 200);
  
  //sun
  push(); 
  translate(width / 2, 130);
  blendMode(SCREEN);
  circle(0, 0, 200);
  pop();

  fill(230, 137, 73);
  rect(0, 140, 800, 200);

  //lake
  push();
  fill("rgb(120,166,223)");
  ellipse(width / 2, 350, 900, 350);

  fill("rgb(109,159,221)");
  ellipse(width / 2, 350, windX + 700, windY + 300);

  fill("rgb(103,156,221)");
  ellipse(width / 2, 350, windY + 600, windX + 250);

  pop();

  //
  push();
  translate(166, 365);
  rotate(angle);
  fill("#35634A");
  arc(50, 0, 40, 30, 0, 340);
  arc(50, 40, 40, 30, 0, 340);
  angle = angle + 0.1;
  pop();

  //tree
  fill(121, 76, 48);
  beginShape();
  vertex(609, 600);
  vertex(813, 611);
  vertex(725, 393);
  vertex(691, 480);
  endShape();

  beginShape();
  vertex(702, 455);
  vertex(545, 346);
  vertex(725, 393);
  vertex(691, 480);
  endShape();

  beginShape();
  vertex(702, 455);
  vertex(545, 346);
  vertex(725, 393);
  vertex(691, 480);
  endShape();

  beginShape();
  vertex(701, 390);
  vertex(701, 221);
  vertex(729, 279);
  vertex(727, 396);
  endShape();

  beginShape();
  vertex(721, 397);
  vertex(845, 251);
  vertex(810, 319);
  vertex(735, 418);
  endShape();
  //end tree

  //folliage
  push();
  blendMode(DARKEST);
  fill("#3E6B50");
  beginShape();
  vertex(689, 223);
  vertex(542, 351);
  vertex(517, 463);
  vertex(534, 557);
  vertex(666, 500);
  vertex(728, 566);
  vertex(809, 481);
  vertex(809, 314);
  vertex(762, 208);
  vertex(726, 290);
  endShape();
  pop();
}
