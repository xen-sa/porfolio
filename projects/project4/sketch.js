let head;
let neck;
let body;
let legs;
let myFont;
let nodUp = false;
let dialogue =
  "so then she told me she liked my purse but i don’t think she meant that at all she said it in the kind of tone that would be like that purse looks bad on you you know? so i really think she just doesn’t like me and i don’t get it at all because i never did anything to her but she’s the one with the problem with me but anyways did you also hear that she broke up with her boyfriend a few weeks ago? maybe it’s because she’s feeling down because of that like i do understand wanting to vent out your frustrations but you know what does that have to do with me? i really feel bad for her and i thought we got along pretty well but i guess i just don’t understand her like i really don’t like to judge but she’s just going at me for no reason so what else can i do?";
let words;
let displayText = "";
let i = 0;
let bubbleHeight = 50;
let gossip = false;

function preload() {
  myFont = loadFont("/sketches/project4/myfont.ttf");
  head = loadImage("/sketches/project4/head.png");
  neck = loadImage("/sketches/project4/neck.png");
  body = loadImage("/sketches/project4/body.png");
  legs = loadImage("/sketches/project4/legs.png");
}

function setup() {
  createCanvas(400, 700);
  words = dialogue.split(" ");
}

function draw() {
  background("#FBFBFB00");
  fill("rgb(170,217,241)");
  rect(0,0,400,600);
  image(legs, 27, 280, 158, 319);
  image(body, 26, 188, 121, 165);
  image(neck, 54, 124, 75, 98);

  noStroke();
  fill("black");
  textFont(myFont);
  textSize(20);
  textLeading(15);

  push();
  translate(72, 127);
  nod();
  image(head, -59, -115, 203, 165);
  pop();

  push();
  textSize(40);
  textLeading(30);
  text("The gossip giraffe", 230, 40, 190);
  pop();

  if (gossip == false) {
    text("click anywhere to gossip with giraffe", 232, 100, 150);
  }

  if (gossip == true) {
    fill("white");
    textBubble(220, 80, 155);
    triangle(220, 95, 220, 127, 198, 103);
    fill("black");
    writeDialogue(230, 100, 142);
  }
}

function nod() {
  if (frameCount % 40 == 0) {
    nodUp = !nodUp;
  }
  if (nodUp) {
    rotate(-0.25);
  } else {
    rotate(0);
  }
}

function mouseClicked() {
  print(mouseX, mouseY);
  gossip = true;
}

function writeDialogue(x, y, w) {
  if (frameCount % 5 == 0 && i < words.length) {
    displayText += words[i] + " ";
    i++;
  }
  text(displayText, x, y, w);
}

function textBubble(x, y, w) {
  if (frameCount % 6 == 0) {
    bubbleHeight += 3.8;
  }
  rect(x, y, w, bubbleHeight, 5);
}
