let head, neck, body, legs;
let myFont;
let nodUp = false;
let dialogue =
  "so then she told me she liked my purse but i don’t think she meant that at all she said it in the kind of tone that would be like that purse looks bad on you you know? so i really think she just doesn’t like me and i don’t get it at all because i never did anything to her but she’s the one with the problem with me but anyways did you also hear that she broke up with her boyfriend a few weeks ago? maybe it’s because she’s feeling down because of that like i do understand wanting to vent out your frustrations but you know what does that have to do with me? i really feel bad for her and i thought we got along pretty well but i guess i just don’t understand her like i really don’t like to judge but she’s just going at me for no reason so what else can i do?";
let words;
let displayText = "";
let i = 0;
let bubbleHeight = 50;
let gossip = false;
let container;
let h;
let w;

function preload() {
  myFont = loadFont("assets/myfont.ttf");
  head = loadImage("assets/head.png");
  neck = loadImage("assets/neck.png");
  body = loadImage("assets/body.png");
  legs = loadImage("assets/legs.png");
}

function setup() {
  container = select("#sketch-container");

  h = container.height;
  w = h*4/7;

  let c = createCanvas(w, h);
  c.parent("sketch-container");

  words = dialogue.split(" ");
  textFont(myFont);
  textAlign(LEFT, TOP);

  noStroke();
}

function windowResized() {
  h = container.height;
  w = h*4/7;
  resizeCanvas(w, h);
}

function draw() {
  w = width;
  h = height;

  background("#FBFBFB00");
  fill("rgb(170,217,241)");
  rect(0, 0, w, h * 0.85);

  // --- draw character scaled ---
  let legsW = w * 0.395;
  let legsH = h * 0.456;
  let legsX = w * 0.0675;
  let legsY = h * 0.4;
  image(legs, legsX, legsY, legsW, legsH);

  let bodyW = w * 0.3025;
  let bodyH = h * 0.23;
  let bodyX = w * 0.065;
  let bodyY = h * 0.271;
  image(body, bodyX, bodyY, bodyW, bodyH);

  let neckW = w * 0.1875;
  let neckH = h * 0.14;
  let neckX = w * 0.135;
  let neckY = h * 0.179;
  image(neck, neckX, neckY, neckW, neckH);

  // head
  push();
  translate(w * 0.18, h * 0.182);
  nod();
  image(head, -w * 0.147, -h * 0.166, w * 0.507, h * 0.235);
  pop();

  // title text
  push();
  textSize(h * 0.057); // scale font
  textLeading(h * 0.043);
  textAlign(LEFT, TOP);
  fill("black");
  text("The gossip giraffe", w * 0.575, h * 0.03, w * 0.475);
  pop();

  let textX = w * 0.58;
  let textY = h * 0.124;

  // instruction or dialogue
  if (!gossip) {
    textSize(h * 0.03);
    textLeading(h * 0.025);
    fill("black");
    text("click anywhere to gossip with giraffe", textX, textY, w * 0.375);
  }

  if (gossip) {
    fill("white");
    textBubble(w * 0.55, h * 0.124, w * 0.387);
    triangle(
      w * 0.55,
      h * 0.137,
      w * 0.55,
      h * 0.177,
      w * 0.495,
      h * 0.137
    );
    fill("black");
    writeDialogue(w * 0.575, h * 0.143, w * 0.375);
  }
}

function nod() {
  if (frameCount % 40 === 0) {
    nodUp = !nodUp;
  }
  if (nodUp) {
    rotate(-0.25);
  } else {
    rotate(0);
  }
}

function mouseClicked() {
  gossip = true;
}

function writeDialogue(x, y, w) {
  if (frameCount % 5 === 0 && i < words.length) {
    displayText += words[i] + " ";
    i++;
  }
  textSize(h * 0.03);
  textLeading(h * 0.035);
  text(displayText, x, y, w);
}

function textBubble(x, y, w) {
  if (frameCount % 6 === 0) {
    bubbleHeight += h * 0.005;
  }
  rect(x, y, w, bubbleHeight, 5);
}
