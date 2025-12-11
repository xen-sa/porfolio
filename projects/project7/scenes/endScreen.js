function endScreen(){
    let showUntilFrame;
    let startFrame;

    this.enter = function(){
        startFrame=frameCount;
        showUntilFrame = startFrame + 300; 
    }

    this.draw = function(){
        background(backgroundColor);
        let textSmallSize=width/50
        let pulse = sin(frameCount * 0.05);
        let pulsingSize = textSmallSize + pulse * (textSmallSize * 0.03); 

        if(frameCount<showUntilFrame){
            push();
            rectMode(CENTER)
            fill("white");
            textSize(width/35);
            text("You fell asleep after 3 hours of staring at your phone...", halfWidth, halfHeight,width*0.7);
            pop();
        }else if(frameCount>=showUntilFrame){
            push();
            textSize(pulsingSize);
            text("Press space to go back to homepage", halfWidth, halfHeight);
            pop();
        }
    }

    this.keyPressed = function() {
        //start game
        if (keyCode == 32) {
            gameMode=0;
            sx=0;
            characterWalk = 0;
            direction=0;
            scene=0;
            movement=0;
            this.sceneManager.showScene(homepage);
            backgroundColor="#f2c2dd"
        }
    }
}