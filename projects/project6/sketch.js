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

//preloading assets
function preload() {
  info = loadTable("sketches/project6/assets/mySleep.csv", "csv");
  drawingPhone= loadImage("sketches/project6/assets/phone.jpg");
  drawingEmpty= loadImage("sketches/project6/assets/empty.jpg");
  drawingSleep= loadImage("sketches/project6/assets/sleep.jpg");
  drawingLaptop= loadImage("sketches/project6/assets/laptop.jpg");
  drawingWakeUp= loadImage("sketches/project6/assets/wakeUp.jpg");
}

function setup() {
  createCanvas(850, 500);
  pixelDensity(1.5);
  centerX = width / 2;
  centerY = height / 2;
  noStroke();
  textSize(17);
  fill("white");

  //get array from csv file
  sleepDetails = info.getArray();
  reset();
}

function draw(){
  background("#E7C2BD");
  frameRate(frames);

  //draw all the rectangles and time using functions
  drawRectangles(7, 50, 100, index);
  displayTime();

  push();
  textAlign(CENTER);
  textSize(25);
  text(timeString, centerX, height - 50);
  pop();

  if (minutes % 30 == 0) {
    index++;
  }

  if (index == sleepDetails[1].length) {
    reset();
  }
}

//draw each drawing and date
function drawRectangles(rectangles, start, h, index) {
  for (x = 0; x < rectangles; start += 190) {
    if (x == 4) {
      start -= 655;
      h += 160;
    }

    //write days of the week
    text(days[x], start, h - 5);
    
    //decide which drawing to display
    decideAction(sleepDetails[x][index], start, h, 180, 130);
    
    push();
    stroke("white");
    strokeWeight(1.5);
    noFill();
    rect(start - 3, h + 3, 180, 130);
    pop();
    
    x++;
  }
}

//function to choose drawing
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
    default:
  }
}

//function to get + display the time
function displayTime() {
  let displayHour = hours % 12 || 12;
  let ampm;
  if (hours < 12) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }

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
