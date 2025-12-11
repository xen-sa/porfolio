let grid;
let squareW;
let radius = 0.25; // relative to canvas width
let centerX;
let centerY;
let slider;
let squareCenter;
let container;

function setup() {
  container = select("#sketch-container");

  let h = container.height;
  let w = h;

  let c = createCanvas(w, h);
  c.parent(container);

  pixelDensity(1);
  centerX = width / 2;
  centerY = height / 2;

  // Create slider as child of container
  slider = createSlider(3, 500, 500);
  slider.parent(container);
  slider.style("accent-color", "#FFD700");

  updateSliderPosition();
}

function updateSliderPosition() {
  let sliderWidth = container.width * 0.25;
  slider.size(sliderWidth);

  // Fully centered horizontally below the canvas
  slider.style("position", "absolute");
  slider.style("left", "50%");
  slider.style("transform", "translateX(-50%)");
  slider.style("top", `${container.height * 0.875}px`);
}

function windowResized() {
  let h = container.height;
  let w=h;
  resizeCanvas(w, h);
  centerX = width / 2;
  centerY = height / 2;
  updateSliderPosition();
}

function draw() {
  background(220);

  grid = slider.value();
  squareW = width / grid;
  squareCenter = squareW / 2;
  radius = width * 0.25;

  createGrid();
  squareCircle();

  textAlign(CENTER);
  textSize(width * 0.05);
  fill(0);
  text("circles are ? squares", centerX, height * 0.1);
}

function createGrid() {
  strokeWeight(0.5);
  stroke(160);
  for (let i = 0; i <= width; i += squareW) {
    line(0, i, width, i);
    line(i, 0, i, height);
  }
}

function squareCircle() {
  for (let i = 0; i < width; i += squareW) {
    let centeri = i + squareCenter;
    for (let j = 0; j < height; j += squareW) {
      let centerj = j + squareCenter;
      if (dist(centerX, centerY, centeri, centerj) < radius) {
        stroke("white");
        square(i, j, squareW);
      }
    }
  }
}
