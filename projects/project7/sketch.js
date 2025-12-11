function preload(){
  font=loadFont("sketches/project7/assets/dogicapixel.ttf");
  fontBold=loadFont("sketches/project7/assets/dogicapixelbold.ttf");

  for (let i = 2; i <= 7; i++) {
    monterreyImages.push(loadImage("sketches/project7/assets/monterrey/" + i + ".png"));
    parisImages.push(loadImage("sketches/project7/assets/paris/" + i + ".png"));
    seoulImages.push(loadImage("sketches/project7/assets/seoul/" + i + ".png"));
    nycImages.push(loadImage("sketches/project7/assets/nyc/" + i + ".png"));
  }

  for (let i=2; i <=7; i++){
    monterreyImagesOver.push(loadImage("sketches/project7/assets/monterrey/over/" + i + ".png"));
    parisImagesOver.push(loadImage("sketches/project7/assets/paris/over/" + i + ".png"));
    seoulImagesOver.push(loadImage("sketches/project7/assets/seoul/over/" + i + ".png"));
    nycImagesOver.push(loadImage("sketches/project7/assets/nyc/over/" + i + ".png"));
  }

  characterImagesRight.push(loadImage("sketches/project7/assets/character/characterRight.png"));
  characterImagesRight.push(loadImage("sketches/project7/assets/character/characterRight2.png"));

  characterImagesLeft.push(loadImage("sketches/project7/assets/character/characterLeft.png"));
  characterImagesLeft.push(loadImage("sketches/project7/assets/character/characterLeft2.png"));

  titleImage=loadImage("sketches/project7/assets/title.png")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
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
