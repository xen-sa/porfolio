let grid;
let squareW;
let radius = 100;
let centerX;
let centerY;
let slider;
let squareCenter;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);

  centerX = width / 2;
  centerY = height / 2;

  slider = createSlider(3, 500, 500);
  slider.position(centerX - 50, (height / 8) * 7);
  slider.size(100);
  slider.style("accent-color", "#FFD700");
}

function draw() {
  background(220);

  grid = slider.value();
  squareW = width / grid;
  squareCenter = squareW / 2;

  createGrid();
  squareCircle();

  textAlign(CENTER);
  text("circles are ? squares", centerX, 40);
}

function createGrid() {
  strokeWeight(0.5);
  stroke(160);
  for (i = 0; i <= width; i += squareW) {
    line(0, i, width, i);
    line(i, 0, i, height);
  }
}

function squareCircle() {
  for (i = 0; i < width; i += squareW) {
    let centeri = i + squareCenter;
    for (j = 0; j < height; j += squareW) {
      let centerj = j + squareCenter;
      if (dist(centerX, centerY, centeri, centerj) < radius) {
        stroke("white");
        square(i, j, squareW);
      }
    }
  }
}
