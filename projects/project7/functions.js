//setting variables
let mgr;
let backgroundColor="#f3dbefff";
const colorDark = "#7a6978";
let margin;
let margins;
let padding;
let rectWidth;
let rectHeight;
let heightCenter;
let halfHeight;
let halfWidth;
let scene;
let font;
//game mode 0= izquierda a derecha, 1=derecha a izquierda
let gameMode=0;

//arrays to load images into
let monterreyImages=[];
let parisImages= [];
let seoulImages= [];
let nycImages= [];
let cities= [monterreyImages, parisImages, seoulImages, nycImages];

let monterreyImagesOver=[];
let parisImagesOver=[];
let seoulImagesOver=[];
let nycImagesOver=[];
let citiesOver=[monterreyImagesOver,parisImagesOver,seoulImagesOver,nycImagesOver];

//cities
let places=[];
let monterrey;
let paris;
let seoul;
let nyc;
//movement
const speed = 3;
let sx=0;
let farRight;

let borderRight=false;
let borderLeft=false;

//character views and movement variables
let characterImagesRight=[];
let characterImagesLeft=[];
let characterImages=[characterImagesRight,characterImagesLeft];
let characterWalk = 0;
let direction=0;
let movement;
let maxMovement;
const characterSpeed = 3.2;

//all texts
let middleText=["Time to wake up and go out. You have no time for breakfast but you can buy coffee along the way.","The weather is nice out, you have time to enjoy it on the way.","Thankfully there was no delay on your commute, but you still have no time to get coffee before getting there.", "The day went by quick but you still felt like nothing happened. Time to go back now.","It's starting to get dark earlier, you feel sleepy on your way home.","You are finally home but have no energy to do anything else. You should go to sleep." ];

function setMargins(){
  padding = width/100;
  margin = width/40;
  margins = margin * 2;
  rectWidth=(width-padding-margins)/2;
  rectHeight=(height-padding-margins)/2;
  heightCenter= rectHeight/2;
  halfHeight= height/2;
  halfWidth= width/2;
}

function moveButtons() {
  if (keyIsDown(RIGHT_ARROW)) {
    sx += speed;
    direction=0;
    movement+=characterSpeed;
    if (frameCount % 20 === 0) {
      characterWalk = 1 - characterWalk;
    }
  } else if (keyIsDown(LEFT_ARROW)) {
    sx -= speed;
    direction=1;
    movement-=characterSpeed;
    if (frameCount % 20 === 0) {
      characterWalk = 1 - characterWalk;
    }
  }
}

function drawText(){
  let displayText;
  let fillText=color(colorDark);

  if(gameMode==0){
    if(borderRight==true&&scene<monterreyImages.length-1){
      displayText="Press space to continue."
      fillText=color("#c7619b");
    }else{
      displayText=middleText[scene];
    }
  }else if(gameMode==1){
    if(sx<50&&scene>0){
      displayText="Press space to continue."
      fillText=color("#c7619b");
    }else{
      displayText=middleText[scene];
    }
  }

  const textRectWidth = width/15*6;
  const textRectHeight = height/7;

  rectMode(CENTER);
  push()
  stroke(colorDark);
  strokeWeight(2);
  rect(halfWidth, halfHeight,textRectWidth,textRectHeight);
  pop();

  push();
  fill(fillText);
  text(displayText, halfWidth,halfHeight,textRectWidth*0.9);
  pop();
}

function changeScene(){
  //move forward to next scene
  if(borderRight==1&&scene<2){
    scene++;
    movement=0;
    sx=0;
  } 
  //move backward to next scene
  else if (borderLeft&&scene>2){
    scene++;
    movement=maxMovement;
    sx=farRight;
  }
}

function resizeImage(array){
  for (let i = 0; i < array.length; i++) {
    let aspectRatio = array[i].width / array[i].height;
    let newWidth = rectHeight * aspectRatio;

    array[i].resize(newWidth, rectHeight);
  }
}

function resizeCharacter(array){
  for (let i = 0; i < array.length; i++) {
    let aspectRatio = array[i].width / array[i].height;
    let newWidth = rectHeight/3.5 * aspectRatio;

    array[i].resize(newWidth, rectHeight/3.5);
  }
}

function setBorders(){
  borderRight=false;
  borderLeft=false;

  if(gameMode==0&&sx>=farRight){
    borderRight=true;
  }

  if(gameMode==1&&sx<50){
    borderLeft=true;
  }
}