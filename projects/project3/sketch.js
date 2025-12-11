let startTime;
let elapsedTime = 0;
let font;
let grams = 0;
let brew = false;
let flow = "stop";
let centerCoffee;
let waterPour = 0;
let waterStop;
let waterY = 0;
let gramCount;
let maxGrams = 40;
let start = true;
let coffeeFall = 100;
let end = false;

function mouseClicked() {
  if (!end) {
    flow = "pour";
    start = false;
    brew = true;
  } else if (end) {
    coffeeFall = 0;
    grams = 0;
    maxGrams=0;
    flow = "pour";
    start = false;
    brew = true;
    end = false;
  }
}

function preload() {
  font = loadFont("/sketches/project3/digital.ttf");
}

function setup() {
  createCanvas(600, 600);
  centerCoffee = height / 2 - 30;
}

function draw() {
  background("rgb(198,163,136)");
  noStroke();

  textAlign(CENTER);
  textFont("Tahoma");
  textSize(20);

  fill("white");
  if (start) {
    text("click anywhere to brew your coffee.", width / 2, 550);
  }
  textFont(font);

  // coffee balance
  fill("black");
  rect(125, 150, 350, 350, 20);
  fill("rgb(83,81,81)");
  rect(120, 160, 355, 250);
  push();
  stroke("rgba(80,80,80,0.88)");
  fill("rgb(85,85,85)");
  for (s=160; s<=400; s+=20){
    rect(121, s, 353, 10, 5);
  }
  pop();

  if (brew) {
    elapsedTime = int(millis() / 1000); // elapsed in seconds
  }

  let minutes = int(elapsedTime / 60);
  let seconds = elapsedTime % 60;
  let timerText = minutes + ":" + nf(seconds, 2);

  textSize(40);
  textAlign(LEFT, CENTER);
  //timer
  fill("white");
  text(timerText, 160, 455);
  //g/s
  push();
  fill("#FDB864");
  text("0.0", 300, 455);
  pop();
  //gramos
  push();
  textAlign(RIGHT);
  text(round(grams) + ".0", 450, 455);
  pop();
  //small texts
  push();
  textFont("Tahoma");
  textSize(12);
  text("g", 440, 432);
  fill("#FDB864");
  text("g/s", 326, 432);
  pop();

  push();
  translate(width / 2, height / 2 - 30);
  fill("#664D3B");
  ellipse(0, 0, coffeeFall);

  //jarra
  fill("rgba(255,255,255,0.35)");
  ellipse(0, 0, 320);
  rect(125, -16, 55, 32, 0, 15, 15, 0);
  fill("rgba(255,255,255,0.1)");
  ellipse(0, 0, 300);
  rect(150, -16, 30, 32, 0, 15, 15, 0);

  //v60
  rotate(-0.3);
  fill("rgb(255, 255, 255)");
  rect(120, -13, 50, 26, 10);
  ellipse(0, 0, 260);
  for (let r = 240 / 2; r > 0; r--) {
    let inter = map(r, 0, 240 / 2, 0, 1);
    fill(lerpColor(color(216, 216, 216), color(245, 245, 245), inter));
    ellipse(0, 0, r * 2);
  }

  fill("#664D3B");
  ellipse(0, 0, 130);
  pop();

  if (elapsedTime == 30 || elapsedTime == 60 || elapsedTime == 90) {
    flow = "pour";
    pourNumber = +1;
  } else if (elapsedTime == 120) {
    brew = false;
    end = true;
    textAlign(CENTER);
    textFont("Tahoma");
    textSize(20);
    text("your coffee is ready.", width / 2, 550);
  }
  if (elapsedTime == 30) {
    maxGrams = 100;
  }
  if (elapsedTime == 60) {
    maxGrams = 160;
  }
  if (elapsedTime == 90) {
    maxGrams = 220;
  }

  waterFlow();

  fill("rgb(165,186,231)");
  rect(width / 2 - 5, waterY, 10, waterPour);
}

function waterFlow() {
  if (flow == "pour") {
    waterY = 0;
    waterPour += 6;
    grams = map(waterPour, 0, centerCoffee, 0, maxGrams, true);
    if (waterPour >= centerCoffee) {
      waterPour = centerCoffee;
      flow = "wait";
      timer = millis();
    }
  } else if (flow === "wait") {
    if (millis() - timer > 4000) {
      flow = "slow";
    }
  } else if (flow === "slow") {
    coffeeDrip();
    waterY += 15;
    waterPour -= 15;
    if (waterPour <= 0) {
      waterPour = 0;
      state = "stop";
    }
  }
  if (flow != "stop") {
  }
}

function coffeeDrip() {
  if (coffeeFall < 300) {
    coffeeFall += 0.4;
  }
}