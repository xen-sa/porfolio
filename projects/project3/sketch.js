let startTime;
let elapsedTime = 0;
let font;
let grams = 0;
let brew = false;
let flow = "stop";
let centerCoffee;
let waterPour = 0;
let waterY = 0;
let maxGrams = 40;
let start = true;
let coffeeFall = 0;
let end = false;

function mouseClicked() {
  if (!end) {
    flow = "pour";
    start = false;
    brew = true;
  } else if (end) {
    coffeeFall = 0;
    grams = 0;
    maxGrams = 0;
    flow = "pour";
    start = false;
    brew = true;
    end = false;
  }
}

function preload() {
  font = loadFont("digital.ttf");
}

function setup() {  
  container = select("#sketch-container");

  let h = container.height;
  let w = container.height;

  let c = createCanvas(w, h);
  c.parent("sketch-container");

  centerCoffee = height / 2 - height * 0.05;
  textFont("Tahoma");
}

function windowResized() {
  let h = container.height;
  let w = container.height;
  resizeCanvas(w, h);
  centerCoffee = height / 2 - height * 0.05;
}

function draw() {
  background("rgb(198,163,136)");
  noStroke();

  let w = width;
  let h = height;

  textAlign(CENTER);
  textFont("Tahoma");
  textSize(h * 0.03);

  fill("white");
  if (start) {
    text("click anywhere to brew your coffee.", w / 2, h * 0.9);
  }

  textFont(font);

  // coffee balance
  fill("black");
  rect(w * 0.2, h * 0.25, w * 0.58, h * 0.58, w * 0.03);
  fill("rgb(83,81,81)");
  rect(w * 0.19, h * 0.27, w * 0.59, h * 0.42);

  push();
  stroke("rgba(80,80,80,0.88)");
  fill("rgb(85,85,85)");
  for (let s = h * 0.27; s <= h * 0.67; s += h * 0.05) {
    rect(w * 0.195, s, w * 0.585, h * 0.025, w * 0.01);
  }
  pop();

  if (brew) elapsedTime = int(millis() / 1000);

  let minutes = int(elapsedTime / 60);
  let seconds = elapsedTime % 60;
  let timerText = minutes + ":" + nf(seconds, 2);

  textSize(h * 0.07);
  textAlign(LEFT, CENTER);
  fill("white");
  text(timerText, w * 0.27, h * 0.76);

  push();
  fill("#FDB864");
  text("0.0", w * 0.5, h * 0.76);
  pop();

  push();
  textAlign(RIGHT);
  text(round(grams) + ".0", w * 0.75, h * 0.76);
  pop();

  push();
  textFont("Tahoma");
  textSize(h * 0.02);
  text("g", w * 0.74, h * 0.70);
  fill("#FDB864");
  text("g/s", w * 0.53, h * 0.70);
  pop();

  // --- coffee ellipse ---
  push();
  translate(w / 2, h / 2 - h * 0.05);
  fill("#664D3B");
  ellipse(0, 0, coffeeFall);

  // jar
  fill("rgba(255,255,255,0.35)");
  ellipse(0, 0, w * 0.53);
  rect(w * 0.21, -h * 0.027, w * 0.09, h * 0.053, 0, w * 0.04, w * 0.04, 0);
  fill("rgba(255,255,255,0.1)");
  ellipse(0, 0, w * 0.5);
  rect(w * 0.25, -h * 0.027, w * 0.05, h * 0.053, 0, w * 0.04, w * 0.04, 0);

  // v60
  rotate(-0.3);
  fill("white");
  rect(w * 0.2, -h * 0.022, w * 0.08, h * 0.043, w * 0.02);
  ellipse(0, 0, w * 0.43);
  for (let r = (w * 0.43) / 2; r > 0; r--) {
    let inter = map(r, 0, (w * 0.43) / 2, 0, 1);
    fill(lerpColor(color(216, 216, 216), color(245, 245, 245), inter));
    ellipse(0, 0, r * 2);
  }

  fill("#664D3B");
  ellipse(0, 0, w * 0.22);
  pop();

  if (elapsedTime == 30 || elapsedTime == 60 || elapsedTime == 90) {
    flow = "pour";
  } else if (elapsedTime == 120) {
    brew = false;
    end = true;
    textAlign(CENTER);
    textFont("Tahoma");
    textSize(h * 0.03);
    text("your coffee is ready.", w / 2, h * 0.9);
  }

  if (elapsedTime == 30) maxGrams = 100;
  if (elapsedTime == 60) maxGrams = 160;
  if (elapsedTime == 90) maxGrams = 220;

  waterFlow();

  fill("rgb(165,186,231)");
  rect(w / 2 - w * 0.008, waterY, w * 0.016, waterPour);
}

function waterFlow() {
  if (flow == "pour") {
    waterY = 0;
    waterPour += height * 0.01;
    grams = map(waterPour, 0, centerCoffee, 0, maxGrams, true);
    if (waterPour >= centerCoffee) {
      waterPour = centerCoffee;
      flow = "wait";
      timer = millis();
    }
  } else if (flow === "wait") {
    if (millis() - timer > 4000) flow = "slow";
  } else if (flow === "slow") {
    coffeeDrip();
    waterY += height * 0.025;
    waterPour -= height * 0.025;
    if (waterPour <= 0) {
      waterPour = 0;
      flow = "stop";
    }
  }
}

function coffeeDrip() {
  if (coffeeFall < height * 0.5) coffeeFall += height * 0.002;
}
