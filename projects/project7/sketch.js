function preload(){
  font=loadFont("assets/dogicapixel.ttf");
  fontBold=loadFont("assets/dogicapixelbold.ttf");

  for (let i = 2; i <= 7; i++) {
    monterreyImages.push(loadImage("assets/monterrey/" + i + ".png"));
    parisImages.push(loadImage("assets/paris/" + i + ".png"));
    seoulImages.push(loadImage("assets/seoul/" + i + ".png"));
    nycImages.push(loadImage("assets/nyc/" + i + ".png"));
  }

  for (let i=2; i <=7; i++){
    monterreyImagesOver.push(loadImage("assets/monterrey/over/" + i + ".png"));
    parisImagesOver.push(loadImage("assets/paris/over/" + i + ".png"));
    seoulImagesOver.push(loadImage("assets/seoul/over/" + i + ".png"));
    nycImagesOver.push(loadImage("assets/nyc/over/" + i + ".png"));
  }

  characterImagesRight.push(loadImage("assets/character/characterRight.png"));
  characterImagesRight.push(loadImage("assets/character/characterRight2.png"));

  characterImagesLeft.push(loadImage("assets/character/characterLeft.png"));
  characterImagesLeft.push(loadImage("assets/character/characterLeft2.png"));

  titleImage=loadImage("assets/title.png")
}

function setup() {
  container = select("#sketch-container");

  let h = container.height;
  let w = container.width;

  let c = createCanvas(w, h);
  c.parent(container);

  noCursor();
  mgr = new SceneManager();
  mgr.wire();

  fill("white");

  setMargins();
  movement=0;
  scene=0;

  textFont(font);
  textAlign(CENTER,CENTER);
  textWrap(WORD);
  textSize(height/50);

  cities.forEach(city => resizeImage(city));
  citiesOver.forEach(cityOver=>resizeImage(cityOver));

  characterImages.forEach(characterImage=>resizeCharacter(characterImage));

  monterrey=new Place("monterrey",monterreyImages,monterreyImagesOver,margin,margin,"left");
  paris=new Place("paris",parisImages,parisImagesOver,margin+rectWidth+padding,margin,"right");
  seoul=new Place("seoul",seoulImages,seoulImagesOver,margin,margin+rectHeight+padding,"left");
  nyc=new Place("nyc",nycImages,nycImagesOver,margin+rectWidth+padding,margin+rectHeight+padding,"right");
  places=[monterrey,paris,seoul,nyc];

  titleImage.resize(width*0.6,0);

  mgr.showScene(homepage);
}

function draw() {
  mgr.draw();
}
