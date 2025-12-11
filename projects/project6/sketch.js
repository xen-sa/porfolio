//declaring variables
let frames = 20;
let centerX;
let centerY;
let hours;
let minutes;
let timeString;
let index;
let sleepDetails = [];
let info;
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

let drawingPhone;
let drawingEmpty;
let drawingSleep;
let drawingLaptop;
let drawingWakeUp;
let container;

function preload() {
  info = loadTable("assets/mySleep.csv", "csv");
  drawingPhone = loadImage("assets/phone.jpg");
  drawingEmpty = loadImage("assets/empty.jpg");
  drawingSleep = loadImage("assets/sleep.jpg");
  drawingLaptop = loadImage("assets/laptop.jpg");
  drawingWakeUp = loadImage("assets/wakeUp.jpg");
}

function setup() {
  container = select("#sketch-container");

  let h = container.height;
  let w = h*(850/500);

  let c = createCanvas(w, h);
  c.parent(container);
  pixelDensity(1.5);

  centerX = width / 2;
  centerY = height / 2;

  noStroke();
  fill("white");

  sleepDetails = info.getArray();
  reset();
  textAlign(CENTER, CENTER);
}

function windowResized() {
  let h = container.height;
  let w = h*(850/500);
  resizeCanvas(w, h);
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background("#E7C2BD");
  frameRate(frames);

  let rectWidth = width * 0.21;  // ~ 180 / 850
  let rectHeight = height * 0.26; // ~130 / 500
  let startX = width * 0.065; // ~50 / 850
  let startY = height * 0.15;  // ~50 / 500

  drawRectangles(7, startX, startY, index, rectWidth, rectHeight);
  displayTime();

  push();
  textAlign(CENTER, CENTER);
  textSize(width * 0.03);
  text(timeString, centerX, height * 0.85);
  pop();

  if (minutes % 30 === 0) {
    index++;
  }

  if (index >= sleepDetails[1].length) {
    reset();
  }
}

function drawRectangles(rectangles, startX, startY, index, rectWidth, rectHeight) {
  let cols = 4;
  let gapX = rectWidth * 1.05;
  let gapY = rectHeight * 1.25;

  for (let x = 0; x < rectangles; x++) {
    let row = floor(x / cols);
    let col = x % cols;

    let posY = startY + row * gapY;

    let posX;
    if (row === 0) {
      posX = startX + col * gapX;
    } else {
      let itemsInSecondRow = rectangles - cols;
      let rowWidth = itemsInSecondRow * gapX - (gapX - rectWidth);
      let startXSecondRow = (width - rowWidth) / 2;
      posX = startXSecondRow + col * gapX;
    }

    textSize(rectHeight * 0.15);
    textAlign(LEFT);
    text(days[x], posX, posY - rectHeight * 0.1);
    decideAction(sleepDetails[x][index], posX, posY, rectWidth, rectHeight);

    push();
    stroke("white");
    strokeWeight(rectWidth * 0.008);
    noFill();
    rect(posX - rectWidth * 0.017, posY + rectHeight * 0.02, rectWidth, rectHeight);
    pop();
  }
}


function decideAction(instance, placeX, placeY, rectWidth, rectHeight) {
  switch (instance) {
    case "sleep":
      image(drawingSleep, placeX, placeY, rectWidth, rectHeight);
      break;
    case "phone":
      image(drawingPhone, placeX, placeY, rectWidth, rectHeight);
      break;
    case "wakeUp":
      image(drawingWakeUp, placeX, placeY, rectWidth, rectHeight);
      break;
    case "empty":
      image(drawingEmpty, placeX, placeY, rectWidth, rectHeight);
      break;
    case "laptop":
      image(drawingLaptop, placeX, placeY, rectWidth, rectHeight);
      break;
  }
}

//function to get + display the time
function displayTime() {
  let displayHour = hours % 12 || 12;
  let ampm = hours < 12 ? "AM" : "PM";

  timeString = nf(displayHour, 2) + ":" + nf(minutes, 2) + " " + ampm;

  minutes += 1;
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }
  if (hours >= 24) {
    hours = 0;
  }
}

function reset() {
  hours = 23;
  minutes = 30;
  index = 0;
}
