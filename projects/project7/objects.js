class Place{
  constructor(name,sceneArray,sceneArrayOver,x,y,side){
    this.sceneArray=sceneArray;
    this.sceneArrayOver=sceneArrayOver;
    this.x=x;
    this.y=y;
    this.character=new Character(x,y);
    this.name=name;
    this.side=side;
  }

  display(sceneNumber){
    const img = this.sceneArray[sceneNumber];
    const imgOver= this.sceneArrayOver[sceneNumber];

    farRight=img.width-rectWidth;

    sx = constrain(sx, 0, img.width-rectWidth);

    image(img,this.x,this.y,rectWidth,rectHeight,sx,0,rectWidth,rectHeight,COVER,LEFT,TOP);

    push();
    rectMode(CORNER);
    noFill();
    stroke(colorDark);
    strokeWeight(2);
    rect(this.x, this.y,rectWidth,rectHeight);
    pop();

    this.character.display();
    image(imgOver,this.x,this.y,rectWidth,rectHeight,sx,0,rectWidth,rectHeight,COVER,LEFT,TOP);

    this.displayName(this.side);
  }

  displayName(side){
    push();
    textFont(fontBold);
    fill(backgroundColor);
    stroke(colorDark);
    textSize(rectHeight/17);

    if (side=="left"){
      textAlign(LEFT,TOP);
      text(this.name,this.x+10,this.y+10)
    }else if(side=="right"){
      textAlign(RIGHT,TOP);
      text(this.name,this.x+rectWidth-10,this.y+10)
    }
    pop();
  }

}

class Character{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }

  display(){
    //right
    let img;
    if (direction==0){
      img = characterImagesRight[characterWalk];
    } else if(direction==1){
      img = characterImagesLeft[characterWalk];
    }

    const halfWidth = img.width/2;

    maxMovement=rectWidth/30*29-halfWidth;
    movement=constrain(movement,rectWidth/30+halfWidth,maxMovement);

    const xPosition=this.x+movement;
    let yPosition;

    if (scene==2||scene==3){
        yPosition=this.y+rectHeight*2/3;
    } else{
        yPosition=this.y+heightCenter;
    }

    push();
    imageMode(CENTER);
    image(img,xPosition,yPosition);
    pop();
  }
}